import AssertionMaster, { AssertionChain } from "gold-sight";
import { ParseDocMaster } from "./index.types";
import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/serializer.types";
import {
  BatchState,
  DocResultState,
  FluidData,
  ParseDocResults,
  RuleBatch,
} from "../../../src/parsing/parser/parser.types";
import {
  batchRule,
  batchRules,
  batchStyleSheet,
  cloneBatchState,
  determineBaselineWidth,
  parseDocument,
  parseStyleSheet,
  parseStyleSheets,
  wrap,
} from "../../../src/parsing/parser/parser";
import { makeTestMessage, toBeEqualDefined } from "../../utils/vitest";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/serializerConsts";

let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

type State = {
  sheetIndex: number;
  master?: ParseDocMaster;
};

const parseDocAssertions: AssertionChain<
  State,
  [DocumentClone],
  ParseDocResults
> = {
  "should parse the document": (state, args, result) => {
    expect(result.breakpoints).toEqual(state.master!.breakpoints);
  },
};

const parseStyleSheetsAssertions: AssertionChain<
  State,
  [StyleSheetClone[]],
  FluidData
> = {
  "should parse the style sheets": (state, args, result) => {},
};

const parseStyleSheetAssertions: AssertionChain<
  State,
  [StyleSheetClone],
  DocResultState
> = {
  "should parse the style sheet": (state, args, result) => {},
};

const batchStyleSheetAssertions: AssertionChain<
  State,
  [StyleSheetClone],
  RuleBatch[]
> = {
  "should batch the style sheet": (state, args, result) => {
    toBeEqualDefined(result, state.master!.ruleBatches[state.sheetIndex - 1]);
  },
};

const determineBaselineWidthAssertions: AssertionChain<
  State,
  [StyleSheetClone],
  number
> = {
  "should determine the baseline width": (state, args, result) => {
    expect(result).toBe(state.master!.baselineWidths[state.sheetIndex - 1]);
  },
};

const batchRulesAssertions: AssertionChain<State, [RuleClone[]], RuleBatch[]> =
  {
    "should batch the rules": (state, args, result) => {
      toBeEqualDefined(result, state.master!.ruleBatches[state.sheetIndex - 1]);
    },
  };

const batchRuleAssertions: AssertionChain<
  State,
  [RuleClone, BatchState, number],
  BatchState
> = {
  "should batch the rule": (state, args, result) => {
    const [rule, , baselineWidth] = args;
    const lastBatchIndex = result.batches.length - 1;
    const lastBatch = result.batches[lastBatchIndex];
    const lastRuleIndex = lastBatch.rules.length - 1;

    const masterBatch =
      state.master!.ruleBatches[state.sheetIndex - 1][lastBatchIndex];

    if (lastRuleIndex > -1) {
      toBeEqualDefined(
        lastBatch.rules[lastRuleIndex],
        masterBatch.rules[lastRuleIndex]
      );
    } else {
      expect(lastBatch.rules).toEqual(masterBatch.rules);
    }

    if (rule.type === MEDIA_RULE_TYPE) expect(result.currentBatch).toBeNull();
    else if (rule.type === STYLE_RULE_TYPE)
      expect(result.currentBatch).toBe(lastBatch);
  },
};

const cloneBatchStateAssertions: AssertionChain<
  State,
  [BatchState],
  BatchState
> = {
  "should clone the batch state": (state, args, result) => {
    expect(result).not.toBe(args[0]);
    expect(result).toEqual(args[0]);
  },
};

const defaultAssertions = {
  parseDocument: parseDocAssertions,
  parseStyleSheets: parseStyleSheetsAssertions,
  parseStyleSheet: parseStyleSheetAssertions,
  batchStyleSheet: batchStyleSheetAssertions,
  determineBaselineWidth: determineBaselineWidthAssertions,
  batchRules: batchRulesAssertions,
  batchRule: batchRuleAssertions,
  cloneBatchState: cloneBatchStateAssertions,
};

class ParseDocAssertionMaster extends AssertionMaster<State, ParseDocMaster> {
  constructor() {
    super(defaultAssertions, "parseDoc");
  }

  newState(): State {
    return {
      sheetIndex: 0,
    };
  }

  parseDocument = this.wrapTopFn(parseDocument, "parseDocument");

  parseStyleSheets = this.wrapFn(parseStyleSheets, "parseStyleSheets");

  parseStyleSheet = this.wrapFn(parseStyleSheet, "parseStyleSheet", {
    post: (state) => {
      state.sheetIndex++;
    },
  });

  batchStyleSheet = this.wrapFn(batchStyleSheet, "batchStyleSheet");

  determineBaselineWidth = this.wrapFn(
    determineBaselineWidth,
    "determineBaselineWidth"
  );

  batchRules = this.wrapFn(batchRules, "batchRules");

  batchRule = this.wrapFn(batchRule, "batchRule");

  cloneBatchState = this.wrapFn(cloneBatchState, "cloneBatchState");
}

const parseDocAssertionMaster = new ParseDocAssertionMaster();

function wrapAll() {
  wrap(
    parseDocAssertionMaster.parseDocument,
    parseDocAssertionMaster.parseStyleSheets,
    parseDocAssertionMaster.parseStyleSheet,
    parseDocAssertionMaster.batchStyleSheet,
    parseDocAssertionMaster.batchRules,
    parseDocAssertionMaster.batchRule,
    parseDocAssertionMaster.cloneBatchState,
    parseDocAssertionMaster.determineBaselineWidth
  );
}

export { wrapAll };

export { parseDocAssertionMaster };
