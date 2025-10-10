import { describe, test, expect, afterAll, beforeAll } from "vitest";
import { masterCollection } from "./masterCollection";
import { PlaywrightPage } from "../../index.types";
import { initPlaywrightPages, teardownPlaywrightPages } from "../../setup";
import { AssertionBlueprint } from "gold-sight";
import { serializeDocAssertionMaster } from "./gold-sight";

let playwrightPages: PlaywrightPage[] = [];

beforeAll(async () => {
  playwrightPages = await initPlaywrightPages();
});

afterAll(async () => {
  await teardownPlaywrightPages(playwrightPages);
});

describe("serializeDocument", () => {
  test.each(masterCollection)(
    "should serialize the document",
    async (master) => {
      const { index } = master;
      const { page } = playwrightPages[index];
      const queue: [number, AssertionBlueprint][] = await page.evaluate(
        (master) => {
          (window as any).serializeDocAssertionMaster.master = master;
          (window as any).serializeDocument(document, { isBrowser: true });

          const queue = (window as any).getQueue("serializeDoc");

          return Array.from(queue.entries());
        },
        master
      );

      serializeDocAssertionMaster.setQueueFromArray(queue);
      serializeDocAssertionMaster.assertQueue({ master: { index } });
    }
  );
});
