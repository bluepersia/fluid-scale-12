import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/serializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/serializerConsts";
import { NullRule } from "./index.types";

function clearNullsForDoc(docClone: DocumentClone) {
  return {
    styleSheets: clearNullsForStyleSheets(docClone.styleSheets),
  };
}

function clearNullsForStyleSheets(
  styleSheets: StyleSheetClone[]
): StyleSheetClone[] {
  return styleSheets.map(clearNullsForStyleSheet);
}

function clearNullsForStyleSheet(sheet: StyleSheetClone): StyleSheetClone {
  return {
    cssRules: clearNullsForRules(sheet.cssRules),
  };
}

function clearNullsForRules(rules: RuleClone[]): RuleClone[] {
  return rules
    .map((rule) => clearNullsForRule(rule))
    .filter((rule) => rule !== undefined);
}

function clearNullsForRule(rule: RuleClone): RuleClone | undefined {
  const isNull = (rule as NullRule).null;
  if (isNull) return;
  if (rule.type === STYLE_RULE_TYPE) {
    return rule;
  } else if (rule.type === MEDIA_RULE_TYPE) {
    return {
      ...rule,
      cssRules: clearNullsForRules((rule as MediaRuleClone).cssRules),
    } as MediaRuleClone;
  }
}

function getRulesByAbsIndex(docClone: DocumentClone, absIndex: number) {
  let index = 0;

  for (const sheet of docClone.styleSheets) {
    if (index === absIndex) return sheet.cssRules;
    index++;

    for (const rule of sheet.cssRules) {
      if (rule.type === MEDIA_RULE_TYPE) {
        if (index === absIndex) return (rule as MediaRuleClone).cssRules;
        index++;
      }
    }
  }
}

function getRuleByAbsIndex(docClone: DocumentClone, absIndex: number) {
  let index = 0;
  for (const sheet of docClone.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (index === absIndex) return rule;
      index++;
      if (rule.type === MEDIA_RULE_TYPE) {
        for (const childRule of (rule as MediaRuleClone).cssRules) {
          if (index === absIndex) return childRule;
          index++;
        }
      }
    }
  }
}

function getStyleRuleByAbsIndex(docClone: DocumentClone, absIndex: number) {
  let index = 0;
  for (const sheet of docClone.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.type === STYLE_RULE_TYPE) {
        if (index === absIndex) return rule;
        index++;
      } else if (rule.type === MEDIA_RULE_TYPE) {
        for (const childRule of (rule as MediaRuleClone).cssRules) {
          if (childRule.type === STYLE_RULE_TYPE) {
            if (index === absIndex) return childRule;
            index++;
          }
        }
      }
    }
  }
}

function getMediaRuleByAbsIndex(docClone: DocumentClone, absIndex: number) {
  let index = 0;
  for (const sheet of docClone.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.type === MEDIA_RULE_TYPE) {
        if (index === absIndex) return rule;
        index++;
      }
    }
  }
}

export {
  getRulesByAbsIndex,
  getStyleRuleByAbsIndex,
  getMediaRuleByAbsIndex,
  clearNullsForDoc,
  clearNullsForStyleSheets,
  clearNullsForStyleSheet,
  clearNullsForRules,
  clearNullsForRule,
  getRuleByAbsIndex,
};
