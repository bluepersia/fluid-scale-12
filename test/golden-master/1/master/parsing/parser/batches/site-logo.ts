import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";

import { createBatches } from "../../../../../../parsing/parser/batchesCreator";
import { docCloneSiteLogo } from "../../serialization/docClone/site-logo";

const ruleBatchesSiteLogo: RuleBatch[] = createBatches(
  docCloneSiteLogo,
  375,
  [768, 1200]
);

export { ruleBatchesSiteLogo };
