import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

import { createBatches } from "../../../../../../parsing/parser/batchesCreator";
import { docCloneHero } from "../../serialization/docClone/hero";

const ruleBatchesHero: RuleBatch[] = createBatches(
  docCloneHero,
  375,
  [768, 1200]
);
export { ruleBatchesHero };
