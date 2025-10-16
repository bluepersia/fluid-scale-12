let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import AssertionMaster, {
  AssertionChain,
  AssertionChainForFunc,
} from "gold-sight";
import { ParseDocMaster } from "./index.types";
import { MediaRuleClone } from "../../../src/parsing/serialization/docSerializer.types";
import {
  BatchState,
  RuleBatch,
} from "../../../src/parsing/parser/docParser.types";
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
} from "../../../src/parsing/parser/docParser";
import { toBeEqualDefined } from "../../utils/vitest";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../../../src/parsing/serialization/docSerializerConsts";
import { deepClone } from "../../utils/objectCloner";
import {
  applyForce,
  applySpanStart,
  cloneFluidData,
  insertFluidData,
  parseBatch,
  parseBatches,
  parseNextBatch,
  parseNextBatches,
  parseNextRule,
  parseProperty,
  parseSelector,
  parseStyleRule,
} from "../../../src/parsing/parser/fluidDataPatcher";
import { countStyleRulesInSheet } from "./masterController";
import {
  parseBatchesAssertions,
  parseBatchAssertions,
  parseStyleRuleAssertions,
  parseSelectorAssertions,
  parsePropertyAssertions,
  parseNextBatchAssertions,
  parseNextRuleAssertions,
  insertFluidDataAssertions,
  cloneFluidDataAssertions,
  assertChildFluidInsertions,
  parseNextBatchesAssertions,
  applyForceAssertions,
  applySpanStartAssertions,
} from "./fluidDataPatcher/gold-sight";

export type State = {
  sheetIndex: number;
  master?: ParseDocMaster;
};

const parseDocAssertions: AssertionChainForFunc<State, typeof parseDocument> = {
  "should parse the document": (state, args, result) => {
    expect(result.breakpoints).toEqual(state.master!.breakpoints);
    expect(result.fluidData).toEqual(state.master!.fluidData);
  },
};

const parseStyleSheetsAssertions: AssertionChainForFunc<
  State,
  typeof parseStyleSheets
> = {
  "should parse the style sheets": (state, args, result) => {
    expect(result).toEqual(state.master!.fluidData);
  },
};

const parseStyleSheetAssertions: AssertionChainForFunc<
  State,
  typeof parseStyleSheet
> = {
  "should parse the style sheet": (state, args, result, allAssertions) => {
    const [, ctx] = args;

    const {
      docResultState: { fluidData, orderID },
    } = ctx;

    assertChildFluidInsertions(
      (assertion) => assertion.args[2].sheetIndex === ctx.sheetIndex,
      allAssertions,
      { result: result.fluidData, state, prevFluidData: fluidData }
    );
  },
};

const batchStyleSheetAssertions: AssertionChainForFunc<
  State,
  typeof batchStyleSheet
> = {
  "should batch the style sheet": (state, args, result) => {
    toBeEqualDefined(result, state.master!.ruleBatches[state.sheetIndex - 1]);
  },
};

const determineBaselineWidthAssertions: AssertionChainForFunc<
  State,
  typeof determineBaselineWidth
> = {
  "should determine the baseline width": (state, args, result) => {
    expect(result).toBe(state.master!.baselineWidths[state.sheetIndex - 1]);
  },
};

const batchRulesAssertions: AssertionChainForFunc<State, typeof batchRules> = {
  "should batch the rules": (state, args, result) => {
    toBeEqualDefined(result, state.master!.ruleBatches[state.sheetIndex - 1]);
  },
};

const batchRuleAssertions: AssertionChainForFunc<State, typeof batchRule> = {
  "should batch the rule": (state, args, result) => {
    const [rule, batchState] = args;

    if (rule.type === MEDIA_RULE_TYPE) {
      const { cssRules } = rule as MediaRuleClone;
      if (cssRules.length <= 0) {
        expect(result).toBe(batchState);
        return;
      }
    }

    const lastBatchIndex = result.batches.length - 1;
    const lastBatch = result.batches[lastBatchIndex];
    const lastRuleIndex = lastBatch.rules.length - 1;

    const masterBatch =
      state.master!.ruleBatches[state.sheetIndex - 1][lastBatchIndex];

    toBeEqualDefined(
      lastBatch.rules[lastRuleIndex],
      masterBatch.rules[lastRuleIndex]
    );

    if (rule.type === MEDIA_RULE_TYPE) expect(result.currentBatch).toBeNull();
    else if (rule.type === STYLE_RULE_TYPE)
      expect(result.currentBatch).toBe(lastBatch);
  },
};

