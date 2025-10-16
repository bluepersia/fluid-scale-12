import { docCloneBtn } from "../../serialization/docClone/btn";
import { RuleBatch } from "../../../../../../../src/parsing/parser/docParser.types";
import { MediaRuleClone } from "../../../../../../../src/parsing/serialization/docSerializer.types";
import { NullRule } from "../../../../../../parsing/serialization/index.types";

const ruleBatchesBtn: RuleBatch[] = [
  {
    width: 375,
    isMediaQuery: false,
    rules: docCloneBtn.cssRules
      .slice(0, 1)
      .filter((rule) => !(rule as NullRule).null),
  },
  {
    width: 768,
    isMediaQuery: true,
    rules: (docCloneBtn.cssRules[1] as MediaRuleClone).cssRules.filter(
      (rule) => !(rule as NullRule).null
    ),
  },
  {
    width: 1200,
    isMediaQuery: true,
    rules: (docCloneBtn.cssRules[2] as MediaRuleClone).cssRules.filter(
      (rule) => !(rule as NullRule).null
    ),
  },
  {
    width: 375,
    isMediaQuery: false,
    rules: docCloneBtn.cssRules
      .slice(3, 7)
      .filter((rule) => !(rule as NullRule).null),
  },
];
export { ruleBatchesBtn };
