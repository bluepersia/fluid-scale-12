let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import { AssertionChain, AssertionChainForFunc } from "gold-sight";
import {
  AssertChildFluidInsertionsContext,
  ParsePropertyAssertionBlueprint,
} from "../index.types";

import {
  FluidData,
  FluidRange,
  InsertFluidDataContext,
} from "../../../../src/parsing/parser/docParser.types";

import { toBeEqualDefined } from "../../../utils/vitest";

import {
  applyForce,
  applySpanStart,
  getAnchor,
  insertFluidData,
  parseBatch,
  parseBatches,
  parseNextBatch,
  parseNextBatches,
  parseNextRule,
  parseProperty,
  parsePropsValues,
  parseSelector,
  parseStyleRule,
  propListContains,
} from "../../../../src/parsing/parser/fluidDataPatcher";
import { State } from "../gold-sight";

function assertFluidRangeInsertion(
  result: FluidData,
  ctx: Pick<InsertFluidDataContext, "anchor" | "selector" | "property"> & {
    fluidData: FluidData;
  },
  state: State
) {
  const { anchor, selector, property, fluidData } = ctx;

  const propResult = result[anchor][selector][property];
  const rangesResult = propResult.ranges;

  const argsRanges = fluidData[anchor]?.[selector]?.[property]?.ranges;
  const argRangesLength = argsRanges?.length ?? 0;

  const masterProp = state.master!.fluidData[anchor][selector][property];

  expect(propResult.metaData.orderID).toBe(masterProp.metaData.orderID);

  expect(propResult.metaData.property).toBe(masterProp.metaData.property);

  if (argsRanges)
    expect(rangesResult.length).toBeGreaterThan(argsRanges.length);

  toBeEqualDefined(
    rangesResult[argRangesLength],
    masterProp.ranges[argRangesLength]
  );
}

function assertChildFluidInsertions(
  requirement: (assertion: ParsePropertyAssertionBlueprint) => boolean,
  allAssertions: ParsePropertyAssertionBlueprint[],
  ctx: AssertChildFluidInsertionsContext
) {
  const { result, state, prevFluidData } = ctx;

  const propertyAssertions = allAssertions.filter((assertion) => {
    return (
      assertion.name === "parseProperty" &&
      assertion.args[2].docResultState.fluidData !==
        assertion.result.fluidData &&
      requirement(assertion)
    );
  });

  for (const propertyAssertion of propertyAssertions) {
    const [, property, propertyCtx] = propertyAssertion.args;

    const { selector } = propertyCtx;

    assertFluidRangeInsertion(
      result,
      {
        fluidData: prevFluidData,
        anchor: getAnchor(selector),
        selector,
        property,
      },
      state
    );
  }
  return true;
}

const parseBatchesAssertions: AssertionChainForFunc<
  State,
  typeof parseBatches
> = {
  "should parse the batches": (state, args, result, allAssertions) => {
    const [batches, ctx] = args;

    const {
      docResultState: { orderID, fluidData },
    } = ctx;

    assertChildFluidInsertions(
      (assertion) => assertion.args[2].batches === batches,
      allAssertions,
      { result: result.fluidData, state, prevFluidData: fluidData }
    );

    return true;
  },
};

const parseBatchAssertions: AssertionChainForFunc<State, typeof parseBatch> = {
  "should parse the batch": (state, args, result, allAssertions) => {
    const [batch, ctx] = args;

    const {
      docResultState: { orderID, fluidData },
      batchIndex,
      batches,
    } = ctx;

    assertChildFluidInsertions(
      (assertion) =>
        assertion.args[2].batchIndex === batchIndex &&
        assertion.args[2].batches === batches,
      allAssertions,
      { result: result.fluidData, state, prevFluidData: fluidData }
    );
    return true;
  },
};

const parseStyleRuleAssertions: AssertionChainForFunc<
  State,
  typeof parseStyleRule
> = {
  "should parse the style rule": (state, args, result, allAssertions) => {
    const [rule, ctx] = args;
    const { docResultState, batchIndex, batches } = ctx;
    const { fluidData } = docResultState;
    assertChildFluidInsertions(
      (assertion) =>
        assertion.args[2].batchIndex === batchIndex &&
        assertion.args[2].batches === batches &&
        assertion.args[0] === rule,
      allAssertions,
      { result: result.fluidData, state, prevFluidData: fluidData }
    );
    return true;
  },
};
const parseSelectorAssertions: AssertionChainForFunc<
  State,
  typeof parseSelector
