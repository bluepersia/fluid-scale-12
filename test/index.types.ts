import { Browser, Page } from "playwright";

type PlaywrightPage = {
  page: Page;
  browser: Browser;
  blueprint?: PlaywrightBlueprint;
};

type PlaywrightBlueprint = {
  htmlFilePath: string;
  addCss: string[];
};

export { PlaywrightPage, PlaywrightBlueprint };
