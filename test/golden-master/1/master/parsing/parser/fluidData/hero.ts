import {
  FluidData,
  FluidPropertyData,
  FluidRange,
  FluidValueSingle,
} from "../../../../../../../src/parsing/parser/docParser.types";
import { applyProperty } from "./controller";

const fluidDataHero: FluidData = {};

let orderID = 11;

const heroPaddingTopRanges: FluidRange[] = [];

const heroPaddingTopRange0: FluidRange = {
  minBpIndex: 0,
  maxBpIndex: 1,
  minValue: [
    [
      {
        value: 2.375,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 6.1875,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
const heroPaddingTopRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 6.1875,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 10.75,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

heroPaddingTopRanges.push(heroPaddingTopRange0);
heroPaddingTopRanges.push(heroPaddingTopRange1);

const heroPaddingTopProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  ranges: heroPaddingTopRanges,
};

applyProperty(
  fluidDataHero,
  ".hero",
  ".hero",
  "padding-top",
  heroPaddingTopProperty
);

orderID = 17;

const heroPaddingBottomRanges: FluidRange[] = [];

const heroPaddingBottomRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 11.625,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 14.125,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};

heroPaddingBottomRanges.push(heroPaddingBottomRange1);
const heroPaddingBottomProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-bottom",
  },
  ranges: heroPaddingBottomRanges,
};
applyProperty(
  fluidDataHero,
  ".hero",
  ".hero",
  "padding-bottom",
  heroPaddingBottomProperty
);

orderID = 18;

const heroTitleFontSizeRanges: FluidRange[] = [];

const heroTitleFontSizeRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 2.5,
        unit: "em",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 3.5,
        unit: "em",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroTitleFontSizeRanges.push(heroTitleFontSizeRange1);
const heroTitleFontSizeProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "font-size",
  },
  ranges: heroTitleFontSizeRanges,
};

applyProperty(
  fluidDataHero,
  ".hero__title",
  ".hero__title",
  "font-size",
  heroTitleFontSizeProperty
);

const heroTitleMarginBottomRanges: FluidRange[] = [];
const heroTitleMarginBottomRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 1.625,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 1.8125,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroTitleMarginBottomRanges.push(heroTitleMarginBottomRange1);
const heroTitleMarginBottomProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  ranges: heroTitleMarginBottomRanges,
};

applyProperty(
  fluidDataHero,
  ".hero__title",
  ".hero__title",
  "margin-bottom",
  heroTitleMarginBottomProperty
);

orderID = 19;

const heroDescriptionMarginBottomRanges: FluidRange[] = [];

const heroDescriptionMarginBottomRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 1.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 2.5,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroDescriptionMarginBottomRanges.push(heroDescriptionMarginBottomRange1);
const heroDescriptionMarginBottomProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  ranges: heroDescriptionMarginBottomRanges,
};

orderID = 21;

const heroImageTabletRightRanges: FluidRange[] = [];

const heroImageTabletRightRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: -18,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: -20,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroImageTabletRightRanges.push(heroImageTabletRightRange1);
const heroImageTabletRightProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "right",
  },
  ranges: heroImageTabletRightRanges,
};
applyProperty(
  fluidDataHero,
  ".hero__image--tablet",
  ".hero__image--tablet",
  "right",
  heroImageTabletRightProperty
);

const heroImageTabletTopRanges: FluidRange[] = [];

const heroImageTabletTopRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: -9,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: -14,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroImageTabletTopRanges.push(heroImageTabletTopRange1);
const heroImageTabletTopProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "top",
  },
  ranges: heroImageTabletTopRanges,
};

applyProperty(
  fluidDataHero,
  ".hero__image--tablet",
  ".hero__image--tablet",
  "top",
  heroImageTabletTopProperty
);

const heroImageTabletWidthRanges: FluidRange[] = [];
const heroImageTabletWidthRange1: FluidRange = {
  minBpIndex: 1,
  maxBpIndex: 2,
  minValue: [
    [
      {
        value: 43.43,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
  maxValue: [
    [
      {
        value: 65,
        unit: "rem",
        type: "single",
      } as FluidValueSingle,
    ],
  ],
};
heroImageTabletWidthRanges.push(heroImageTabletWidthRange1);
const heroImageTabletWidthProperty: FluidPropertyData = {
  metaData: {
    orderID,
    property: "width",
  },
  ranges: heroImageTabletWidthRanges,
};

applyProperty(
  fluidDataHero,
  ".hero__image--tablet",
  ".hero__image--tablet",
  "width",
  heroImageTabletWidthProperty
);

export { fluidDataHero };
