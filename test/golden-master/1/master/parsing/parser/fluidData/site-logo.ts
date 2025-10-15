import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";

const fluidDataSiteLogo: FluidData = {};

const widthRanges: FluidRange[] = [];

const widthRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 5.5625,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 7.125,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

widthRanges.push(widthRange1);

const widthProperty: FluidPropertyData = {
  metaData: {
    orderID: 6,
    property: "width",
  },
  ranges: widthRanges,
};

fluidDataSiteLogo[".site-logo"][".site-logo"]["width"] = widthProperty;

export { fluidDataSiteLogo };
