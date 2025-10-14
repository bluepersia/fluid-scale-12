import { expect, test, describe, beforeAll, afterAll } from "vitest";
import { startBrowserPage, closeBrowserPage } from "../../setup";
import { Browser, Page } from "playwright";
describe("readPropertyValue", () => {
  let browserCtx: { browser: Browser; page: Page } | undefined;
  beforeAll(async () => {
    browserCtx = await startBrowserPage();
  });

  afterAll(async () => {
    if (!browserCtx) return;
    await closeBrowserPage(browserCtx);
  });
  const cases = [
    {
      property: "font-size",
      fluidPropertiesState: new Map(),
      style: {
        "font-size": "20px",
      },
      expected: 20,
    },
    {
      property: "font-size",
      fluidPropertiesState: new Map([
        ["font-size", { property: "font-size", value: "30px", orderID: 0 }],
      ]),
      style: {},
      expected: 30,
    },
  ];
  test.each(cases)("should read the property value", async (testCase) => {
    const { page } = browserCtx!;
    const result = await page.evaluate(
      (testCase) => {
        const { property, style } = testCase;
        const fluidPropertiesState = new Map(testCase.fluidPropertiesState);

        const el = document.createElement("div");
        for (const [key, value] of Object.entries(style)) {
          el.style.setProperty(key, value);
        }
        const elState = {
          el,
          fluidPropertiesState,
        };
        document.body.appendChild(el);
        return (window as any).readPropertyValue(property, elState);
      },
      {
        ...testCase,
        fluidPropertiesState: Array.from(
          testCase.fluidPropertiesState.entries()
        ),
      }
    );

    expect(result).toBe(testCase.expected);
  });
});
