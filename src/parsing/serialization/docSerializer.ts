import { splitBySpaces } from "../../utils/stringHelpers";
import {
  DocumentClone,
  StyleSheetClone,
  RuleClone,
  StyleRuleClone,
  MediaRuleClone,
  SerializeDocContext,
  StyleResults,
  CloneStylePropContext,
  ApplyExplicitPropsFromShorthandContext,
} from "./docSerializer.types";
import {
  STYLE_RULE_TYPE,
  MEDIA_RULE_TYPE,
  SHORTHAND_PROPERTIES,
  FLUID_PROPERTY_NAMES,
  SPECIAL_PROPERTIES,
} from "./docSerializerConsts";

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
  const { style, specialProps } = serializeStyleProps(rule, ctx);
  if (Object.keys(style).length <= 0) return null;
  return {
    type: STYLE_RULE_TYPE,
    selectorText: rule.selectorText,
    style,
    specialProps,
  } as StyleRuleClone;
};

let serializeStyleProps = (
  rule: CSSStyleRule,
  ctx: SerializeDocContext
): StyleResults => {
  let styleResults: StyleResults = { style: {}, specialProps: {} };

  for (let i = 0; i < rule.style.length; i++) {
    const prop = rule.style[i];
    styleResults = serializeStyleProp(rule, prop, { ...ctx, styleResults });
  }
  return styleResults;
};

let serializeStyleProp = (
  rule: CSSStyleRule,
  prop: string,
  ctx: CloneStylePropContext
): StyleResults => {
  let { styleResults } = ctx;

  styleResults = { ...styleResults };

  if (FLUID_PROPERTY_NAMES.has(prop)) {
    styleResults.style = serializeFluidProp(rule, prop, ctx);
  } else if (SPECIAL_PROPERTIES.has(prop)) {
    const specialProps = (styleResults.specialProps = {
      ...styleResults.specialProps,
    });
    specialProps[prop] = rule.style.getPropertyValue(prop);
  }
  return styleResults;
};

let serializeFluidProp = (
  rule: CSSStyleRule,
  prop: string,
  ctx: CloneStylePropContext
): Record<string, string> => {
  let {
    styleResults: { style },
  } = ctx;
  const { isBrowser } = ctx;

  const shorthandOuterMap = SHORTHAND_PROPERTIES[prop];
  if (shorthandOuterMap) {
    if (isBrowser) return style; //Browser automatically handles shorthand properties

    style = applyExplicitPropsFromShorthand(rule, prop, {
      ...ctx,
      shorthandOuterMap,
    });
  } else {
    style = { ...style };
    style[prop] = rule.style.getPropertyValue(prop);
  }
  return style;
};

let applyExplicitPropsFromShorthand = (
  rule: CSSStyleRule,
  prop: string,
  ctx: ApplyExplicitPropsFromShorthandContext
): Record<string, string> => {
  const { shorthandOuterMap } = ctx;
  let {
    styleResults: { style },
  } = ctx;

  style = { ...style };
  const shorthandValues = splitBySpaces(rule.style.getPropertyValue(prop));
  const mapLength = shorthandValues.length;
  const shorthandInnerMap = shorthandOuterMap.get(mapLength);
  if (shorthandInnerMap) {
    for (let j = 0; j < shorthandValues.length; j++) {
      const shorthandValue = shorthandValues[j];
      const properties = shorthandInnerMap.get(j);
      if (properties) {
        for (const explicitProp of properties)
          style[explicitProp] = shorthandValue;
      }
    }
  }
  return style;
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
  ) => MediaRuleClone | null,
  serializeStylePropsWrapped: (
    rule: CSSStyleRule,
    ctx: SerializeDocContext
  ) => StyleResults,
  serializeStylePropWrapped: (
    rule: CSSStyleRule,
    prop: string,
    ctx: CloneStylePropContext
  ) => StyleResults,
  serializeFluidPropWrapped: (
    rule: CSSStyleRule,
    prop: string,
    ctx: CloneStylePropContext
  ) => Record<string, string>,
  applyExplicitPropsFromShorthandWrapped: (
    rule: CSSStyleRule,
    prop: string,
    ctx: ApplyExplicitPropsFromShorthandContext
  ) => Record<string, string>
) {
  serializeDocument = serializeDocumentWrapped;
  getAccessibleStyleSheets = getAccessibleStyleSheetsWrapped;
  serializeStyleSheet = serializeStyleSheetWrapped;
  serializeStyleSheets = serializeStyleSheetsWrapped;
  serializeRules = serializeRulesWrapped;
  serializeRule = serializeRuleWrapped;
  serializeStyleRule = serializeStyleRuleWrapped;
  serializeMediaRule = serializeMediaRuleWrapped;
  serializeStyleProps = serializeStylePropsWrapped;
  serializeStyleProp = serializeStylePropWrapped;
  serializeFluidProp = serializeFluidPropWrapped;
  applyExplicitPropsFromShorthand = applyExplicitPropsFromShorthandWrapped;
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
  serializeStyleProp,
  serializeStyleProps,
  serializeFluidProp,
  applyExplicitPropsFromShorthand,
  wrap,
};
