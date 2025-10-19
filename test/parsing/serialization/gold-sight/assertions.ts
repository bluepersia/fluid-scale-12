let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import { AssertionChainForFunc } from "gold-sight";
import { AssertFluidPropContext, NullRule } from "../index.types";
import { State } from "./gold-sight";

import {
  MediaRuleClone,
  StyleRuleClone,
} from "../../../../src/parsing/serialization/docSerializer.types";
import {
  clearNullsForDoc,
  clearNullsForRule,
  clearNullsForRules,
  clearNullsForStyleSheet,
  clearNullsForStyleSheets,
  getMediaRuleByAbsIndex,
  getRulesByAbsIndex,
  getRuleByAbsIndex,
  getStyleRuleByAbsIndex,
} from "../masterController";
import {
  FLUID_PROPERTY_NAMES,
  SHORTHAND_PROPERTIES,
  SPECIAL_PROPERTIES,
} from "../../../../src/parsing/serialization/docSerializerConsts";
import { toBeEqualDefined } from "../../../utils/vitest";
import {
  applyExplicitPropsFromShorthand,
  serializeFluidProp,
  serializeStyleProp,
  serializeStyleProps,
  getAccessibleStyleSheets,
  serializeDocument,
  serializeMediaRule,
  serializeRule,
  serializeRules,
  serializeStyleRule,
  serializeStyleSheet,
  serializeStyleSheets,
} from "../../../../src/parsing/serialization/docSerializer";

const serializeDocAssertions: AssertionChainForFunc<
  State,
  typeof serializeDocument
> = {
  "should serialize the document": (state, args, result) => {
    expect(result).toEqual(clearNullsForDoc(state.master!.docClone));
    return true;
  },
};

const getAccessibleStyleSheetsAssertions: AssertionChainForFunc<
  State,
  typeof getAccessibleStyleSheets
> = {
  "should get the accessible style sheets": (state, args, result) => {
    expect(result.length).toBe(state.master!.docClone.styleSheets.length);
    return true;
  },
};
const serializeStyleSheetsAssertions: AssertionChainForFunc<
  State,
  typeof serializeStyleSheets
> = {
  "should serialize the style sheets": (state, args, result) => {
    expect(result).toEqual(
      clearNullsForStyleSheets(state.master!.docClone.styleSheets)
    );
    return true;
  },
};

const serializeStyleSheetAssertions: AssertionChainForFunc<
  State,
  typeof serializeStyleSheet
> = {
  "should serialize the style sheet": (state, args, result) => {
    toBeEqualDefined(
      result,
      clearNullsForStyleSheet(
        state.master!.docClone.styleSheets[state.sheetIndex]
      )
    );
    return true;
  },
};

const serializeRulesAssertions: AssertionChainForFunc<
  State,
  typeof serializeRules
> = {
  "should serialize the rules": (state, args, result) => {
    let rules = getRulesByAbsIndex(state.master!.docClone, state.rulesIndex);

    if (rules) rules = clearNullsForRules(rules);

    toBeEqualDefined(result, rules);
    return true;
  },
};

const serializeRuleAssertions: AssertionChainForFunc<
  State,
  typeof serializeRule
> = {
  "should serialize the rule": (state, args, result) => {
    let masterRule = getRuleByAbsIndex(state.master!.docClone, state.ruleIndex);

    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return true;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    toBeEqualDefined(result, masterRule);
    return true;
  },
};

const serializeStyleRuleAssertions: AssertionChainForFunc<
  State,
  typeof serializeStyleRule
> = {
  "should serialize the style rule": (state, args, result) => {
    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex
    );
    if (result === null) {
      expect((masterRule as unknown as NullRule).null).toBeTruthy();
      return true;
    }
    toBeEqualDefined(result, masterRule);
    return true;
  },
};

const serializeMediaRuleAssertions: AssertionChainForFunc<
  State,
  typeof serializeMediaRule
