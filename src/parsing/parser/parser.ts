import {
  DocumentClone,
  MediaRuleClone,
  RuleClone,
  StyleSheetClone,
} from "../serialization/serializer.types";
import {
  MEDIA_RULE_TYPE,
  STYLE_RULE_TYPE,
} from "../serialization/serializerConsts";
import {
  BatchState,
  DocResultState,
  FluidData,
  ParseDocResults,
  RuleBatch,
} from "./parser.types";

let parseDocument = (docClone: DocumentClone): ParseDocResults => {
  const { breakpoints, globalBaselineWidth } = parseMediaRules(
    docClone.styleSheets
  );

  parseStyleSheets(docClone.styleSheets, breakpoints, globalBaselineWidth);

  return { breakpoints };
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
  };

  for (const styleSheet of styleSheets) {
    docResultState = parseStyleSheet(
      styleSheet,
      docResultState,
      globalBaselineWidth
    );
  }

  return docResultState.fluidData;
};

let parseStyleSheet = (
  styleSheet: StyleSheetClone,
  docResultState: DocResultState,
  globalBaselineWidth: number
): DocResultState => {
  let batches = batchStyleSheet(styleSheet, globalBaselineWidth);

  batches = batches;
  return docResultState;
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
    docResultState: DocResultState,
    globalBaselineWidth: number
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
  ) => number
) {
  parseDocument = parseDocumentWrapped;
  parseStyleSheets = parseStyleSheetsWrapped;
  parseStyleSheet = parseStyleSheetWrapped;
  batchStyleSheet = batchStyleSheetWrapped;
  batchRules = batchRulesWrapped;
  batchRule = batchRuleWrapped;
  cloneBatchState = cloneBatchStateWrapped;
  determineBaselineWidth = determineBaselineWidthWrapped;
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
