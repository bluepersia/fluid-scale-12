import { docCloneFooter } from "../../serialization/docClone/footer";
import { createBatches } from "../../../../../../parsing/parser/batchesCreator";
import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

const ruleBatchesFooter: RuleBatch[] = createBatches(
  docCloneFooter,
  375,
  [768, 1200]
);

export { ruleBatchesFooter };
