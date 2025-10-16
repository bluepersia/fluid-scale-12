import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/docSerializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/docSerializerConsts";
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

function getStyleRuleByAbsIndex(
  docClone: DocumentClone,
  absIndex: number
): StyleRuleClone | undefined {
  let index = 0;
  for (const sheet of docClone.styleSheets) {
    for (const rule of sheet.cssRules) {
      if (rule.type === STYLE_RULE_TYPE) {
        if (index === absIndex) return rule as StyleRuleClone;
        index++;
      } else if (rule.type === MEDIA_RULE_TYPE) {
        for (const childRule of (rule as MediaRuleClone).cssRules) {
          if (childRule.type === STYLE_RULE_TYPE) {
            if (index === absIndex) return childRule as StyleRuleClone;
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

function normalizeDoc(docClone: DocumentClone): DocumentClone {
  return {
    styleSheets: normalizeStyleSheets(docClone.styleSheets),
  };
}

function normalizeStyleSheets(
  styleSheets: StyleSheetClone[]
): StyleSheetClone[] {
  return styleSheets.map(normalizeStyleSheet);
}

function normalizeStyleSheet(sheet: StyleSheetClone): StyleSheetClone {
  return {
    cssRules: normalizeRules(sheet.cssRules),
  };
}

function normalizeRules(rules: RuleClone[]): RuleClone[] {
  return rules.map(normalizeRule);
}

function normalizeRule(rule: RuleClone): RuleClone {
  if (rule.type === STYLE_RULE_TYPE) {
    const styleRule = rule as StyleRuleClone;
    return {
      ...rule,
      selectorText: normalizeSelector(styleRule.selectorText),
      style: normalizeStyle(styleRule.style),
    } as StyleRuleClone;
  } else if (rule.type === MEDIA_RULE_TYPE) {
    return {
      ...rule,
      cssRules: (rule as MediaRuleClone).cssRules.map(normalizeRule),
    } as MediaRuleClone;
  }
  return rule;
}

function normalizeStyle(style: Record<string, string>): Record<string, string> {
  const normalizedZeros = Object.fromEntries(
    Object.entries(style).map(([key, value]) => [key, normalizeZero(value)])
  );

  return normalizedZeros;
}

/** Nornalize all zeros to '0px' for conistency */
function normalizeZero(input: string): string {
  return input.replace(
    /(?<![\d.])0+(?:\.0+)?(?![\d.])(?!(px|em|rem|%|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)\b)/g,
    "0px"
  );
}

/** Normalize the selector for consistency:
 * 1) Replace *::before and *::after with ::before and ::after
 * 2) Normalize spacing around commas
 * 3) Replace multiple spaces with a single space
 * 4) Trim the selector
 */

function normalizeSelector(selector: string): string {
  return selector
    .replace(/\*::(before|after)\b/g, "::$1")
    .replace(/\s*,\s*/g, ", ")
    .replace(/\s+/g, " ")
    .trim();
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
  normalizeDoc,
  normalizeStyleSheet,
  normalizeStyleSheets,
  normalizeRule,
  normalizeRules,
  normalizeStyle,
  normalizeSelector,
};
