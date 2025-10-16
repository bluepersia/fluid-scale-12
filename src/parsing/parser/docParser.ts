import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleSheetClone,
} from "../serialization/docSerializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../serialization/docSerializerConsts";
import {
  BatchState,
  DocResultState,
  FluidData,
  ParseBatchContext,
  ParseBatchesContext,
  ParseDocResults,
  ParseStyleSheetContext,
  RuleBatch,
} from "./docParser.types";
import {
  applyForce,
  applySpanStart,
  insertFluidData,
  parseBatches,
  parseNextBatch,
  parseNextBatches,
  parseNextRule,
  parseProperty,
  parseSelector,
  parseStyleRule,
  wrap as wrapFluidDataPatcher,
} from "./fluidDataPatcher";

let parseDocument = (docClone: DocumentClone): ParseDocResults => {
  const { breakpoints, globalBaselineWidth } = parseMediaRules(
    docClone.styleSheets
  );

  const fluidData = parseStyleSheets(
    docClone.styleSheets,
    breakpoints,
    globalBaselineWidth
  );

  return { breakpoints, fluidData };
};

function parseMediaRules(styleSheets: StyleSheetClone[]) {
  const uniqueBreakpoints: Set<number> = new Set();
  let globalBaselineWidth = 375;

  for (const styleSheet of styleSheets) {
    for (const rule of styleSheet.cssRules) {
      if (rule.type === MEDIA_RULE_TYPE) {
        const mediaRule = rule as MediaRuleClone;
        const { minWidth } = mediaRule;
        uniqueBreakpoints.add(minWidth);
        if (mediaRule.cssRules.length <= 0) globalBaselineWidth = minWidth;
      }
    }
  }

  const breakpoints = Array.from(uniqueBreakpoints);
  breakpoints.sort((a, b) => a - b);

  return { breakpoints, globalBaselineWidth };
}

let parseStyleSheets = (
  styleSheets: StyleSheetClone[],
  breakpoints: number[],
  globalBaselineWidth: number
) => {
  breakpoints = breakpoints;
  let docResultState: DocResultState = {
    fluidData: {},
    orderID: 0,
    spans: {},
    isNew: false,
  };

  for (const [sheetIndex, styleSheet] of styleSheets.entries()) {
    docResultState = parseStyleSheet(styleSheet, {
      sheetIndex,
      docResultState,
      globalBaselineWidth,
      breakpoints,
    });
  }

  return docResultState.fluidData;
};

let parseStyleSheet = (
  styleSheet: StyleSheetClone,
  ctx: ParseStyleSheetContext
): DocResultState => {
  const { globalBaselineWidth } = ctx;
  const batches = batchStyleSheet(styleSheet, globalBaselineWidth);

  return parseBatches(batches, ctx);
};

let batchStyleSheet = (
  styleSheet: StyleSheetClone,
  globalBaselineWidth: number
): RuleBatch[] => {
  const baselineWidth = determineBaselineWidth(styleSheet, globalBaselineWidth);

  return batchRules(styleSheet.cssRules, baselineWidth);
};

let determineBaselineWidth = (
  styleSheet: StyleSheetClone,
  globalBaselineWidth: number
) => {
  let baselineWidth = globalBaselineWidth;

  const emptyMediaQuery: MediaRuleClone = styleSheet.cssRules.find(
    (rule) =>
      rule.type === MEDIA_RULE_TYPE &&
      (rule as MediaRuleClone).cssRules.length <= 0
  ) as MediaRuleClone;

  if (emptyMediaQuery) baselineWidth = emptyMediaQuery.minWidth;

  return baselineWidth;
};

let batchRules = (rules: RuleClone[], baselineWidth: number): RuleBatch[] => {
  let batchState: BatchState = {
    batches: [],
    currentBatch: null,
  };

  for (const rule of rules) {
    batchState = batchRule(rule, batchState, baselineWidth);
  }

  return batchState.batches;
};

