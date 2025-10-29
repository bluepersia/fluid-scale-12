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

const courseCardBorderRadiusTopLeft = {
  metaData: {
    orderID,
    property: "border-top-left-radius",
  },
  forceValue: "0.625rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "border-top-left-radius",
  courseCardBorderRadiusTopLeft
);

const courseCardBorderRadiusTopRight = {
  metaData: {
    orderID,
    property: "border-top-right-radius",
  },
  forceValue: "0.625rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "border-top-right-radius",
  courseCardBorderRadiusTopRight
);

const courseCardBorderRadiusBottomLeft = {
  metaData: {
    orderID,
    property: "border-bottom-left-radius",
  },
  forceValue: "0.625rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "border-bottom-left-radius",
  courseCardBorderRadiusBottomLeft
);

const courseCardBorderRadiusBottomRight = {
  metaData: {
    orderID,
    property: "border-bottom-right-radius",
  },
  forceValue: "0.625rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "border-bottom-right-radius",
  courseCardBorderRadiusBottomRight
);

orderID = counter.next();

const courseCardFontSize = {
  metaData: {
    orderID,
    property: "font-size",
  },
  forceValue: "1rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "font-size",
  courseCardFontSize
);

const courseCardHeight = {
  metaData: {
    orderID,
    property: "height",
  },
  forceValue: "100%",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card",
  ".course-card",
  "height",
  courseCardHeight
);

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

const courseCardTitleMarginBottom = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  forceValue: "1rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__title",
  ".course-card__title",
  "margin-bottom",
  courseCardTitleMarginBottom
);

orderID = counter.next();

const courseCardDescriptionLineHeight = {
  metaData: {
    orderID,
    property: "line-height",
  },
  forceValue: "1.625",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__description",
  ".course-card__description",
  "line-height",
  courseCardDescriptionLineHeight
);

const courseCardDescriptionMarginBottom = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  forceValue: "1.5rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__description",
  ".course-card__description",
  "margin-bottom",
  courseCardDescriptionMarginBottom
);

const courseCardDescriptionFontSizeRanges: FluidRange[] = [];

const courseCardDescriptionFontSizeRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [[{ value: 1, unit: "em", type: "single" } as FluidValueSingle]],
  maxValue: [
    [{ value: 1.125, unit: "em", type: "single" } as FluidValueSingle],
  ],
};

courseCardDescriptionFontSizeRanges.push(courseCardDescriptionFontSizeRange0);

const courseCardDescriptionFontSizeProperty: FluidPropertyData = {
  metaData: { orderID, property: "font-size" },
  ranges: courseCardDescriptionFontSizeRanges,
};

applyProperty(
  fluidDataCourseCard,
  ".course-card__description",
  ".course-card__description",
  "font-size",
  courseCardDescriptionFontSizeProperty
);

orderID = counter.next();

const courseCardIntroPaddingTop = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  forceValue: "1.5rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card--intro",
  ".course-card--intro",
  "padding-top",
  courseCardIntroPaddingTop
);

const courseCardIntroMarginBottom = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  forceValue: "0px",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card--intro",
  ".course-card--intro",
  "margin-bottom",
  courseCardIntroMarginBottom
);

orderID = counter.next();

const courseCardImageTop = {
  metaData: {
    orderID,
    property: "top",
  },
  forceValue: "-1.75rem",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__image",
  ".course-card__image",
  "top",
  courseCardImageTop
);

orderID = counter.next();

const courseCardBtnMarginTop = {
  metaData: {
    orderID,
    property: "margin-top",
  },
  forceValue: "auto",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__btn",
  ".course-card__btn",
  "margin-top",
  courseCardBtnMarginTop
);

const courseCardBtnMarginBottom = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  forceValue: "0px",
};
applyProperty(
  fluidDataCourseCard,
  ".course-card__btn",
  ".course-card__btn",
  "margin-bottom",
  courseCardBtnMarginBottom
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
