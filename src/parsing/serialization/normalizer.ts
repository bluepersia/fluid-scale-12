import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "./docSerializer.types";
import { MEDIA_RULE_TYPE, STYLE_RULE_TYPE } from "./docSerializerConsts";

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
  normalizeDoc,
  normalizeStyleSheets,
  normalizeStyleSheet,
  normalizeRules,
  normalizeRule,
  normalizeStyle,
  normalizeZero,
  normalizeSelector,
};