> = {
  "should serialize the media rule": (state, args, result) => {
    let masterRule = getMediaRuleByAbsIndex(
      state.master!.docClone,
      state.mediaRuleIndex
    );
    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return true;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    toBeEqualDefined(result, masterRule);
    return true;
  },
};

const serializeStylePropsAssertions: AssertionChainForFunc<
  State,
  typeof serializeStyleProps
> = {
  "should clone the style props": (state, args, result) => {
    let { style, specialProps } = result;

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    if (
      Object.keys(style).length <= 0 &&
      Object.keys(specialProps).length <= 0
    ) {
      expect((masterRule as unknown as NullRule).null).toBeTruthy();
      return true;
    }

    expect(style).toEqual(masterRule!.style);
    expect(specialProps).toEqual(masterRule!.specialProps);
    return true;
  },
};

const serializeStylePropAssertions: AssertionChainForFunc<
  State,
  typeof serializeStyleProp
> = {
  "should clone the style prop": (state, args, result) => {
    const [rule, prop, ctx] = args;
    const {
      isBrowser,
      styleResults: { style: styleArg },
    } = ctx;

    let { style, specialProps } = result;

    let masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    if (FLUID_PROPERTY_NAMES.has(prop)) {
      assertFluidProp(prop, { rule, isBrowser, style, masterRule, styleArg });
    } else if (SPECIAL_PROPERTIES.has(prop)) {
      expect(specialProps[prop]).toEqual(masterRule!.specialProps[prop]);
    }
    return true;
  },
};

function assertFluidProp(
  prop: string,
  ctx: AssertFluidPropContext,
  msg?: string
) {
  const { isBrowser, rule, style, masterRule, styleArg } = ctx;
  if (SHORTHAND_PROPERTIES[prop]) {
    if (isBrowser) return;
    expect(style).not.toEqual(styleArg);

    const filteredStyle = { ...style };
    for (const key in style) {
      if (rule.style.getPropertyValue(key)) {
        delete filteredStyle[key];
      }
    }

    expect(masterRule!.style).toMatchObject(filteredStyle);
  } else {
    toBeEqualDefined(style[prop], masterRule!.style[prop], msg);
  }
  return true;
}

const serializeFluidPropAssertions: AssertionChainForFunc<
  State,
  typeof serializeFluidProp
> = {
  "should clone the fluid prop": (state, args, result) => {
    const [rule, prop, ctx] = args;
    const {
      isBrowser,
      styleResults: { style: styleArg },
    } = ctx;

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    assertFluidProp(prop, {
      rule,
      isBrowser,
      style: result,
      masterRule,
      styleArg,
    });
    return true;
  },
};

const applyExplicitPropsFromShorthandAssertions: AssertionChainForFunc<
  State,
  typeof applyExplicitPropsFromShorthand
> = {
  "should apply the explicit props from shorthand": (state, args, result) => {
    const [rule, prop, ctx] = args;
    const {
      styleResults: { style: styleArg },
    } = ctx;

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    const filteredResult = { ...result };
    for (const key in filteredResult) {
      if (rule.style.getPropertyValue(key)) {
        delete filteredResult[key];
      }
    }

    expect(result).not.toEqual(styleArg);
    expect(masterRule!.style).toMatchObject(filteredResult);
    return true;
  },
};

const defaultAssertions = {
  serializeDocument: serializeDocAssertions,
  getAccessibleStyleSheets: getAccessibleStyleSheetsAssertions,
  serializeStyleSheets: serializeStyleSheetsAssertions,
  serializeStyleSheet: serializeStyleSheetAssertions,
  serializeRules: serializeRulesAssertions,
  serializeRule: serializeRuleAssertions,
  serializeStyleRule: serializeStyleRuleAssertions,
  serializeMediaRule: serializeMediaRuleAssertions,
  serializeStyleProps: serializeStylePropsAssertions,
  serializeStyleProp: serializeStylePropAssertions,
  serializeFluidProp: serializeFluidPropAssertions,
  applyExplicitPropsFromShorthand: applyExplicitPropsFromShorthandAssertions,
};

export default defaultAssertions;
