let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import AssertionMaster, { AssertionChain } from "gold-sight";
import { NullRule, SerializeDocMaster } from "./index.types";
import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
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
} from "./masterController";
import {
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
    expect(result).toEqual(
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
    let rules = getRulesByAbsIndex(state.master!.docClone, state.rulesIndex);

    if (rules) rules = clearNullsForRules(rules);

    expect(result).toEqual(rules);
  },
};

const serializeRuleAssertions: AssertionChain<
  State,
  [CSSRule],
  RuleClone | null
> = {
  "should serialize the rule": (state, args, result) => {
    let masterRule = getRuleByAbsIndex(state.master!.docClone, state.ruleIndex);

    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    expect(result).toEqual(masterRule);
  },
};

const serializeStyleRuleAssertions: AssertionChain<
  State,
  [CSSStyleRule],
  StyleRuleClone | null
> = {
  "should serialize the style rule": (state, args, result) => {
    const masterRule = getStyleRuleByAbsIndex(
      state.master!.docClone,
      state.styleRuleIndex
    );
    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return;
    }
    expect(result).toEqual(masterRule);
  },
};

const serializeMediaRuleAssertions: AssertionChain<
  State,
  [CSSMediaRule],
  MediaRuleClone | null
> = {
  "should serialize the media rule": (state, args, result) => {
    let masterRule = getMediaRuleByAbsIndex(
      state.master!.docClone,
      state.mediaRuleIndex
    );
    if (result === null) {
      expect((masterRule as NullRule).null).toBeTruthy();
      return;
    }

    if (masterRule) masterRule = clearNullsForRule(masterRule);

    expect(result).toEqual(masterRule);
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
    serializeDocAssertionMaster.serializeMediaRule
  );
}

export { serializeDocAssertionMaster, wrapAll };
