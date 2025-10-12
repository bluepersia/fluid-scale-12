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
  minValue: FluidValue[][];
  maxValue: FluidValue[][];
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

type DocResultState = {
  fluidData: FluidData;
  orderID: number;
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
};
type ParseBatchesContext = ParseStyleSheetContext;

type ParseBatchContext = ParseBatchesContext & {
  batchIndex: number;
  batches: RuleBatch[];
};

type ParseStyleRuleContext = ParseBatchContext & {
  fluidData: FluidData;
  orderID: number;
};
type ParseSelectorContext = ParseStyleRuleContext;

type ParsePropertyContext = ParseSelectorContext & {
  selector: string;
};
type ParseNextBatchContext = ParsePropertyContext & {
  property: string;
  minValue: string;
  nextBatchIndex: number;
};
type ParseNextRuleContext = ParseNextBatchContext;

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
};
