let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import AssertionMaster, { AssertionChain } from "gold-sight";
import {
  AssertFluidPropContext,
  NullRule,
  SerializeDocMaster,
} from "./index.types";
import {
  ApplyExplicitPropsFromShorthandContext,
  CloneStylePropContext,
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  SerializeDocContext,
  StyleResults,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/serializer.types";
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
  normalizeDoc,
  normalizeStyleSheets,
  normalizeStyleSheet,
  normalizeRules,
  normalizeRule,
  normalizeStyle,
} from "./masterController";
import {
  applyExplicitPropsFromShorthand,
  cloneFluidProp,
  cloneStyleProp,
  cloneStyleProps,
  getAccessibleStyleSheets,
  serializeDocument,
  serializeMediaRule,
  serializeRule,
  serializeRules,
  serializeStyleRule,
  serializeStyleSheet,
  serializeStyleSheets,
  wrap,
} from "../../../src/parsing/serialization/serializer";
import {
  FLUID_PROPERTY_NAMES,
  SHORTHAND_PROPERTIES,
  SPECIAL_PROPERTIES,
} from "../../../src/parsing/serialization/serializerConsts";
import { makeTestMessage, toBeEqualDefined } from "../../utils/vitest";

type State = {
  sheetIndex: number;
  ruleIndex: number;
  rulesIndex: number;
  styleRuleIndex: number;
  mediaRuleIndex: number;
  master?: SerializeDocMaster;
};

const serializeDocAssertions: AssertionChain<State, [Document], DocumentClone> =
  {
    "should serialize the document": (state, args, result) => {
      result = normalizeDoc(result);
      expect(result).toEqual(clearNullsForDoc(state.master!.docClone));
    },
  };

const getAccessibleStyleSheetsAssertions: AssertionChain<
  State,
  [StyleSheetList],
  CSSStyleSheet[]
> = {
  "should get the accessible style sheets": (state, args, result) => {
    expect(result.length).toBe(state.master!.docClone.styleSheets.length);
  },
};
const serializeStyleSheetsAssertions: AssertionChain<
  State,
  [CSSStyleSheet[]],
  StyleSheetClone[]
> = {
  "should serialize the style sheets": (state, args, result) => {
    result = normalizeStyleSheets(result);
    expect(result).toEqual(
      clearNullsForStyleSheets(state.master!.docClone.styleSheets)
    );
  },
};

const serializeStyleSheetAssertions: AssertionChain<
  State,
  [CSSStyleSheet],
  StyleSheetClone
> = {
  "should serialize the style sheet": (state, args, result) => {
    result = normalizeStyleSheet(result);
    toBeEqualDefined(
      result,
      clearNullsForStyleSheet(
        state.master!.docClone.styleSheets[state.sheetIndex]
      )
    );
  },
};

const serializeRulesAssertions: AssertionChain<
  State,
  [CSSRuleList],
  RuleClone[]
> = {
  "should serialize the rules": (state, args, result) => {
    result = normalizeRules(result);
    let rules = getRulesByAbsIndex(state.master!.docClone, state.rulesIndex);

    if (rules) rules = clearNullsForRules(rules);

    toBeEqualDefined(result, rules);
  },
};

const serializeRuleAssertions: AssertionChain<
  State,
  [CSSRule],
  RuleClone | null
> = {
  "should serialize the rule": (state, args, result) => {
    result = result ? normalizeRule(result) : null;
    let masterRule = getRuleByAbsIndex(state.master!.docClone, state.ruleIndex);

    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    toBeEqualDefined(result, masterRule);
  },
};

const serializeStyleRuleAssertions: AssertionChain<
  State,
  [CSSStyleRule],
  StyleRuleClone | null
> = {
  "should serialize the style rule": (state, args, result) => {
    result = result ? (normalizeRule(result) as StyleRuleClone) : null;

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex
    );
    if (result === null) {
      expect((masterRule as unknown as NullRule).null).toBeTruthy();
      return;
    }
    toBeEqualDefined(result, masterRule);
  },
};

const serializeMediaRuleAssertions: AssertionChain<
  State,
  [CSSMediaRule],
  MediaRuleClone | null
> = {
  "should serialize the media rule": (state, args, result) => {
    result = result ? (normalizeRule(result) as MediaRuleClone) : null;

    let masterRule = getMediaRuleByAbsIndex(
      state.master!.docClone,
      state.mediaRuleIndex
    );
    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    toBeEqualDefined(result, masterRule);
  },
};

const cloneStylePropsAssertions: AssertionChain<
  State,
  [CSSStyleRule, SerializeDocContext],
  StyleResults
> = {
  "should clone the style props": (state, args, result) => {
    let { style, specialProps } = result;

    style = normalizeStyle(style);

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    if (Object.keys(style).length <= 0) {
      expect((masterRule as unknown as NullRule).null).toBeTruthy();
      return;
    }

    expect(style).toEqual(masterRule!.style);
    expect(specialProps).toEqual(masterRule!.specialProps);
  },
};

const cloneStylePropAssertions: AssertionChain<
  State,
  [CSSStyleRule, string, CloneStylePropContext],
  StyleResults
