import {
  MediaRuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/docSerializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/docSerializerConsts";
function countStyleRulesInSheet(sheet: StyleSheetClone) {
  let count = 0;

  for (const rule of sheet.cssRules) {
    if (rule.type === STYLE_RULE_TYPE) count++;
    if (rule.type === MEDIA_RULE_TYPE) {
      for (const childRule of (rule as MediaRuleClone).cssRules) {
        if (childRule.type === STYLE_RULE_TYPE) count++;
      }
    }
  }

  return count;
}

export { countStyleRulesInSheet };