let batchRule = (
  rule: RuleClone,
  batchState: BatchState,
  baselineWidth: number
): BatchState => {
  const newBatchState: BatchState = cloneBatchState(batchState);
  if (rule.type === STYLE_RULE_TYPE) {
    if (newBatchState.currentBatch === null) {
      newBatchState.currentBatch = {
        rules: [],
        width: baselineWidth,
        isMediaQuery: false,
      };
      newBatchState.batches.push(newBatchState.currentBatch);
    }
    newBatchState.currentBatch.rules.push(rule);
  } else if (rule.type === MEDIA_RULE_TYPE) {
    const { minWidth, cssRules } = rule as MediaRuleClone;
    if (cssRules.length <= 0) return batchState;
    newBatchState.currentBatch = null;
    newBatchState.batches.push({
      rules: cssRules,
      width: minWidth,
      isMediaQuery: true,
    });
  }
  return newBatchState;
};

let cloneBatchState = (batchState: BatchState): BatchState => {
  const clone = {
    batches: [...batchState.batches],
    currentBatch: batchState.currentBatch
      ? {
          ...batchState.currentBatch,
          rules: [...batchState.currentBatch.rules],
        }
      : null,
  };

  if (clone.currentBatch)
    clone.batches[clone.batches.length - 1] = clone.currentBatch;

  return clone;
};

function wrap(
  parseDocumentWrapped: (docClone: DocumentClone) => ParseDocResults,
  parseStyleSheetsWrapped: (
    styleSheets: StyleSheetClone[],
    breakpoints: number[],
    globalBaselineWidth: number
  ) => FluidData,
  parseStyleSheetWrapped: (
    styleSheet: StyleSheetClone,
    ctx: ParseStyleSheetContext
  ) => DocResultState,
  batchStyleSheetWrapped: (
    styleSheet: StyleSheetClone,
    globalBaselineWidth: number
  ) => RuleBatch[],
  batchRulesWrapped: (rules: RuleClone[], baselineWidth: number) => RuleBatch[],
  batchRuleWrapped: (
    rule: RuleClone,
    batchState: BatchState,
    baselineWidth: number
  ) => BatchState,
  cloneBatchStateWrapped: (batchState: BatchState) => BatchState,
  determineBaselineWidthWrapped: (
    styleSheet: StyleSheetClone,
    globalBaselineWidth: number
  ) => number,
  parseBatchesWrapped: (
    batches: RuleBatch[],
    ctx: ParseBatchesContext
  ) => DocResultState,
  parseBatchWrapped: (
    batch: RuleBatch,
    ctx: ParseBatchContext
  ) => DocResultState,
  parseStyleRuleWrapped: typeof parseStyleRule,
  parseSelectorWrapped: typeof parseSelector,
  parsePropertyWrapped: typeof parseProperty,
  applySpanStartWrapped: typeof applySpanStart,
  applyForceWrapped: typeof applyForce,
  parseNextBatchWrapped: typeof parseNextBatch,
  parseNextBatchesWrapped: typeof parseNextBatches,
  parseNextRuleWrapped: typeof parseNextRule,
  insertFluidDataWrapped: typeof insertFluidData,
  cloneFluidDataWrapped: (
    fluidData: FluidData,
    anchor: string,
    selector: string,
    property: string
  ) => FluidData
) {
  parseDocument = parseDocumentWrapped;
  parseStyleSheets = parseStyleSheetsWrapped;
  parseStyleSheet = parseStyleSheetWrapped;
  batchStyleSheet = batchStyleSheetWrapped;
  batchRules = batchRulesWrapped;
  batchRule = batchRuleWrapped;
  cloneBatchState = cloneBatchStateWrapped;
  determineBaselineWidth = determineBaselineWidthWrapped;
  wrapFluidDataPatcher(
    parseBatchesWrapped,
    parseBatchWrapped,
    parseStyleRuleWrapped,
    parseSelectorWrapped,
    parsePropertyWrapped,
    applySpanStartWrapped,
    applyForceWrapped,
    parseNextBatchWrapped,
    parseNextBatchesWrapped,
    parseNextRuleWrapped,
    insertFluidDataWrapped,
    cloneFluidDataWrapped
  );
}

export { wrap };

export {
  parseDocument,
  parseStyleSheets,
  parseStyleSheet,
  batchStyleSheet,
  batchRules,
  batchRule,
  cloneBatchState,
  determineBaselineWidth,
};
