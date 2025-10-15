import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
  FluidValueString,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";

const fluidDataHomePage: FluidData = {};

let orderID = 28;

const homePageCoursesPaddingBottomRanges: FluidRange[] = [];
const homePageCoursesPaddingBottomRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 5.375,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

const homePageCoursesPaddingBottomRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 5.375,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 8.75,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

homePageCoursesPaddingBottomRanges.push(homePageCoursesPaddingBottomRange0);
homePageCoursesPaddingBottomRanges.push(homePageCoursesPaddingBottomRange1);

const homePageCoursesPaddingBottomProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-bottom",
  },
  ranges: homePageCoursesPaddingBottomRanges,
};

applyProperty(
  fluidDataHomePage,
  ".home-page__courses",
  ".home-page__courses",
  "padding-bottom",
  homePageCoursesPaddingBottomProperty
);

orderID = 29;

const homepageCourseListRowGapRanges: FluidRange[] = [];

const homepageCourseListRowGapRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 2.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 3.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

const homepageCourseListRowGapRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 3.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

homepageCourseListRowGapRanges.push(homepageCourseListRowGapRange0);
homepageCourseListRowGapRanges.push(homepageCourseListRowGapRange1);

const homepageCourseListRowGapProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "row-gap",
  },
  ranges: homepageCourseListRowGapRanges,
};

applyProperty(
  fluidDataHomePage,
  ".home-page__course-list",
  ".home-page__course-list",
  "row-gap",
  homepageCourseListRowGapProperty
);

const homepageCourseListGridTemplateColumnsRanges: FluidRange[] = [];
const homepageCourseListGridTemplateColumnsRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: "repeat(auto-fit, minmax(21.43rem, 1fr))",
        unit: "",
        type: "single",
      } as FluidValueString,
    ],
  ],
  maxValue: [
    [
      {
        value: "repeat(auto-fit, minmax(21.875rem, 1fr))",
        unit: "",
        type: "single",
      } as FluidValueString,
    ],
  ],
};
homepageCourseListGridTemplateColumnsRanges.push(
  homepageCourseListGridTemplateColumnsRange0
);

const homepageCourseListGridTemplateColumnsProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "grid-template-columns",
  },
  ranges: homepageCourseListGridTemplateColumnsRanges,
};

applyProperty(
  fluidDataHomePage,
  ".home-page__course-list",
  ".home-page__course-list",
  "grid-template-columns",
  homepageCourseListGridTemplateColumnsProperty
);

orderID = 31;

const homepageCourseListColumnGapRanges: FluidRange[] = [];
const homepageCourseListColumnGapRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 0.624,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 1.875,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

homepageCourseListColumnGapRanges.push(homepageCourseListColumnGapRange1);

const homepageCourseListColumnGapProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "column-gap",
  },
  ranges: homepageCourseListColumnGapRanges,
};

applyProperty(
  fluidDataHomePage,
  ".home-page__course-list",
  ".home-page__course-list",
  "column-gap",
  homepageCourseListColumnGapProperty
);

export { fluidDataHomePage };
