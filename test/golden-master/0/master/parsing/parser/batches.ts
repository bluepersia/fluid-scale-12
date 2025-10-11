import { RuleBatch } from "../../../../../../src/parsing/parser/parser.types";
import {
  MediaRuleClone,
  StyleRuleClone,
} from "../../../../../../src/parsing/serialization/serializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../../../../src/parsing/serialization/serializerConsts";
import { NullRule } from "../../../../../parsing/serialization/index.types";
import { docClone } from "../serialization/docClone";

const ruleBatches: RuleBatch[][] = [
  [
    {
      width: 375,
      isMediaQuery: false,
      rules: docClone.styleSheets[0].cssRules.filter(
        (rule) => rule.type === STYLE_RULE_TYPE && !(rule as NullRule).null
      ),
    },
    {
      width: 375,
      isMediaQuery: true,
      rules: [],
    },
  ],
  [
    {
      width: 375,
      isMediaQuery: false,
      rules: docClone.styleSheets[1].cssRules.filter(
        (rule) => rule.type === STYLE_RULE_TYPE && !(rule as NullRule).null
      ),
    },
  ],
  [
    {
      width: 375,
      isMediaQuery: false,
      rules: docClone.styleSheets[2].cssRules.filter(
        (rule) => rule.type === STYLE_RULE_TYPE && !(rule as NullRule).null
      ),
    },
    {
      width: 600,
      isMediaQuery: true,
      rules: (
        docClone.styleSheets[2].cssRules.find(
          (rule) => rule.type === MEDIA_RULE_TYPE
        ) as MediaRuleClone
      ).cssRules.filter((rule) => !(rule as NullRule).null),
    },
  ],
];

export { ruleBatches };
