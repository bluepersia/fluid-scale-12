import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

import { createBatches } from "../../../../../../parsing/parser/batchesCreator";
import { docCloneGlobal } from "../../serialization/docClone/global";

const ruleBatchesGlobal: RuleBatch[] = createBatches(
  docCloneGlobal,
  375,
  [768, 1200]
);

export { ruleBatchesGlobal };
