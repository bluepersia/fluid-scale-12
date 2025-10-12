import AssertionMaster, { AssertionChain } from "gold-sight";
import { ParseDocMaster } from "./index.types";
import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../src/parsing/serialization/docSerializer.types";
import {
  BatchState,
  DocResultState,
  FluidData,
  FluidRange,
  InsertFluidDataContext,
  ParseBatchContext,
  ParseDocResults,
  ParseNextBatchContext,
  ParseNextRuleContext,
  ParsePropertyContext,
  ParseSelectorContext,
  ParseStyleRuleContext,
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
  cloneFluidData,
  getAnchor,
  insertFluidData,
  parseBatch,
  parseNextBatch,
  parseNextRule,
  parseProperty,
  parseSelector,
  parseStyleRule,
} from "../../../src/parsing/parser/fluidDataPatcher";

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

function assertFluidRangeInsertion(
  result: FluidData,
  ctx: Pick<
    InsertFluidDataContext,
    "anchor" | "selector" | "property" | "fluidData"
  >,
  state: State
) {
  const { anchor, selector, property, fluidData } = ctx;
  const propResult = result[anchor][selector][property];
  const rangesResult = propResult.ranges;

  const argsRanges = fluidData[anchor]?.[selector]?.[property]?.ranges;

  const masterProp = state.master!.fluidData[anchor][selector][property];

  expect(propResult.metaData.orderID).toBe(masterProp.metaData.orderID);
  expect(propResult.metaData.property).toBe(masterProp.metaData.property);

  if (argsRanges)
    expect(rangesResult.length).toBeGreaterThan(argsRanges.length);

  toBeEqualDefined(
    rangesResult[rangesResult.length - 1],
    masterProp.ranges[rangesResult.length - 1]
  );
}

const parseBatchAssertions: AssertionChain<
  State,
  [RuleBatch, ParseBatchContext],
  DocResultState
> = {
  "should parse the batch": (state, args, result, allAssertions) => {
    const [batch, ctx] = args;

    const {
      docResultState: { orderID, fluidData },
      batchIndex,
      batches,
    } = ctx;

    const propertyAssertions = allAssertions.filter(
      ({ name, args, result: propertyResult }) =>
        name === "parseProperty" &&
        args[2].fluidData !== propertyResult &&
        args[2].batchIndex === batchIndex &&
        args[2].batches === batches
    );

    for (const propertyAssertion of propertyAssertions) {
      const [, property, propertyCtx] = propertyAssertion.args;

      const { selector } = propertyCtx;

      console.log(selector, result.fluidData);
      assertFluidRangeInsertion(
        result.fluidData,
        { ...ctx, fluidData, anchor: getAnchor(selector), selector, property },
        state
      );
    }

    const ruleCount = batch.rules.length;
    expect(result.orderID).toBe(orderID + 1 * ruleCount);
  },
};

const parseStyleRuleAssertions: AssertionChain<
  State,
  [StyleRuleClone, ParseStyleRuleContext],
  FluidData
> = {
  "should parse the style rule": (state, args, result, allAssertions) => {
    const [rule, ctx] = args;
    const { fluidData, batchIndex, batches } = ctx;

    const propertyAssertions = allAssertions.filter(
      ({ name, args, result: propertyResult }) =>
        name === "parseProperty" &&
        args[0] === rule &&
        args[2].fluidData !== propertyResult &&
        args[2].batchIndex === batchIndex &&
        args[2].batches === batches
    );

    for (const propertyAssertion of propertyAssertions) {
      const [, property, propertyCtx] = propertyAssertion.args;

      const { selector } = propertyCtx;

      assertFluidRangeInsertion(
        result,
        { ...ctx, fluidData, anchor: getAnchor(selector), selector, property },
        state
      );
    }
  },
};
const parseSelectorAssertions: AssertionChain<
  State,
  [StyleRuleClone, string, ParseSelectorContext],
  FluidData
> = {
  "should parse the selector": (state, args, result, allAssertions) => {
    const [rule, selector, ctx] = args;

    const { fluidData, batchIndex, batches } = ctx;

    const propertyAssertions = allAssertions.filter(
      ({ name, args, result: propertyResult }) =>
        name === "parseProperty" &&
        args[2].selector === selector &&
        args[2].fluidData !== propertyResult &&
        args[2].batchIndex === batchIndex &&
        args[2].batches === batches
    );

    for (const propertyAssertion of propertyAssertions) {
      const [, property] = propertyAssertion.args;

      assertFluidRangeInsertion(
        result,
        { fluidData, anchor: getAnchor(selector), selector, property },
        state
      );
    }
  },
};

