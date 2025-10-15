import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";

let orderID = 49;

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

export { fluidDataBtn };
