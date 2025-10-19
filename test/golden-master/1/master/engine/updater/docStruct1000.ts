import { UpdateDocStruc } from "../../../../../engine/updater/index.types";
import { Counter } from "../../../../../parsing/parser/orderCounter";

const counter = new Counter();

let orderID = counter.next();

const uContainerPaddingVertical = {
  conversions: {
    "0px": 0,
  },
  computedValues: {
    actual: [[0]],
    actualOrderID: orderID,
  },
};

const uContainerPaddingHorizontal = {
  conversions: {
    "2.4375rem": 39,
    "10.3125rem": 165,
  },
  computedValues: {
    actual: [[106.66]],
    actualOrderID: orderID,
  },
};

const uContainerPadding = {
  "padding-top": uContainerPaddingVertical,
  "padding-bottom": uContainerPaddingVertical,
  "padding-left": uContainerPaddingHorizontal,
  "padding-right": uContainerPaddingHorizontal,
};

orderID = counter.next();

const siteLogo = {
  width: {
    conversions: {
      "5.5625rem": 89,
      "7.125rem": 114,
    },
    computedValues: {
      actual: [[102.42]],
      actualOrderID: orderID,
    },
  },
};

orderID = counter.next();

const headerPaddingTop = {
  conversions: {
    "1.5rem": 24,
  },
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroPaddingTop = {
  conversions: {
    "6.1875rem": 99,
    "10.75rem": 172,
  },
  computedValues: {
    actual: [[138.2]],
    actualOrderID: orderID,
  },
};

const heroPaddingBottom = {
  conversions: {
    "11.625rem": 186,
    "14.125rem": 226,
  },
  computedValues: {
    actual: [[207.48]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroTitleFontSize = {
  conversions: {
    "2.5em": 40,
    "3.5em": 56,
  },
  computedValues: {
    actual: [[48.59]],
    actualOrderID: orderID,
  },
};

const heroTitleMarginBottom = {
  conversions: {
    "1.625rem": 26,
    "1.8125rem": 29,
  },
  computedValues: {
    actual: [[27.61]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroDescriptionMarginBottom = {
  conversions: {
    "1.5rem": 24,
    "2.5rem": 40,
  },
  computedValues: {
    actual: [[32.59]],
    actualOrderID: orderID,
  },
};
orderID = counter.next();

const heroImageTabletTop = {
  conversions: {
    "-9rem": -144,
    "-14rem": -224,
  },
  computedValues: {
    actualOrderID: orderID,
    actual: [[-186.96]],
  },
};

const heroImageTabletRight = {
  conversions: {
    "-18rem": -288,
    "-20rem": -320,
  },
  computedValues: {
    actualOrderID: orderID,
    actual: [[-305.18]],
  },
};

const heroImageTabletWidth = {
  conversions: {
    "43.43rem": 694.88,
    "65rem": 1040,
  },
  computedValues: {
    actualOrderID: orderID,
    actual: [[880.22]],
  },
};

const coursesPaddingBottom = {
  conversions: {
    "5.375rem": 86,
    "8.75rem": 140,
  },
  computedValues: {
    actual: [[115]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseListRowGap = {
  conversions: {
    "3.5rem": 56,
    "5rem": 80,
  },
  computedValues: {
    actual: [[68.88]],
    actualOrderID: orderID,
  },
};

const courseListColumnGap = {
  conversions: {
    "0.624rem": 9.984,
    "1.875rem": 30,
  },
  computedValues: {
    actual: [[20.73]],
    actualOrderID: orderID,
  },
};

const courseListGridTemplateColumns = {
  conversions: {},
  computedValues: {
    actual: [[382.984, 382.984]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardPaddingHorizontal = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const courseCardPaddingBottom = {
  conversions: {
    "2rem": 32,
    "2.5rem": 40,
  },
  computedValues: {
    actual: [[38.06]],
    actualOrderID: orderID,
  },
};

const courseCardPaddingTop = {
  conversions: {
    "3.5rem": 56,
    "4rem": 64,
  },
  computedValues: {
    actual: [[60.29]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardTitleFontSize = {
  conversions: {
    "1.25em": 20,
    "1.5em": 24,
  },
  computedValues: {
    actual: [[22.14]],
    actualOrderID: orderID,
  },
};

const courseCardIntroTitle = {
  conversions: {
    "1.5em": 24,
    "2em": 32,
  },
  computedValues: {
    actual: [[28.29]],
    actualOrderID: orderID,
  },
};

const courseCardDescriptionFontSize550 = {
  conversions: {
    "1em": 16,
    "1.125em": 18,
  },
  computedValues: {
    actual: [[17.51]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const footerVerticalPadding = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const btnFontSize550 = {
  conversions: {
    "1rem": 16,
    "1.125rem": 18,
  },
  computedValues: {
    actual: [[17.07]],
    actualOrderID: orderID,
  },
};

const generalBtnPaddingVertical = {
  conversions: {
    "0.625rem": 10,
    "0.875rem": 14,
  },
  computedValues: {
    actual: [[12.14]],
    actualOrderID: orderID,
  },
};

const generalBtnPaddingHorizontal = {
  conversions: {
    "1.5rem": 24,
    "2rem": 32,
  },
  computedValues: {
    actual: [[28.29]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();
const btnRadiantVerticalPadding550 = {
  conversions: {
    "0.9375rem": 15,
  },
  computedValues: {
    actual: [[15]],
    actualOrderID: orderID,
  },
};

const btnRadiantHorizontalPadding550 = {
  conversions: {
    "2.375rem": 38,
  },
  computedValues: {
    actual: [[38]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const btnTransparentFontSize = {
  conversions: {
    "1.125rem": 18,
  },
  computedValues: {
    actual: [[18]],
    actualOrderID: orderID,
  },
};

const btnTransparentPaddingVertical = {
  conversions: {
    "0px": 0,
  },
  computedValues: {
    actual: [[0]],
    actualOrderID: orderID,
  },
};
const btnTransparentPaddingHorizontal = {
  conversions: {
    "0px": 0,
  },
  computedValues: {
    actual: [[0]],
    actualOrderID: orderID,
  },
};
const btnTransparentPadding = {
  "padding-top": btnTransparentPaddingVertical,
  "padding-right": btnTransparentPaddingHorizontal,
  "padding-bottom": btnTransparentPaddingVertical,
  "padding-left": btnTransparentPaddingHorizontal,
};
const courseCard = {
  "padding-left": courseCardPaddingHorizontal,
  "padding-right": courseCardPaddingHorizontal,
  "padding-bottom": courseCardPaddingBottom,
  "padding-top": courseCardPaddingTop,
};

const generalBtnPadding = {
  "padding-top": generalBtnPaddingVertical,
  "padding-right": generalBtnPaddingHorizontal,
  "padding-bottom": generalBtnPaddingVertical,
  "padding-left": generalBtnPaddingHorizontal,
};

const docStruct1000: UpdateDocStruc = {
  "header-logo": siteLogo,
  "header-btn": {
    "font-size": btnFontSize550,
    ...generalBtnPadding,
  },
  "footer-btn": {
    "font-size": btnFontSize550,
    ...generalBtnPadding,
  },
  header: {
    ...uContainerPadding,
    "padding-top": headerPaddingTop,
  },
  hero: {
    ...uContainerPadding,
    "padding-top": heroPaddingTop,
    "padding-bottom": heroPaddingBottom,
  },
  "hero-title": {
    "font-size": heroTitleFontSize,
    "margin-bottom": heroTitleMarginBottom,
  },
  "hero-description": {
    "margin-bottom": heroDescriptionMarginBottom,
  },
  "hero-image-tablet": {
    right: heroImageTabletRight,
    top: heroImageTabletTop,
    width: heroImageTabletWidth,
  },
  courses: {
    ...uContainerPadding,
    "padding-bottom": coursesPaddingBottom,
  },
  "course-list": {
    "row-gap": courseListRowGap,
    "column-gap": courseListColumnGap,
    "grid-template-columns": courseListGridTemplateColumns,
  },
  "course-card-intro": courseCard,
  "course-card-2": courseCard,
  "course-card-3": courseCard,
  "course-card-4": courseCard,
  "course-card-5": courseCard,
  "course-card-6": courseCard,
  "course-card-title-1": {
    "font-size": courseCardIntroTitle,
  },
  "course-card-title-2": {
    "font-size": courseCardTitleFontSize,
  },
  "course-card-title-3": {
    "font-size": courseCardTitleFontSize,
  },
  "course-card-title-4": {
    "font-size": courseCardTitleFontSize,
  },
  "course-card-title-5": {
    "font-size": courseCardTitleFontSize,
  },
  "course-card-title-6": {
    "font-size": courseCardTitleFontSize,
  },
  "course-card-description-2": {
    "font-size": courseCardDescriptionFontSize550,
  },
  "course-card-description-3": {
    "font-size": courseCardDescriptionFontSize550,
  },
  "course-card-description-4": {
    "font-size": courseCardDescriptionFontSize550,
  },
  "course-card-description-5": {
    "font-size": courseCardDescriptionFontSize550,
  },
  "course-card-description-6": {
    "font-size": courseCardDescriptionFontSize550,
  },
  footer: {
    ...uContainerPadding,
    "padding-top": footerVerticalPadding,
    "padding-bottom": footerVerticalPadding,
  },
  "footer-logo": siteLogo,
  "hero-btn": {
    "font-size": btnFontSize550,
    "padding-top": btnRadiantVerticalPadding550,
    "padding-right": btnRadiantHorizontalPadding550,
    "padding-bottom": btnRadiantVerticalPadding550,
    "padding-left": btnRadiantHorizontalPadding550,
  },
  "course-card-btn-2": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize,
    ...btnTransparentPadding,
  },
  "course-card-btn-3": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize,
    ...btnTransparentPadding,
  },
  "course-card-btn-4": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize,
    ...btnTransparentPadding,
  },
  "course-card-btn-5": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize,
    ...btnTransparentPadding,
  },
  "course-card-btn-6": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize,
    ...btnTransparentPadding,
  },
};

export { docStruct1000 };
