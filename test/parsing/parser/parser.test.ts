import { describe, test, expect } from "vitest";
import { masterCollection } from "./masterCollection";
import { parseDocAssertionMaster } from "./gold-sight";

import { parseDocument } from "../../../src/parsing/parser/docParser";

describe("parseDocument", () => {
  test.each(masterCollection)("should parse the document", (master) => {
    const { index, inputDoc } = master;
    parseDocAssertionMaster.master = master;
    parseDocument(inputDoc);
    parseDocAssertionMaster.assertQueue();
  });
});
