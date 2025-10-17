import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";
import { counter } from "./counter";

let orderID = counter.next();

const fluidDataHeader: FluidData = {};

const paddingTopRanges: FluidRange[] = [];

const paddingTopRange: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 1,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 1.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

paddingTopRanges.push(paddingTopRange);

const paddingTopRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 1.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 1.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

paddingTopRanges.push(paddingTopRange1);

const paddingTopProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  ranges: paddingTopRanges,
};

applyProperty(
  fluidDataHeader,
  ".header",
  ".header",
  "padding-top",
  paddingTopProperty
);

export { fluidDataHeader };
