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
};
