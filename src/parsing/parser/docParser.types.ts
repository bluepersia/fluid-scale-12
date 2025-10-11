import { RuleClone } from "../serialization/docSerializer.types";

type ParseDocResults = {
  breakpoints: number[];
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

type ParseGodContext = {
  docResultState: DocResultState;
  property: string;
  selector: string;
  minValue: string;
  batchIndex: number;
  nextBatchIndex: number;
  batches: RuleBatch[];
  orderID: number;
  fluidData: FluidData;
  anchor: string;
  maxValue: string;
};

type ParseBatchContext = Pick<
  ParseGodContext,
  "docResultState" | "batchIndex" | "batches"
>;

type ParseStyleRuleContext = Pick<
  ParseGodContext,
  "fluidData" | "batchIndex" | "batches" | "orderID"
>;
type ParseSelectorContext = Pick<
  ParseGodContext,
  "fluidData" | "batchIndex" | "batches" | "orderID"
>;

type ParsePropertyContext = Pick<
  ParseGodContext,
  "fluidData" | "batchIndex" | "batches" | "selector" | "orderID"
>;

type ParseNextBatchContext = Pick<
  ParseGodContext,
  | "fluidData"
  | "selector"
  | "property"
  | "minValue"
  | "batchIndex"
  | "nextBatchIndex"
  | "orderID"
>;

type ParseNextRuleContext = Pick<
  ParseGodContext,
  | "property"
  | "selector"
  | "fluidData"
  | "minValue"
  | "batchIndex"
  | "nextBatchIndex"
  | "orderID"
>;

type InsertFluidDataContext = Pick<
  ParseGodContext,
  | "property"
  | "anchor"
  | "selector"
  | "minValue"
  | "maxValue"
  | "orderID"
  | "batchIndex"
  | "nextBatchIndex"
>;

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
};
