import { Browser, chromium, Page } from "playwright";
import serveStatic from "serve-static";
import finalhandler from "finalhandler";
import http, { IncomingMessage, ServerResponse } from "http";
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
    useServer: true,
  },
  {
    htmlFilePath: "golden-master/1",
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
    useServer: true,
  },
];

const JSDOMDocs = realProjectsData.map(({ htmlFilePath }, index) => {
  const finalPath = path.resolve(__dirname, htmlFilePath, "index.html");
  return { doc: generateJSDOMDocument([finalPath]), index };
});

async function startStaticServer(folder: string) {
  const serve = serveStatic(path.resolve(folder), { index: ["index.html"] });
  const serveBundle = serveStatic(path.resolve(__dirname, "../bundle/dist"));
  const server = http.createServer((req, res) => {
    serve(req, res, (err: any) => {
      if (err) return finalhandler(req, res)(err);

      serveBundle(req, res, finalhandler(req, res));
    });
  });

  const port = await new Promise<void>((resolve) =>
    server.listen(0, () => {
      const port = (server.address() as any).port;
      resolve(port);
    })
  );
  return {
    url: `http://localhost:${port}`,
    close: () => server.close(),
  };
}

async function startBrowserPage(blueprint?: PlaywrightBlueprint) {
  const { htmlFilePath, useServer } = blueprint ?? {};

  const browser = await chromium.launch();
  const page = await browser.newPage();
  let server;

  if (useServer && htmlFilePath) {
    server = await startStaticServer(path.resolve(__dirname, htmlFilePath));
    await page.goto(`${server.url}/`);
  } else {
    const finalPath = htmlFilePath
      ? path.resolve(__dirname, htmlFilePath, "index.html")
      : "";
    if (finalPath) await page.goto(`file://${finalPath}`);
  }
  await onLoadBrowserPage(page, blueprint);

  return { page, browser, blueprint, server };
}

async function onLoadBrowserPage(page: Page, blueprint?: PlaywrightBlueprint) {
  const { htmlFilePath, addCss, useServer } = blueprint ?? {};

  if (addCss && htmlFilePath && !useServer) {
    for (const css of addCss) {
      const cssPath = path.resolve(__dirname, htmlFilePath, css);
      await page.addStyleTag({ path: cssPath });
    }
  }

  // Inject the IIFE bundle and expose cloneDocument on window for tests
  const clonerBundlePath = path.resolve(__dirname, "../bundle/dist/bundle.js");
  page.on("console", (msg) => {
    const text = msg.text();
    console.log("BROWSER LOG:", text);
  });
  page.on("pageerror", (err) => {
    console.log("PAGE ERROR:", err);
  });
  if (!useServer) await page.addScriptTag({ path: clonerBundlePath });
  await page.waitForFunction(() => (window as any).FluidScale !== undefined);
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
    (window as any).resetState = (window as any).FluidScale.resetState;
  });
}

async function closeBrowserPage({
  browser,
  page,
  server,
}: {
  browser: Browser;
  page: Page;
  server: {
    url: string;
    close: () => void;
  };
}) {
  await page.close();
  await browser.close();
  if (server) await server.close();
}

async function gotoPage(page: Page, url: string) {
  await page.goto(url);
}

async function initPlaywrightPages(): Promise<PlaywrightPage[]> {
  return await Promise.all(
    realProjectsData.map(async ({ htmlFilePath, addCss, useServer }) => {
      return await startBrowserPage({ htmlFilePath, addCss, useServer });
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
