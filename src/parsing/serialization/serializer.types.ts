import { MEDIA_RULE_TYPE, STYLE_RULE_TYPE } from "./serializerConsts";

type DocumentClone = {
  styleSheets: StyleSheetClone[];
};

type StyleSheetClone = {
  cssRules: RuleClone[];
};

type RuleClone = {
  type: typeof STYLE_RULE_TYPE | typeof MEDIA_RULE_TYPE;
};

type StyleRuleClone = RuleClone & {
  type: typeof STYLE_RULE_TYPE;
  selectorText: string;
  style: Record<string, string>;
  specialProps: Record<string, string>;
};

type MediaRuleClone = RuleClone & {
  type: typeof MEDIA_RULE_TYPE;
  minWidth: number;
  cssRules: RuleClone[];
};

type SerializeDocContext = {
  isBrowser: boolean;
};

type CloneStylePropContext = SerializeDocContext & {
  styleResults: StyleResults;
};

type ApplyExplicitPropsFromShorthandContext = CloneStylePropContext & {
  shorthandOuterMap: Map<number, Map<number, string[]>>;
};

type StyleResults = {
  style: Record<string, string>;
  specialProps: Record<string, string>;
};
export {
  DocumentClone,
  StyleSheetClone,
  RuleClone,
  StyleRuleClone,
  MediaRuleClone,
  SerializeDocContext,
  StyleResults,
  CloneStylePropContext,
  ApplyExplicitPropsFromShorthandContext,
};