> = {
  "should parse the selector": (state, args, result, allAssertions) => {
    const [rule, selector, ctx] = args;

    const { docResultState, batchIndex, batches } = ctx;
    const { fluidData } = docResultState;

    assertChildFluidInsertions(
      (assertion) =>
        assertion.args[2].selector === selector &&
        assertion.args[0] === rule &&
        assertion.args[2].batchIndex === batchIndex &&
        assertion.args[2].batches === batches,
      allAssertions,
      { result: result.fluidData, state, prevFluidData: fluidData }
    );
    return true;
  },
};

const parsePropertyAssertions: AssertionChainForFunc<
  State,
  typeof parseProperty
> = {
  "should parse the property": (state, args, result) => {
    const [, property, ctx] = args;

    const { docResultState, selector } = ctx;
    const { fluidData } = docResultState;

    if (result.fluidData === docResultState.fluidData) {
      return;
    }

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(
      result.fluidData,
      { ...ctx, anchor, property, fluidData },
      state
    );
    return true;
  },
};

const applySpanStartAssertions: AssertionChainForFunc<
  State,
  typeof applySpanStart
> = {
  "should apply a span start fluid data insertion": (state, args, result) => {
    const [styleRule, property, ctx] = args;

    const { selector } = ctx;

    if (!result) {
      return;
    }

    expect(result.spans[selector][property]).toBe(
      state.master!.spans[selector][property]
    );
    return true;
  },
};

const applyForceAssertions: AssertionChainForFunc<State, typeof applyForce> = {
  "should apply a force fluid data insertion": (state, args, result) => {
    const [, property, ctx] = args;

    const { docResultState, selector } = ctx;
    const { fluidData } = docResultState;

    if (!result) {
      return;
    }

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(
      result.fluidData,
      { ...ctx, anchor, property, fluidData },
      state
    );
    return true;
  },
};

const parseNextBatchesAssertions: AssertionChainForFunc<
  State,
  typeof parseNextBatches
> = {
  "should parse the next batches": (state, args, result) => {
    const [, property, ctx] = args;

    const { docResultState, selector } = ctx;

    if (result === docResultState) {
      return;
    }
    const { fluidData } = docResultState;

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(
      result.fluidData,
      { ...ctx, anchor, property, fluidData },
      state
    );
    return true;
  },
};

const parseNextBatchAssertions: AssertionChainForFunc<
  State,
  typeof parseNextBatch
> = {
  "should parse the next rule batch": (state, args, result) => {
    const [, ctx] = args;

    const { docResultState, selector } = ctx;

    if (result === docResultState) {
      return;
    }
    const { fluidData } = docResultState;

    const anchor = getAnchor(selector);

    assertFluidRangeInsertion(
      result.fluidData,
      { ...ctx, anchor, fluidData },
      state
    );
    return true;
  },
};

const parseNextRuleAssertions: AssertionChainForFunc<
  State,
  typeof parseNextRule
> = {
  "should parse the next rule": (state, args, result) => {
    const [rule, ctx] = args;

    const { selector, property, docResultState } = ctx;

    if (!rule.style[property]) {
      expect(result).toBe(docResultState);
      return;
    }

    const anchor = getAnchor(selector);
    const { fluidData } = docResultState;

    assertFluidRangeInsertion(
      result.fluidData,
      { ...ctx, anchor, fluidData },
      state
    );
    return true;
  },
};

const insertFluidDataAssertions: AssertionChainForFunc<
  State,
  typeof insertFluidData
> = {
  "should insert the fluid data": (state, args, result) => {
    const [, ctx] = args;

    const {
      docResultState: { fluidData },
    } = ctx;
    assertFluidRangeInsertion(result.fluidData, { ...ctx, fluidData }, state);
    return true;
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
    return true;
  },
};

export {
  parseBatchesAssertions,
  parseBatchAssertions,
  parseStyleRuleAssertions,
  parseSelectorAssertions,
  parsePropertyAssertions,
  applyForceAssertions,
  parseNextBatchAssertions,
  parseNextBatchesAssertions,
  parseNextRuleAssertions,
  cloneFluidDataAssertions,
  insertFluidDataAssertions,
  assertChildFluidInsertions,
  applySpanStartAssertions,
};
