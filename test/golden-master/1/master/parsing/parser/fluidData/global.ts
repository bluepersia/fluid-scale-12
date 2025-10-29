import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";
import { counter } from "./counter";

const fluidDataGlobal: FluidData = {};

let orderID = counter.next();

const allData = {
  "margin-top": {
    metaData: {
      orderID,
      property: "margin-top",
    },
    forceValue: "0px",
  },
  "margin-right": {
    metaData: {
      orderID,
      property: "margin-right",
    },
    forceValue: "0px",
  },
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    forceValue: "0px",
  },
  "margin-left": {
    metaData: {
      orderID,
      property: "margin-left",
    },
    forceValue: "0px",
  },
};

applyProperty(fluidDataGlobal, "*", "*", "margin-top", allData["margin-top"]);
applyProperty(
  fluidDataGlobal,
  "*",
  "*",
  "margin-right",
  allData["margin-right"]
);
applyProperty(
  fluidDataGlobal,
  "*",
  "*",
  "margin-bottom",
  allData["margin-bottom"]
);
applyProperty(fluidDataGlobal, "*", "*", "margin-left", allData["margin-left"]);

applyProperty(
  fluidDataGlobal,
  "::before",
  "::before",
  "margin-top",
  allData["margin-top"]
);
applyProperty(
  fluidDataGlobal,
  "::before",
  "::before",
  "margin-right",
  allData["margin-right"]
);
applyProperty(
  fluidDataGlobal,
  "::before",
  "::before",
  "margin-bottom",
  allData["margin-bottom"]
);
applyProperty(
  fluidDataGlobal,
  "::before",
  "::before",
  "margin-left",
  allData["margin-left"]
);

applyProperty(
  fluidDataGlobal,
  "::after",
  "::after",
  "margin-top",
  allData["margin-top"]
);
applyProperty(
  fluidDataGlobal,
  "::after",
  "::after",
  "margin-right",
  allData["margin-right"]
);
applyProperty(
  fluidDataGlobal,
  "::after",
  "::after",
  "margin-bottom",
  allData["margin-bottom"]
);
applyProperty(
  fluidDataGlobal,
  "::after",
  "::after",
  "margin-left",
  allData["margin-left"]
);

const verticalPadding: FluidRange[] = [];

const verticalRange: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 0,
        unit: "px",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 0,
        unit: "px",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

verticalPadding.push(verticalRange);
verticalPadding.push({ ...verticalRange, minBpIndex: 1, maxBpIndex: 2 });

orderID = counter.next();

const paddingTop: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  ranges: verticalPadding,
};

const paddingBottom: FluidPropertyData = {
  metaData: {
    orderID,
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
    orderID,
    property: "padding-right",
  },
  ranges: horizontalPadding,
};

const paddingLeft: FluidPropertyData = {
  metaData: {
    orderID,
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
