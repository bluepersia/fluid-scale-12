import { Browser, chromium, Page } from "playwright";
import path from "path";
import { fileURLToPath } from "url";
import { PlaywrightPage } from "./index.types";
import { generateJSDOMDocument } from "../src/parsing/json-builder";
import { wrapAll as wrapAllSerializeDoc } from "./parsing/serialization/gold-sight";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

wrapAllSerializeDoc();

type PlaywrightBlueprint = {
  htmlFilePath: string;
  addCss: string[];
};

const realProjectsData: PlaywrightBlueprint[] = [
  {
    htmlFilePath: "golden-master/0",
    addCss: ["css/global.css", "css/utils.css", "css/product-card.css"],
  },
];

const JSDOMDocs = realProjectsData.map(({ htmlFilePath }, index) => {
  const finalPath = path.resolve(__dirname, htmlFilePath, "index.html");
  return { doc: generateJSDOMDocument([finalPath]), index };
});

async function initPlaywrightPages(): Promise<PlaywrightPage[]> {
  return await Promise.all(
    realProjectsData.map(async ({ htmlFilePath, addCss }) => {
      const finalPath = path.resolve(__dirname, htmlFilePath, "index.html");
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(`file://${finalPath}`);

      for (const css of addCss) {
        const cssPath = path.resolve(__dirname, htmlFilePath, css);
        await page.addStyleTag({ path: cssPath });
      }

      // Inject the IIFE bundle and expose cloneDocument on window for tests
      const clonerBundlePath = path.resolve(
        __dirname,
        "../bundle/dist/bundle.js"
      );
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

        // @ts-expect-error global from IIFE bundle
        window.getQueue = window.FluidScale.getQueue;
      });

      return { page, browser };
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

export { initPlaywrightPages, teardownPlaywrightPages, JSDOMDocs };