> = {
  "should clone the style prop": (state, args, result) => {
    const [rule, prop, ctx] = args;
    const {
      isBrowser,
      styleResults: { style: styleArg },
    } = ctx;

    let { style, specialProps } = result;

    style = normalizeStyle(style);

    let masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    if (FLUID_PROPERTY_NAMES.has(prop)) {
      assertFluidProp(prop, { isBrowser, style, masterRule, styleArg });
    } else if (SPECIAL_PROPERTIES.has(prop)) {
      expect(specialProps[prop]).toEqual(masterRule!.specialProps[prop]);
    }
  },
};

function assertFluidProp(prop: string, ctx: AssertFluidPropContext) {
  const { isBrowser, style, masterRule, styleArg } = ctx;
  if (SHORTHAND_PROPERTIES[prop]) {
    if (isBrowser) return;
    expect(style).not.toEqual(styleArg);
    expect(masterRule!.style).toMatchObject(style);
  } else {
    toBeEqualDefined(style[prop], masterRule!.style[prop]);
  }
}

const cloneFluidPropAssertions: AssertionChain<
  State,
  [CSSStyleRule, string, CloneStylePropContext],
  Record<string, string>
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

    result = normalizeStyle(result);

    assertFluidProp(prop, {
      isBrowser,
      style: result,
      masterRule,
      styleArg,
    });
  },
};

const applyExplicitPropsFromShorthandAssertions: AssertionChain<
  State,
  [CSSStyleRule, string, ApplyExplicitPropsFromShorthandContext],
  Record<string, string>
> = {
  "should apply the explicit props from shorthand": (state, args, result) => {
    const [rule, prop, ctx] = args;
    const {
      isBrowser,
      styleResults: { style: styleArg },
    } = ctx;

    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex - 1
    );

    result = normalizeStyle(result);

    expect(result).not.toEqual(styleArg);
    expect(masterRule!.style).toMatchObject(result);
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
  cloneStyleProps: cloneStylePropsAssertions,
  cloneStyleProp: cloneStylePropAssertions,
  cloneFluidProp: cloneFluidPropAssertions,
  applyExplicitPropsFromShorthand: applyExplicitPropsFromShorthandAssertions,
};

class SerializeDocAssertionMaster extends AssertionMaster<
  State,
  SerializeDocMaster
> {
  constructor() {
    super(defaultAssertions, "serializeDoc");
  }
  newState(): State {
    return {
      sheetIndex: 0,
      ruleIndex: 0,
      rulesIndex: 0,
      styleRuleIndex: 0,
      mediaRuleIndex: 0,
    };
  }

  serializeDocument = this.wrapTopFn(serializeDocument, "serializeDocument");

  getAccessibleStyleSheets = this.wrapFn(
    getAccessibleStyleSheets,
    "getAccessibleStyleSheets"
  );

  serializeStyleSheets = this.wrapFn(
    serializeStyleSheets,
    "serializeStyleSheets"
  );

  serializeStyleSheet = this.wrapFn(
    serializeStyleSheet,
    "serializeStyleSheet",
    {
      post: (state) => {
        state.sheetIndex++;
      },
    }
  );

  serializeRules = this.wrapFn(serializeRules, "serializeRules", {
    post: (state) => {
      state.rulesIndex++;
    },
  });

  serializeRule = this.wrapFn(serializeRule, "serializeRule", {
    post: (state) => {
      state.ruleIndex++;
    },
  });

  serializeStyleRule = this.wrapFn(serializeStyleRule, "serializeStyleRule", {
    post: (state) => {
      state.styleRuleIndex++;
    },
  });

  serializeMediaRule = this.wrapFn(serializeMediaRule, "serializeMediaRule", {
    post: (state) => {
      state.mediaRuleIndex++;
    },
  });

  cloneStyleProps = this.wrapFn(cloneStyleProps, "cloneStyleProps");

  cloneStyleProp = this.wrapFn(cloneStyleProp, "cloneStyleProp");

  cloneFluidProp = this.wrapFn(cloneFluidProp, "cloneFluidProp");

  applyExplicitPropsFromShorthand = this.wrapFn(
    applyExplicitPropsFromShorthand,
    "applyExplicitPropsFromShorthand"
  );
}

const serializeDocAssertionMaster = new SerializeDocAssertionMaster();

function wrapAll() {
  wrap(
    serializeDocAssertionMaster.serializeDocument,
    serializeDocAssertionMaster.getAccessibleStyleSheets,
    serializeDocAssertionMaster.serializeStyleSheet,
    serializeDocAssertionMaster.serializeStyleSheets,
    serializeDocAssertionMaster.serializeRules,
    serializeDocAssertionMaster.serializeRule,
    serializeDocAssertionMaster.serializeStyleRule,
    serializeDocAssertionMaster.serializeMediaRule,
    serializeDocAssertionMaster.cloneStyleProps,
    serializeDocAssertionMaster.cloneStyleProp,
    serializeDocAssertionMaster.cloneFluidProp,
    serializeDocAssertionMaster.applyExplicitPropsFromShorthand
  );
}

export { serializeDocAssertionMaster, wrapAll };
