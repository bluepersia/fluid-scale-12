import { RuleClone } from "../serialization/docSerializer.types";

type ParseDocResults = {
  breakpoints: number[];
  fluidData: FluidData;
};

type FluidData = {
  [anchor: string]: {
    [selector: string]: {
      [property: string]: FluidPropertyData;
    };
  };
};

type FluidPropertyData = {
  metaData: FluidPropertyMetaData;
  ranges: FluidRange[];
};

type FluidPropertyMetaData = {
  orderID: number;
  property: string;
};

type FluidRange = {
  minValue: FluidValue[][] | string;
  maxValue: FluidValue[][] | string;
  minBpIndex: number;
  maxBpIndex: number;
};

type FluidValue = {
  type: "single" | "func";
};
type FluidValueSingle = FluidValue & {
  type: "single";
  value: number;
  unit: string;
};

type FluidValueString = FluidValue & {
  type: "string";
  value: string;
};

type DocResultState = {
  fluidData: FluidData;
  orderID: number;
  spans: DocSpans;
  isNew: boolean;
};

type DocSpans = {
  [selector: string]: {
    [property: string]: string;
  };
};

type BatchState = {
  currentBatch: RuleBatch | null;
  batches: RuleBatch[];
};

type RuleBatch = {
  rules: RuleClone[];
  width: number;
  isMediaQuery: boolean;
};

type ParseStyleSheetContext = {
  sheetIndex: number;
  docResultState: DocResultState;
  globalBaselineWidth: number;
  breakpoints: number[];
};
type ParseBatchesContext = ParseStyleSheetContext;

type ParseBatchContext = ParseBatchesContext & {
  batchIndex: number;
  batches: RuleBatch[];
};

type ParseStyleRuleContext = ParseBatchContext & {
  batchWidth: number;
};
type ParseSelectorContext = ParseStyleRuleContext;

type ParsePropertyContext = ParseSelectorContext & {
  selector: string;
};

type ApplyForceContext = ParsePropertyContext & {
  minValue: string;
};
type ParseNextBatchContext = ParsePropertyContext & {
  property: string;
  minValue: string;
};
type ParseNextRuleContext = ParseNextBatchContext & {
  nextBatchWidth: number;
};

type InsertFluidDataContext = ParseNextRuleContext & {
  anchor: string;
  maxValue: string;
};

export {
  ParseDocResults,
  FluidData,
  FluidPropertyData,
  FluidPropertyMetaData,
  FluidRange,
  FluidValue,
  FluidValueSingle,
  DocResultState,
  BatchState,
  RuleBatch,
  ParseBatchContext,
  InsertFluidDataContext,
  ParseNextRuleContext,
  ParseNextBatchContext,
  ParsePropertyContext,
  ParseSelectorContext,
  ParseStyleRuleContext,
  ParseStyleSheetContext,
  ParseBatchesContext,
  FluidValueString,
  ApplyForceContext,
  DocSpans,
};
