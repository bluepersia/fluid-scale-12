import { describe, test, expect, beforeAll, afterAll } from "vitest";
import { masterCollection } from "./masterCollection";
import { PlaywrightPage } from "../index.types";
import { initPlaywrightPages, teardownPlaywrightPages } from "../setup";
import { AssertionBlueprint } from "gold-sight";
import { serializeDocAssertionMaster } from "../parsing/serialization/gold-sight/gold-sight";
import { parseDocAssertionMaster } from "../parsing/parser/gold-sight";
import { engineAssertionMaster } from "./gold-sight";

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
      (master) => {
        (window as any).engineAssertionMaster.master = master;
        (window as any).parseDocAssertionMaster.master = master.parseDocMaster;
        (window as any).serializeDocAssertionMaster.master =
          master.serializeDocMaster;

        (window as any).FluidScale.init();

        const engineQueue = (window as any).engineAssertionMaster.getQueue();
        const serializeQueue = (
          window as any
        ).serializeDocAssertionMaster.getQueue();
        const parseQueue = (window as any).parseDocAssertionMaster.getQueue();

        return [
          Array.from(engineQueue.entries()),
          Array.from(serializeQueue.entries()),
          Array.from(parseQueue.entries()),
        ];
      },
      master
    );

    const [engineQueue, serializeQueue, parseQueue] = queues;

    engineAssertionMaster.setQueueFromArray(engineQueue);
    engineAssertionMaster.assertQueue({ master: { index } });
    serializeDocAssertionMaster.setQueueFromArray(serializeQueue);
    serializeDocAssertionMaster.assertQueue({ master: { index } });
    parseDocAssertionMaster.setQueueFromArray(parseQueue);
    parseDocAssertionMaster.assertQueue({ master: { index } });
  });
});
