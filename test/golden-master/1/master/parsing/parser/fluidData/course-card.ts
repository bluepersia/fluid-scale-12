import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";
import { counter } from "./counter";
let orderID = counter.next();

const fluidDataCourseCard: FluidData = {};

const courseCardPaddingBottomRanges: FluidRange[] = [];

const courseCardPaddingBottomRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [[{ value: 2, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 2.5, unit: "rem", type: "single" } as FluidValueSingle]],
};

courseCardPaddingBottomRanges.push(courseCardPaddingBottomRange0);

const courseCardPaddingBottomProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-bottom" },
  ranges: courseCardPaddingBottomRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "padding-bottom",
  courseCardPaddingBottomProperty
);

const courseCardPaddingHorizontalRanges: FluidRange[] = [];

const courseCardPaddingHorizontalRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [{ value: 1.75, unit: "rem", type: "single" } as FluidValueSingle],
  ],
  maxValue: [[{ value: 2, unit: "rem", type: "single" } as FluidValueSingle]],
};

courseCardPaddingHorizontalRanges.push(courseCardPaddingHorizontalRange0);

const courseCardPaddingRightProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-right" },
  ranges: courseCardPaddingHorizontalRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "padding-right",
  courseCardPaddingRightProperty
);

const courseCardPaddingLeftProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-left" },
  ranges: courseCardPaddingHorizontalRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "padding-left",
  courseCardPaddingLeftProperty
);

orderID = counter.next();

const courseCardPaddingTopRanges: FluidRange[] = [];
const courseCardPaddingTopRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 3.5, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 4, unit: "rem", type: "single" } as FluidValueSingle]],
};

courseCardPaddingTopRanges.push(courseCardPaddingTopRange1);

const courseCardPaddingTopProperty: FluidPropertyData = {
  metaData: { orderID, property: "padding-top" },
  ranges: courseCardPaddingTopRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "padding-top",
  courseCardPaddingTopProperty
);

const courseCardHeightRanges: FluidRange[] = [];
const courseCardHeightRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 16, unit: "rem", type: "single" } as FluidValueSingle]],
  maxValue: [
    [{ value: 20.125, unit: "rem", type: "single" } as FluidValueSingle],
  ],
};

courseCardHeightRanges.push(courseCardHeightRange1);

const courseCardHeightProperty: FluidPropertyData = {
  metaData: { orderID, property: "height" },
  ranges: courseCardHeightRanges,
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "height",
  courseCardHeightProperty
);

orderID = counter.next();

const courseCardTitleFontSizeRanges: FluidRange[] = [];

const courseCardTitleFontSizeRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 1.25, unit: "em", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 1.5, unit: "em", type: "single" } as FluidValueSingle]],
};

courseCardTitleFontSizeRanges.push(courseCardTitleFontSizeRange1);

const courseCardTitleFontSizeProperty: FluidPropertyData = {
  metaData: { orderID, property: "font-size" },
  ranges: courseCardTitleFontSizeRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card__title",
  ".course-card__title",
  "font-size",
  courseCardTitleFontSizeProperty
);

orderID = counter.next();

const courseCardIntroTitleFontSizeRanges: FluidRange[] = [];

const courseCardIntroTitleFontSizeRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [[{ value: 1.5, unit: "em", type: "single" } as FluidValueSingle]],
  maxValue: [[{ value: 2, unit: "em", type: "single" } as FluidValueSingle]],
};

courseCardIntroTitleFontSizeRanges.push(courseCardIntroTitleFontSizeRange1);

const courseCardIntroTitleFontSizeProperty: FluidPropertyData = {
  metaData: { orderID, property: "font-size" },
  ranges: courseCardIntroTitleFontSizeRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card__title",
  ".course-card--intro .course-card__title",
  "font-size",
  courseCardIntroTitleFontSizeProperty
);

export { fluidDataCourseCard };
