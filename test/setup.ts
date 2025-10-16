import { Browser, chromium, Page } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import { PlaywrightBlueprint, PlaywrightPage } from "./index.types";
import { generateJSDOMDocument } from "../src/parsing/json-builder";
import { wrapAll as wrapAllSerializeDoc } from "./parsing/serialization/gold-sight/gold-sight";
import { wrapAll as wrapAllParseDoc } from "./parsing/parser/gold-sight";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

wrapAllSerializeDoc();
wrapAllParseDoc();

class IntersectionObserverMock {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

(global as any).IntersectionObserver = IntersectionObserverMock;

const realProjectsData: PlaywrightBlueprint[] = [
  {
    htmlFilePath: "golden-master/0",
    addCss: ["css/global.css", "css/utils.css", "css/product-card.css"],
  },
  {
    htmlFilePath: "golden-master/1/src",
    addCss: [
      "css/global/global.css",
      "css/blocks/site-logo.css",
      "css/blocks/header.css",
      "css/blocks/hero.css",
      "css/blocks/home-page.css",
      "css/blocks/course-card.css",
      "css/blocks/footer.css",
      "css/blocks/btn.css",
    ],
  },
];

const JSDOMDocs = realProjectsData.map(({ htmlFilePath }, index) => {
  const finalPath = path.resolve(__dirname, htmlFilePath, "index.html");
  return { doc: generateJSDOMDocument([finalPath]), index };
});

async function startBrowserPage(blueprint?: PlaywrightBlueprint) {
  const { htmlFilePath } = blueprint ?? {};

  const browser = await chromium.launch();
  const page = await browser.newPage();
  const finalPath = htmlFilePath
    ? path.resolve(__dirname, htmlFilePath, "index.html")
    : "";
  if (finalPath) await page.goto(`file://${finalPath}`);

  await onLoadBrowserPage(page, blueprint);

  return { page, browser, blueprint };
}

async function onLoadBrowserPage(page: Page, blueprint?: PlaywrightBlueprint) {
  const { htmlFilePath, addCss } = blueprint ?? {};

  if (addCss && htmlFilePath) {
    for (const css of addCss) {
      const cssPath = path.resolve(__dirname, htmlFilePath, css);
      await page.addStyleTag({ path: cssPath });
    }
  }

  // Inject the IIFE bundle and expose cloneDocument on window for tests
  const clonerBundlePath = path.resolve(__dirname, "../bundle/dist/bundle.js");
  page.on("console", (msg) => {
    console.log("BROWSER LOG:", msg.text());
  });
  page.on("pageerror", (err) => {
    console.log("PAGE ERROR:", err);
  });
  await page.addScriptTag({ path: clonerBundlePath });
  await page.evaluate(() => {
    // @ts-expect-error global from IIFE bundle
    window.serializeDocument = window.FluidScale.serializeDocument;

    // prettier-ignore
    // @ts-expect-error global from IIFE bundle
    window.serializeDocAssertionMaster = window.FluidScale.serializeDocAssertionMaster;

    (window as any).parseDocAssertionMaster = (
      window as any
    ).FluidScale.parseDocAssertionMaster;

    (window as any).init = (window as any).FluidScale.init;

    (window as any).engineAssertionMaster = (
      window as any
    ).FluidScale.engineAssertionMaster;

    (window as any).getQueue = (window as any).FluidScale.getQueue;

    (window as any).engineUpdateAssertionMaster = (
      window as any
    ).FluidScale.engineUpdateAssertionMaster;

    (window as any).update = (window as any).FluidScale.update;

    (window as any).readPropertyValue = (
      window as any
    ).FluidScale.readPropertyValue;

    (window as any).waitUntil = (window as any).FluidScale.waitUntil;

    (window as any).getState = (window as any).FluidScale.getState;
  });
}

async function closeBrowserPage({
  browser,
  page,
}: {
  browser: Browser;
  page: Page;
}) {
  await page.close();
  await browser.close();
}

async function gotoPage(page: Page, url: string) {
  await page.goto(url);
}

async function initPlaywrightPages(): Promise<PlaywrightPage[]> {
  return await Promise.all(
    realProjectsData.map(async ({ htmlFilePath, addCss }) => {
      return await startBrowserPage({ htmlFilePath, addCss });
    })
  );
}

async function teardownPlaywrightPages(
  playwrightPages: { page: Page; browser: Browser }[]
) {
  for (const { page, browser } of playwrightPages) {
    await page.close(); // close page first
    await browser.close(); // then close browser
  }
}

export {
  initPlaywrightPages,
  teardownPlaywrightPages,
  JSDOMDocs,
  startBrowserPage,
  closeBrowserPage,
  onLoadBrowserPage,
};
