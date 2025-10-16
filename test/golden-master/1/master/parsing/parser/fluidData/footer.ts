import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";
import { counter } from "./counter";
let orderID = counter.next();

const fluidDataFooter: FluidData = {};

const footerPaddingVerticalRanges: FluidRange[] = [];

const footerPaddingVerticalRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [[{ value: 1, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [
    [{ value: 2.25, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

footerPaddingVerticalRanges.push(footerPaddingVerticalRange0);

const footerPaddingTopProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-top" },
  ranges: footerPaddingVerticalRanges,
};

applyProperty(
  fluidDataFooter,
  ".footer",
  ".footer",
  "padding-top",
  footerPaddingTopProperty
);

const footerPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  ranges: footerPaddingVerticalRanges,
};

applyProperty(
  fluidDataFooter,
  ".footer",
  ".footer",
  "padding-bottom",
  footerPaddingBottomProperty
);

export { fluidDataFooter };
