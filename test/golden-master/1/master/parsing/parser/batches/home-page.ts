import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

import { createBatches } from "../../../../../../parsing/parser/batchesCreator";
import { docCloneHomePage } from "../../serialization/docClone/home-page";

const ruleBatchesHomePage: RuleBatch[] = createBatches(
  docCloneHomePage,
  375,
  [768, 1200]
);
export { ruleBatchesHomePage };
