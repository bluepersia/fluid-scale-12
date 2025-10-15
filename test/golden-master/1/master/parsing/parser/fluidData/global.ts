import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";

const fluidDataGlobal: FluidData = {};

const verticalPadding: FluidRange[] = [];

const verticalRange: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 0,
        unit: "",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 0,
        unit: "",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

verticalPadding.push(verticalRange);
verticalPadding.push({ ...verticalRange, minBpIndex: 1, maxBpIndex: 2 });

const paddingTop: FluidPropertyData = {
  metaData: {
    orderID: 3,
    property: "padding-top",
  },
  ranges: verticalPadding,
};

const paddingBottom: FluidPropertyData = {
  metaData: {
    orderID: 3,
    property: "padding-bottom",
  },
  ranges: verticalPadding,
};

applyProperty(
  fluidDataGlobal,
  ".u-container",
  ".u-container",
  "padding-top",
  paddingTop
);
applyProperty(
  fluidDataGlobal,
  ".u-container",
  ".u-container",
  "padding-bottom",
  paddingBottom
);

const horizontalPadding: FluidRange[] = [];

const horizontalPaddingRange0: FluidRange = {
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
        value: 2.4375,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

const horizontalPaddingRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 2.4375,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 10.3125,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

horizontalPadding.push(horizontalPaddingRange0);
horizontalPadding.push(horizontalPaddingRange1);

const paddingRight: FluidPropertyData = {
  metaData: {
    orderID: 3,
    property: "padding-right",
  },
  ranges: horizontalPadding,
};

const paddingLeft: FluidPropertyData = {
  metaData: {
    orderID: 3,
    property: "padding-left",
  },
  ranges: horizontalPadding,
};

applyProperty(
  fluidDataGlobal,
  ".u-container",
  ".u-container",
  "padding-right",
  paddingRight
);
applyProperty(
  fluidDataGlobal,
  ".u-container",
  ".u-container",
  "padding-left",
  paddingLeft
);

export { fluidDataGlobal };
