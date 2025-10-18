import {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
  beforeEach,
} from "vitest";
import { masterCollection } from "./masterCollection";
import { PlaywrightPage } from "../index.types";
import { initPlaywrightPages, teardownPlaywrightPages } from "../setup";
import { AssertionBlueprint } from "gold-sight";
import { serializeDocAssertionMaster } from "../parsing/serialization/gold-sight/gold-sight";
import { parseDocAssertionMaster } from "../parsing/parser/gold-sight";
import { engineAssertionMaster } from "./gold-sight";
import { getState } from "../../src/engine/engineState";
import { handleIntersection } from "../../src/engine/engineSetup";

let playwrightPages: PlaywrightPage[] = [];

beforeAll(async () => {
  playwrightPages = await initPlaywrightPages();
});

afterAll(async () => {
  await teardownPlaywrightPages(playwrightPages);
});

describe("init", () => {
  test.each(masterCollection)("should initialize engine", async (master) => {
    const { index } = master;
    const { page } = playwrightPages[index];
    const queues: [number, AssertionBlueprint][][] = await page.evaluate(
      async (master) => {
        (window as any).engineAssertionMaster.master = master;

        await (window as any).FluidScale.init();
        const engineQueue = (window as any).engineAssertionMaster.getQueue();
        return [Array.from(engineQueue.entries())];
      },
      master
    );

    const [engineQueue] = queues;

    engineAssertionMaster.setQueueFromArray(engineQueue);
    engineAssertionMaster.assertQueue({ master: { index } });
  });

  test.each(masterCollection)(
    "should initialize engine with JSDOM",
    async (master) => {
      const { index } = master;
      const { page } = playwrightPages[index];
      await page.evaluate(async () => {
        (window as any).resetState();
      });
      const queues: [number, AssertionBlueprint][][] = await page.evaluate(
        async (master) => {
          (window as any).engineAssertionMaster.master = master;

          await (window as any).FluidScale.init({
            jsonID: "index",
          });

          const engineQueue = (window as any).engineAssertionMaster.getQueue();
          return [Array.from(engineQueue.entries())];
        },
        master
      );
      const [engineQueue] = queues;

      engineAssertionMaster.setQueueFromArray(engineQueue);
      engineAssertionMaster.assertQueue({ master: { index } });
    }
  );
});

describe("handleIntersection", () => {
  type EntryMock = {
    isIntersecting: boolean;
    target: HTMLElement;
  };

  test("should handle intersection", () => {
    const createElement = (id: string) => {
      const element = document.createElement("div");
      element.id = id;
      return element;
    };

    const entries: EntryMock[] = [
      { isIntersecting: true, target: createElement("1") },
      { isIntersecting: false, target: createElement("2") },
      { isIntersecting: true, target: createElement("3") },
      { isIntersecting: true, target: createElement("4") },
      { isIntersecting: false, target: createElement("5") },
      { isIntersecting: true, target: createElement("6") },
    ];
    const { allEls } = getState();
    allEls.clear();

    for (const entry of entries) {
      allEls.set(
        entry.target as any,
        {
          el: entry.target as any,
        } as any
      );
    }
    handleIntersection(entries as any);

    const { visibleEls, pendingHiddenEls } = getState();
    expect([...visibleEls].map((el) => el.el.id)).toEqual(["1", "3", "4", "6"]);
    expect([...pendingHiddenEls].map((el) => el.el.id)).toEqual(["2", "5"]);
    expect([...visibleEls].every((el) => el.isVisible)).toBe(true);
    expect([...pendingHiddenEls].every((el) => !el.isVisible)).toBe(true);
  });
});
