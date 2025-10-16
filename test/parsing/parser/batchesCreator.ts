import { RuleBatch } from "../../../src/parsing/parser/docParser.types";
import {
  MediaRuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/docSerializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/docSerializerConsts";
import { NullRule } from "../serialization/index.types";

function createBatches(
  sheet: StyleSheetClone,
  baseline: number,
  medias: number[]
) {
  const baselineBatch: RuleBatch = {
    width: baseline,
    isMediaQuery: false,
    rules: sheet.cssRules.filter(
      (rule) => rule.type === STYLE_RULE_TYPE && !(rule as NullRule).null
    ),
  };

  const result: RuleBatch[] = [baselineBatch];

  for (const media of medias) {
    const mediaRule = sheet.cssRules.find(
      (rule) =>
        rule.type === MEDIA_RULE_TYPE &&
        (rule as MediaRuleClone).minWidth === media
    ) as MediaRuleClone;
    if (!mediaRule) continue;
    const mediaBatch: RuleBatch = {
      width: media,
      isMediaQuery: true,
      rules: mediaRule.cssRules.filter(
        (rule) => rule.type === STYLE_RULE_TYPE && !(rule as NullRule).null
      ),
    };
    result.push(mediaBatch);
  }
  return result;
}

export { createBatches };
