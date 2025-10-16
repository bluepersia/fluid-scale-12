import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

import { docCloneHeader } from "../../serialization/docClone/header";
import { createBatches } from "../../../../../../parsing/parser/batchesCreator";

const ruleBatchesHeader: RuleBatch[] = createBatches(
  docCloneHeader,
  375,
  [768, 1200]
);

export { ruleBatchesHeader };
