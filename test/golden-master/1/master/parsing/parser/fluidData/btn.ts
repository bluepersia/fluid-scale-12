import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";
import { counter } from "./counter";
let orderID = counter.next();

const fluidDataBtn: FluidData = {};

const btnFontSizeRanges: FluidRange[] = [];

const btnFontSizeRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 1, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [
    [{ value: 1.125, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

btnFontSizeRanges.push(btnFontSizeRange1);

const btnFontSizeProperty: FluidPropertyData = {
  metaData: { orderID, property: "font-size" },
  ranges: btnFontSizeRanges,
};

applyProperty(fluidDataBtn, ".btn", ".btn", "font-size", btnFontSizeProperty);

const btnPaddingHorizontalRanges: FluidRange[] = [];

const btnPaddingHorizontalRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 1.5, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 2, unit: "rem", type: "single" } as FluidValueSingle]],
};

btnPaddingHorizontalRanges.push(btnPaddingHorizontalRange1);

const btnPaddingLeftProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-left" },
  ranges: btnPaddingHorizontalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "padding-left",
  btnPaddingLeftProperty
);

const btnPaddingRightProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-right" },
  ranges: btnPaddingHorizontalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "padding-right",
  btnPaddingRightProperty
);

const btnPaddingVerticalRanges: FluidRange[] = [];

const btnPaddingVerticalRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [{ value: 0.625, unit: "rem", type: "single" } as FluidValueSingle],
  ],
  maxValue: [
    [{ value: 0.875, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

btnPaddingVerticalRanges.push(btnPaddingVerticalRange1);

const btnPaddingTopProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-top" },
  ranges: btnPaddingVerticalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "padding-top",
  btnPaddingTopProperty
);

const btnPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  ranges: btnPaddingVerticalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "padding-bottom",
  btnPaddingBottomProperty
);

orderID = counter.next();

const btnRadiantPaddingVerticalRanges: FluidRange[] = [];

const btnRadiantPaddingVerticalRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [
    [{ value: 0.9375, unit: "rem", type: "single" } as FluidValueSingle],
  ],
  maxValue: [
    [{ value: 0.9375, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

btnRadiantPaddingVerticalRanges.push(btnRadiantPaddingVerticalRange0);

const btnRadiantPaddingTopProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-top" },
  ranges: btnRadiantPaddingVerticalRanges,
};

const btnRadiantPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  ranges: btnRadiantPaddingVerticalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "padding-top",
  btnRadiantPaddingTopProperty
);

applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "padding-bottom",
  btnRadiantPaddingBottomProperty
);

const btnRadiantPaddingHorizontalRanges: FluidRange[] = [];

const btnRadiantPaddingHorizontalRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [
    [{ value: 2.375, unit: "rem", type: "single" } as FluidValueSingle],
  ],
  maxValue: [
    [{ value: 2.375, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

btnRadiantPaddingHorizontalRanges.push(btnRadiantPaddingHorizontalRange0);

const btnRadiantPaddingLeftProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-left" },
  ranges: btnRadiantPaddingHorizontalRanges,
};

const btnRadiantPaddingRightProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-right" },
  ranges: btnRadiantPaddingHorizontalRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "padding-left",
  btnRadiantPaddingLeftProperty
);

applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "padding-right",
  btnRadiantPaddingRightProperty
);

orderID = counter.next();

const btnTransparentFontSizeRanges: FluidRange[] = [];

const btnTransparentFontSizeRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [
    [{ value: 1.125, unit: "rem", type: "single" } as FluidValueSingle],
  ],
  maxValue: [
    [{ value: 1.125, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

btnTransparentFontSizeRanges.push(btnTransparentFontSizeRange0);

const btnTransparentFontSizeProperty: FluidPropertyData = {
  metaData: { orderID, property: "font-size" },
  ranges: btnTransparentFontSizeRanges,
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "font-size",
  btnTransparentFontSizeProperty
);

export { fluidDataBtn };
