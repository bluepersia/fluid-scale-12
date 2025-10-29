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
    actualOrderID: 0,
  },
};

const uContainerPaddingHorizontal = {
  conversions: {
    "1rem": 16,
    "2.4375rem": 39,
  },
  computedValues: {
    actual: [[16]],
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
    conversions: {},
    computedValues: {
      actual: [[NaN]],
      actualOrderID: orderID,
    },
  },
};

orderID = counter.next();

const headerPaddingTop = {
  conversions: {
    "1rem": 16,
    "1.5rem": 24,
  },
  computedValues: {
    actual: [[16]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroPaddingTop = {
  conversions: {
    "2.375rem": 38,
    "6.1875rem": 99,
  },
  computedValues: {
    actual: [[38]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroPaddingBottom = {
  conversions: {
    "0px": 0,
  },
  computedValues: {
    actual: [[0]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroTitleFontSize = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroDescriptionMarginBottom = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};
orderID = counter.next();

const heroImageTabletRight = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const heroImageTabletTop = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const heroImageTabletWidth = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const coursesPaddingBottom = {
  conversions: {
    "5rem": 80,
    "5.375rem": 86,
  },
  computedValues: {
    actual: [[80]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseListRowGap = {
  conversions: {
    "2.5rem": 40,
    "3.5rem": 56,
  },
  computedValues: {
    actual: [[40]],
    actualOrderID: orderID,
  },
};

const courseListColumnGap = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const courseListGridTemplateColumns = {
  conversions: {},
  computedValues: {
    actual: [[343]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardPaddingHorizontal = {
  conversions: {
    "1.75rem": 28,
    "2rem": 32,
  },
  computedValues: {
    actual: [[28]],
    actualOrderID: orderID,
  },
};

const courseCardPaddingBottom = {
  conversions: {
    "2rem": 32,
    "2.5rem": 40,
  },
  computedValues: {
    actual: [[32]],
    actualOrderID: orderID,
  },
};

const courseCardPaddingTop = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardTitleFontSize = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const courseCardDescriptionFontSize = {
  conversions: {
    "1em": 16,
    "1.125em": 18,
  },
  computedValues: {
    actual: [[16]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const footerVerticalPadding = {
  conversions: {
    "1rem": 16,
    "2.25rem": 36,
  },
  computedValues: {
    actual: [[16]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const btnFontSize = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();
const btnRadiantVerticalPadding = {
  conversions: {
    "0.9375rem": 15,
  },
  computedValues: {
    actual: [[15]],
    actualOrderID: orderID,
  },
};

const btnRadiantHorizontalPadding = {
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
    actualRaw: [[1.125]],
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
  "padding-top": btnFontSize,
  "padding-right": btnFontSize,
  "padding-bottom": btnFontSize,
  "padding-left": btnFontSize,
};

const docStruct375: UpdateDocStruc = {
  "header-logo": siteLogo,
  "header-btn": {
    "font-size": btnFontSize,
    ...generalBtnPadding,
  },
  "footer-btn": {
    "font-size": btnFontSize,
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
    "margin-bottom": heroTitleFontSize,
  },
  "hero-image-tablet": {
    right: heroImageTabletRight,
    top: heroImageTabletTop,
    width: heroImageTabletWidth,
  },
  "hero-description": {
    "margin-bottom": heroDescriptionMarginBottom,
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
    "font-size": courseCardTitleFontSize,
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
    "font-size": courseCardDescriptionFontSize,
  },
  "course-card-description-3": {
    "font-size": courseCardDescriptionFontSize,
  },
  "course-card-description-4": {
    "font-size": courseCardDescriptionFontSize,
  },
  "course-card-description-5": {
    "font-size": courseCardDescriptionFontSize,
  },
  "course-card-description-6": {
    "font-size": courseCardDescriptionFontSize,
  },
  footer: {
    ...uContainerPadding,
    "padding-top": footerVerticalPadding,
    "padding-bottom": footerVerticalPadding,
  },
  "footer-logo": siteLogo,
  "hero-btn": {
    "font-size": btnFontSize,
    "padding-top": btnRadiantVerticalPadding,
    "padding-right": btnRadiantHorizontalPadding,
    "padding-bottom": btnRadiantVerticalPadding,
    "padding-left": btnRadiantHorizontalPadding,
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

export { docStruct375 };
