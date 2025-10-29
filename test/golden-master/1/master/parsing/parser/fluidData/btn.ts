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

const btnBorderRadiusTopLeft = {
  metaData: {
    orderID,
    property: "border-top-left-radius",
  },
  forceValue: "1.75rem",
};
applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "border-top-left-radius",
  btnBorderRadiusTopLeft
);

const btnBorderRadiusTopRight = {
  metaData: {
    orderID,
    property: "border-top-right-radius",
  },
  forceValue: "1.75rem",
};
applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "border-top-right-radius",
  btnBorderRadiusTopRight
);

const btnBorderRadiusBottomLeft = {
  metaData: {
    orderID,
    property: "border-bottom-left-radius",
  },
  forceValue: "1.75rem",
};
applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "border-bottom-left-radius",
  btnBorderRadiusBottomLeft
);

const btnBorderRadiusBottomRight = {
  metaData: {
    orderID,
    property: "border-bottom-right-radius",
  },
  forceValue: "1.75rem",
};
applyProperty(
  fluidDataBtn,
  ".btn",
  ".btn",
  "border-bottom-right-radius",
  btnBorderRadiusBottomRight
);

orderID = counter.next();

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

const btnRadiantBorderRadiusTopLeft = {
  metaData: {
    orderID,
    property: "border-top-left-radius",
  },
  forceValue: "1.96rem",
};
applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "border-top-left-radius",
  btnRadiantBorderRadiusTopLeft
);

const btnRadiantBorderRadiusTopRight = {
  metaData: {
    orderID,
    property: "border-top-right-radius",
  },
  forceValue: "1.96rem",
};
applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "border-top-right-radius",
  btnRadiantBorderRadiusTopRight
);

const btnRadiantBorderRadiusBottomLeft = {
  metaData: {
    orderID,
    property: "border-bottom-left-radius",
  },
  forceValue: "1.96rem",
};
applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "border-bottom-left-radius",
  btnRadiantBorderRadiusBottomLeft
);

const btnRadiantBorderRadiusBottomRight = {
  metaData: {
    orderID,
    property: "border-bottom-right-radius",
  },
  forceValue: "1.96rem",
};
applyProperty(
  fluidDataBtn,
  ".btn--radiant",
  ".btn--radiant",
  "border-bottom-right-radius",
  btnRadiantBorderRadiusBottomRight
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
  forceValue: "0.9375rem",
};

const btnRadiantPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  forceValue: "0.9375rem",
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
  forceValue: "2.375rem",
};

const btnRadiantPaddingRightProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-right" },
  forceValue: "2.375rem",
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
  forceValue: "1.125rem",
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "font-size",
  btnTransparentFontSizeProperty
);

const btnTransparentPaddingRanges: FluidRange[] = [];

const btnTransparentPaddingRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [[{ value: 0, unit: "px", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 0, unit: "px", type: "single" } as FluidValueSingle]],
};

btnTransparentPaddingRanges.push(btnTransparentPaddingRange0);

const btnTransparentPaddingProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-top" },
  forceValue: "0px",
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "padding-top",
  btnTransparentPaddingProperty
);

const btnTransparentPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  forceValue: "0px",
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "padding-bottom",
  btnTransparentPaddingBottomProperty
);

const btnTransparentPaddingLeftProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-left" },
  forceValue: "0px",
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "padding-left",
  btnTransparentPaddingLeftProperty
);

const btnTransparentPaddingRightProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-right" },
  forceValue: "0px",
};

applyProperty(
  fluidDataBtn,
  ".btn--transparent",
  ".btn--transparent",
  "padding-right",
  btnTransparentPaddingRightProperty
);
export { fluidDataBtn };
