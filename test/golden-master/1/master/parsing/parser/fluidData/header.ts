import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";

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

const paddingTopProperty: FluidPropertyData = {
  metaData: {
    orderID: 9,
    property: "padding-top",
  },
  ranges: paddingTopRanges,
};

fluidDataHeader[".header"][".header"]["padding-top"] = paddingTopProperty;

export { fluidDataHeader };