const parsePropertyAssertions: AssertionChain<
  State,
  [StyleRuleClone, string, ParsePropertyContext],
  FluidData
> = {
  "should parse the property": (state, args, result) => {
    const [, property, ctx] = args;

    const { fluidData, selector } = ctx;

    if (result === fluidData) {
      return;
    }

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(result, { ...ctx, anchor, property }, state);
  },
};

const parseNextBatchAssertions: AssertionChain<
  State,
  [RuleBatch, ParseNextBatchContext],
  FluidData
> = {
  "should parse the next rule batch": (state, args, result) => {
    const [, ctx] = args;

    const { fluidData, selector } = ctx;

    if (result === fluidData) {
      return;
    }

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(result, { ...ctx, anchor }, state);
  },
};

const parseNextRuleAssertions: AssertionChain<
  State,
  [StyleRuleClone, ParseNextRuleContext],
  FluidData
> = {
  "should parse the next rule": (state, args, result) => {
    const [rule, ctx] = args;

    const { selector, property, fluidData } = ctx;

    if (!rule.style[property]) {
      expect(result).toBe(fluidData);
      return;
    }

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(result, { ...ctx, anchor }, state);
  },
};

const insertFluidDataAssertions: AssertionChain<
  State,
  [FluidData, InsertFluidDataContext],
  FluidData
> = {
  "should insert the fluid data": (state, args, result) => {
    const [, ctx] = args;

    assertFluidRangeInsertion(result, ctx, state);
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

type CloneFluidDataResults = {
  result: FluidData;
  resultClone: FluidData;
  anchorRef: string;
  selectorRef: string;
  propertyRef: string;
  rangesRef: FluidRange[];
};

const cloneFluidDataAssertions: AssertionChain<
  State,
  [FluidData, string, string, string],
  CloneFluidDataResults
> = {
  "should clone the fluid data": (state, args, results) => {
    const [fluidDataArg, anchorArg, selectorArg, propertyArg] = args;

    const {
      result,
      resultClone,
      anchorRef,
      selectorRef,
      propertyRef,
      rangesRef,
    } = results;

    expect(result).not.toBe(fluidDataArg);

    if (fluidDataArg[anchorArg]) {
      expect(anchorRef).not.toBe(fluidDataArg[anchorArg]);

      if (fluidDataArg[anchorArg][selectorArg]) {
        expect(selectorRef).not.toBe(fluidDataArg[anchorArg][selectorArg]);

        if (fluidDataArg[anchorArg][selectorArg][propertyArg]) {
          expect(propertyRef).not.toBe(
            fluidDataArg[anchorArg][selectorArg][propertyArg]
          );
          expect(rangesRef).not.toBe(
            fluidDataArg[anchorArg][selectorArg][propertyArg].ranges
          );
        } else {
          expect(
            resultClone[anchorArg][selectorArg][propertyArg]
          ).toBeUndefined();
        }
      } else {
        expect(resultClone[anchorArg][selectorArg]).toBeUndefined();
      }
    } else {
      expect(resultClone[anchorArg]).toBeUndefined();
    }
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
  parseBatch: parseBatchAssertions,
  parseStyleRule: parseStyleRuleAssertions,
  parseSelector: parseSelectorAssertions,
  parseProperty: parsePropertyAssertions,
  parseNextBatch: parseNextBatchAssertions,
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

  parseBatch = this.wrapFn(parseBatch, "parseBatch");

  parseStyleRule = this.wrapFn(parseStyleRule, "parseStyleRule");

  parseSelector = this.wrapFn(parseSelector, "parseSelector");

  parseProperty = this.wrapFn(parseProperty, "parseProperty");

  parseNextBatch = this.wrapFn(parseNextBatch, "parseNextBatch");

  parseNextRule = this.wrapFn(parseNextRule, "parseNextRule");

  insertFluidData = this.wrapFn(insertFluidData, "insertFluidData");

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
    parseDocAssertionMaster.parseBatch,
    parseDocAssertionMaster.parseStyleRule,
    parseDocAssertionMaster.parseSelector,
    parseDocAssertionMaster.parseProperty,
    parseDocAssertionMaster.parseNextBatch,
    parseDocAssertionMaster.parseNextRule,
    parseDocAssertionMaster.insertFluidData,
    parseDocAssertionMaster.cloneFluidData
  );
}

export { wrapAll };

export { parseDocAssertionMaster };
