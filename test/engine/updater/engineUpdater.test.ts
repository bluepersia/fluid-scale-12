import { expect, test, describe, beforeAll, afterAll } from "vitest";
import {
  startBrowserPage,
  closeBrowserPage,
  initPlaywrightPages,
  teardownPlaywrightPages,
  onLoadBrowserPage,
} from "../../setup";
import { Browser, Page } from "playwright";
import { masterCollection, masterFlowCollection } from "./masterCollection";
import { engineUpdateAssertionMaster } from "./gold-sight";
import { PlaywrightPage } from "../../index.types";
import { AssertionBlueprint } from "gold-sight";
import {
  getCurrentRange,
  getFlushProps,
} from "../../../src/engine/engineUpdater";

let playwrightPages: PlaywrightPage[] = [];

beforeAll(async () => {
  playwrightPages = await initPlaywrightPages();
});

afterAll(async () => {
  await teardownPlaywrightPages(playwrightPages);
});

describe("update", () => {
  test.each(masterCollection)("should update the document", async (master) => {
    const { index, coreDocStructWindowWidth: width } = master;
    const { page, blueprint } = playwrightPages[index];

    await page.reload();
    await onLoadBrowserPage(page, blueprint);

    await page.evaluate(async () => {
      (window as any).init({ startEngine: false });

      await (window as any).waitUntil(
        () => (window as any).getState().interObserverIsInitialized
      );
    });

    await page.setViewportSize({ width, height: 1000 });

    const queue: [number, AssertionBlueprint][] = await page.evaluate(
      (master) => {
        (window as any).engineUpdateAssertionMaster.master = master;
        (window as any).update();

        const queue = (window as any).engineUpdateAssertionMaster.getQueue();

        return Array.from(queue.entries());
      },
      master
    );

    engineUpdateAssertionMaster.setQueueFromArray(queue);
    engineUpdateAssertionMaster.assertQueue({ master: { index } });
  });

  test.each(masterFlowCollection)(
    "should update the document in flow",
    async (master) => {
      const { index } = master;
      const { page, blueprint } = playwrightPages[index];

      await page.reload();
      await onLoadBrowserPage(page, blueprint);

      await page.evaluate(async () => {
        (window as any).init({ startEngine: true });

        await (window as any).waitUntil(
          () => (window as any).getState().interObserverIsInitialized
        );
      });

      for (const masterStep of master.steps) {
        await page.evaluate((masterStep) => {
          (window as any).engineUpdateAssertionMaster.master = masterStep;
        }, masterStep);
        await page.setViewportSize({
          width: masterStep.coreDocStructWindowWidth,
          height: 1000,
        });
        const queue: [number, AssertionBlueprint][] = await page.evaluate(
          () => {
            return new Promise((resolve) => {
              // Wait two frames to ensure any async layout/render work finishes
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  const queue = (
                    window as any
                  ).engineUpdateAssertionMaster.getQueue();
                  resolve(Array.from(queue.entries()));
                });
              });
            });
          }
        );
        engineUpdateAssertionMaster.setQueueFromArray(queue);
        engineUpdateAssertionMaster.assertQueue({ master: masterStep });
      }
    }
  );
});

describe("getFlushProps", () => {
  const cases = [
    {
      fluidProperties: [],
      expected: [],
    },
    {
      fluidProperties: [
        { metaData: { property: "font-size", orderID: 0 } },
        { metaData: { property: "line-height", orderID: 1 } },
        { metaData: { property: "letter-spacing", orderID: 2 } },
        { metaData: { property: "word-spacing", orderID: 3 } },
        { metaData: { property: "line-height", orderID: 4 } },
        { metaData: { property: "font-size", orderID: 5 } },
      ],
      expected: ["font-size", "line-height", "letter-spacing", "word-spacing"],
    },
  ];
  test.each(cases)("should get the flush props", async (testCase) => {
    const { fluidProperties, expected } = testCase;

    const result = getFlushProps(fluidProperties as any);
    expect([...result].sort()).toEqual(expected.sort());
  });
});

describe("readPropertyValue", () => {
  let browserCtx:
    | {
        browser: Browser;
        page: Page;
        server: { url: string; close: () => void };
      }
    | undefined;
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

describe("getCurrentRange", () => {
  const testCases = [
    {
      fluidProperty: {
        ranges: [
          {
            minBpIndex: 0,
            maxBpIndex: 1,
          },
          null,
        ],
      },
      ctx: {
        breakpoints: [375, 768, 1200],
        windowWidth: 500,
      },
      expected: {
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    },
    {
      fluidProperty: {
        ranges: [
          null,
          {
            minBpIndex: 1,
            maxBpIndex: 2,
          },
        ],
      },
      ctx: {
        breakpoints: [375, 768, 1200],
        windowWidth: 1000,
      },
      expected: {
        minBpIndex: 1,
        maxBpIndex: 2,
      },
    },
    {
      fluidProperty: {
        ranges: [
          null,
          {
            minBpIndex: 1,
            maxBpIndex: 2,
          },
        ],
      },
      ctx: {
        breakpoints: [375, 768, 1200],
        windowWidth: 600,
      },
      expected: undefined,
    },
  ];

  test.each(testCases)("should get the current range", (testCase) => {
    const { ctx, fluidProperty, expected } = testCase;
    const result = getCurrentRange(fluidProperty as any, ctx as any);

    expect(result).toEqual(expected);
  });
});