const cloneBatchStateAssertions: AssertionChain<
  State,
  [BatchState],
  [BatchState, RuleBatch[], RuleBatch, BatchState]
> = {
  "should clone the batch state": (state, args, result) => {
    const [arg] = args;

    const [ref, batchesRef, currentBatchRef, clone] = result;
    expect(ref).not.toBe(arg);
    expect(clone).toEqual(arg);

    if (arg.currentBatch === null) expect(currentBatchRef).toBeNull();
    else {
      expect(currentBatchRef).not.toBe(arg.currentBatch);
      expect(currentBatchRef!.rules).not.toBe(arg.currentBatch!.rules);
    }

    expect(batchesRef).not.toBe(arg.batches);
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
  parseBatches: parseBatchesAssertions,
  parseBatch: parseBatchAssertions,
  parseStyleRule: parseStyleRuleAssertions,
  parseSelector: parseSelectorAssertions,
  parseProperty: parsePropertyAssertions,
  applySpanStart: applySpanStartAssertions,
  applyForce: applyForceAssertions,
  parseNextBatch: parseNextBatchAssertions,
  parseNextBatches: parseNextBatchesAssertions,
  parseNextRule: parseNextRuleAssertions,
  insertFluidData: insertFluidDataAssertions,
  cloneFluidData: cloneFluidDataAssertions,
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

  cloneBatchState = this.wrapFn(cloneBatchState, "cloneBatchState", {
    resultConverter: (result) => {
      return [result, result.batches, result.currentBatch, deepClone(result)];
    },
  });

  parseBatches = this.wrapFn(parseBatches, "parseBatches");

  parseBatch = this.wrapFn(parseBatch, "parseBatch");

  parseStyleRule = this.wrapFn(parseStyleRule, "parseStyleRule");

  parseSelector = this.wrapFn(parseSelector, "parseSelector");

  parseProperty = this.wrapFn(parseProperty, "parseProperty");

  applySpanStart = this.wrapFn(applySpanStart, "applySpanStart");

  applyForce = this.wrapFn(applyForce, "applyForce");

  parseNextBatch = this.wrapFn(parseNextBatch, "parseNextBatch");

  parseNextBatches = this.wrapFn(parseNextBatches, "parseNextBatches");

  parseNextRule = this.wrapFn(parseNextRule, "parseNextRule");

  insertFluidData = this.wrapFn(insertFluidData, "insertFluidData", {
    getId: (args) => args[1].selector,
  });

  cloneFluidData = this.wrapFn(cloneFluidData, "cloneFluidData", {
    resultConverter: (result, args) => {
      const [fluidDataArg, anchorArg, selectorArg, propertyArg] = args;

      return {
        result,
        resultClone: deepClone(result),
        anchorRef: result[anchorArg],
        selectorRef: result[anchorArg]?.[selectorArg],
        propertyRef: result[anchorArg]?.[selectorArg]?.[propertyArg],
        rangesRef: result[anchorArg]?.[selectorArg]?.[propertyArg]?.ranges,
      };
    },
  });
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
    parseDocAssertionMaster.determineBaselineWidth,
    parseDocAssertionMaster.parseBatches,
    parseDocAssertionMaster.parseBatch,
    parseDocAssertionMaster.parseStyleRule,
    parseDocAssertionMaster.parseSelector,
    parseDocAssertionMaster.parseProperty,
    parseDocAssertionMaster.applySpanStart,
    parseDocAssertionMaster.applyForce,
    parseDocAssertionMaster.parseNextBatch,
    parseDocAssertionMaster.parseNextBatches,
    parseDocAssertionMaster.parseNextRule,
    parseDocAssertionMaster.insertFluidData,
    parseDocAssertionMaster.cloneFluidData
  );
}

export { wrapAll };

export { parseDocAssertionMaster };
