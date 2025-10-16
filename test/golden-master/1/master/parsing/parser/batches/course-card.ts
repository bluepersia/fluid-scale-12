import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";
import { MediaRuleClone } from "../../../../../../../src/parsing/serialization/docSerializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../../../../../src/parsing/serialization/docSerializerConsts";
import { NullRule } from "../../../../../../parsing/serialization/index.types";
import { docCloneCourseCard } from "../../serialization/docClone/course-card";
import { createBatches } from "../../../../../../parsing/parser/batchesCreator";

const ruleBatchesCourseCard: RuleBatch[] = createBatches(
  docCloneCourseCard,
  375,
  [768, 1200]
);

export { ruleBatchesCourseCard };
