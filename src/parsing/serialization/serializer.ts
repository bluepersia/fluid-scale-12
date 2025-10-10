import {
  DocumentClone,
  StyleSheetClone,
  RuleClone,
  StyleRuleClone,
  MediaRuleClone,
  SerializeDocContext,
} from "./serializer.types";
import {
  STYLE_RULE_TYPE,
  MEDIA_RULE_TYPE,
  SHORTHAND_PROPERTIES,
  FLUID_PROPERTY_NAMES,
  SPECIAL_PROPERTIES,
} from "./serializerConsts";

let serializeDocument = (
  document: Document,
  ctx: SerializeDocContext
): DocumentClone => {
  const serializedDoc: DocumentClone = {
    styleSheets: serializeStyleSheets(
      getAccessibleStyleSheets(document.styleSheets),
      ctx
    ),
  };

  return serializedDoc;
};

let getAccessibleStyleSheets = (
  styleSheets: StyleSheetList
): CSSStyleSheet[] => {
  return Array.from(styleSheets).filter((sheet) => {
    try {
      const rules = sheet.cssRules;
      return rules ? true : false;
    } catch (error) {
      return false;
    }
  });
};

let serializeStyleSheets = (
  styleSheets: CSSStyleSheet[],
  ctx: SerializeDocContext
): StyleSheetClone[] => {
  return styleSheets.map((sheet) => serializeStyleSheet(sheet, ctx));
};

let serializeStyleSheet = (
  sheet: CSSStyleSheet,
  ctx: SerializeDocContext
): StyleSheetClone => {
  return {
    cssRules: serializeRules(sheet.cssRules, ctx),
  };
};

let serializeRules = (
  rules: CSSRuleList,
  ctx: SerializeDocContext
): RuleClone[] => {
  return Array.from(rules)
    .map((rule) => serializeRule(rule, ctx))
    .filter((rule) => rule !== null);
};

let serializeRule = (
  rule: CSSRule,
  ctx: SerializeDocContext
): RuleClone | null => {
  return rule.type === STYLE_RULE_TYPE
    ? serializeStyleRule(rule as CSSStyleRule, ctx)
    : serializeMediaRule(rule as CSSMediaRule, ctx);
};

let serializeStyleRule = (
  rule: CSSStyleRule,
  ctx: SerializeDocContext
): StyleRuleClone | null => {
  const { isBrowser } = ctx;
  const style: Record<string, string> = {};
  const specialProps: Record<string, string> = {};

  for (let i = 0; i < rule.style.length; i++) {
    const prop = rule.style[i];

    if (FLUID_PROPERTY_NAMES.has(prop)) {
      if (SHORTHAND_PROPERTIES[prop]) {
        if (isBrowser) continue; //Browser automatically handles shorthand properties
      } else {
        style[prop] = rule.style.getPropertyValue(prop);
      }
    } else if (SPECIAL_PROPERTIES.has(prop)) {
      specialProps[prop] = rule.style.getPropertyValue(prop);
    }
  }
  if (Object.keys(style).length <= 0) return null;
  return {
    type: STYLE_RULE_TYPE,
    selectorText: rule.selectorText,
    style,
    specialProps,
  } as StyleRuleClone;
};

let serializeMediaRule = (
  rule: CSSMediaRule,
  ctx: SerializeDocContext
): MediaRuleClone | null => {
  const match = rule.media.mediaText.match(/\(min-width:\s*(\d+)px\)/);

  if (match) {
    const minWidth = Number(match[1]);
    return {
      type: MEDIA_RULE_TYPE,
      minWidth,
      cssRules: serializeRules(rule.cssRules, ctx),
    };
  }
  return null;
};

function wrap(
  serializeDocumentWrapped: (
    document: Document,
    ctx: SerializeDocContext
  ) => DocumentClone,
  getAccessibleStyleSheetsWrapped: (
    styleSheets: StyleSheetList
  ) => CSSStyleSheet[],
  serializeStyleSheetWrapped: (
    sheet: CSSStyleSheet,
    ctx: SerializeDocContext
  ) => StyleSheetClone,
  serializeStyleSheetsWrapped: (
    styleSheets: CSSStyleSheet[],
    ctx: SerializeDocContext
  ) => StyleSheetClone[],
  serializeRulesWrapped: (
    rules: CSSRuleList,
    ctx: SerializeDocContext
  ) => RuleClone[],
  serializeRuleWrapped: (
    rule: CSSRule,
    ctx: SerializeDocContext
  ) => RuleClone | null,
  serializeStyleRuleWrapped: (
    rule: CSSStyleRule,
    ctx: SerializeDocContext
  ) => StyleRuleClone | null,
  serializeMediaRuleWrapped: (
    rule: CSSMediaRule,
    ctx: SerializeDocContext
  ) => MediaRuleClone | null
) {
  serializeDocument = serializeDocumentWrapped;
  getAccessibleStyleSheets = getAccessibleStyleSheetsWrapped;
  serializeStyleSheet = serializeStyleSheetWrapped;
  serializeStyleSheets = serializeStyleSheetsWrapped;
  serializeRules = serializeRulesWrapped;
  serializeRule = serializeRuleWrapped;
  serializeStyleRule = serializeStyleRuleWrapped;
  serializeMediaRule = serializeMediaRuleWrapped;
}

export {
  serializeDocument,
  getAccessibleStyleSheets,
  serializeStyleSheet,
  serializeStyleSheets,
  serializeRules,
  serializeRule,
  serializeStyleRule,
  serializeMediaRule,
  wrap,
};
