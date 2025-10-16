import { UpdateDocStruc } from "../../../../../engine/updater/index.types";
import { Counter } from "../../../../../parsing/parser/orderCounter";

const counter = new Counter();

let orderID = counter.next();

const uContainerPaddingVertical550 = {
  conversions: {
    "0px": 0,
  },
  computedValues: {
    actual: [[0]],
    actualOrderID: 0,
  },
};

const uContainerPaddingHorizontal550 = {
  conversions: {
    "1rem": 16,
    "2.4375rem": 39,
  },
  computedValues: {
    actual: [[26.24]],
    actualOrderID: orderID,
  },
};

const uContainerPadding550 = {
  "padding-top": uContainerPaddingVertical550,
  "padding-bottom": uContainerPaddingVertical550,
  "padding-left": uContainerPaddingHorizontal550,
  "padding-right": uContainerPaddingHorizontal550,
};

orderID = counter.next();

const siteLogo550 = {
  width: {
    conversions: {},
    computedValues: {
      actual: [[NaN]],
      actualOrderID: orderID,
    },
  },
};

orderID = counter.next();

const headerPaddingTop550 = {
  conversions: {
    "1rem": 16,
    "1.5rem": 24,
  },
  computedValues: {
    actual: [[19.56]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroPaddingTop550 = {
  conversions: {
    "2.375rem": 38,
    "6.1875rem": 99,
  },
  computedValues: {
    actual: [[65.16]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroTitleFontSize550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const heroDescriptionMarginBottom550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};
orderID = counter.next();

const coursesPaddingBottom550 = {
  conversions: {
    "5rem": 80,
    "5.375rem": 86,
  },
  computedValues: {
    actual: [[82.67]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseListRowGap550 = {
  conversions: {
    "2.5rem": 40,
    "3.5rem": 56,
  },
  computedValues: {
    actual: [[47.12]],
    actualOrderID: orderID,
  },
};

const courseListColumnGap550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const courseListGridTemplateColumns550 = {
  conversions: {},
  computedValues: {
    actual: [[497.531]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardPaddingHorizontal550 = {
  conversions: {
    "1.75rem": 28,
    "2rem": 32,
  },
  computedValues: {
    actual: [[29.78]],
    actualOrderID: orderID,
  },
};

const courseCardPaddingBottom550 = {
  conversions: {
    "2rem": 32,
    "2.5rem": 40,
  },
  computedValues: {
    actual: [[33.69]],
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

const courseCardHeight550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const courseCardTitleFontSize550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
    actualOrderID: orderID,
  },
};

const courseCardDescriptionFontSize550 = {
  conversions: {
    "1em": 16,
    "1.125em": 18,
  },
  computedValues: {
    actual: [[16.42]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const footerVerticalPadding550 = {
  conversions: {
    "1rem": 16,
    "2.25rem": 36,
  },
  computedValues: {
    actual: [[24.9]],
    actualOrderID: orderID,
  },
};

orderID = counter.next();

const btnFontSize550 = {
  conversions: {},
  computedValues: {
    actual: [[NaN]],
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

const btnTransparentFontSize550 = {
  conversions: {
    "1.125rem": 18,
  },
  computedValues: {
    actual: [[18]],
    actualOrderID: orderID,
  },
};

const courseCard = {
  "padding-left": courseCardPaddingHorizontal550,
  "padding-right": courseCardPaddingHorizontal550,
  "padding-bottom": courseCardPaddingBottom550,
  "padding-top": courseCardPaddingTop,
  height: courseCardHeight550,
};

const generalBtnPadding = {
  "padding-top": btnFontSize550,
  "padding-right": btnFontSize550,
  "padding-bottom": btnFontSize550,
  "padding-left": btnFontSize550,
};

const docStruct550: UpdateDocStruc = {
  "header-logo": siteLogo550,
  "header-btn": {
    "font-size": btnFontSize550,
    ...generalBtnPadding,
  },
  header: {
    ...uContainerPadding550,
    "padding-top": headerPaddingTop550,
  },
  hero: { ...uContainerPadding550, "padding-top": heroPaddingTop550 },
  "hero-title": {
    "font-size": heroTitleFontSize550,
    "margin-bottom": heroTitleFontSize550,
  },
  "hero-description": {
    "margin-bottom": heroDescriptionMarginBottom550,
  },
  courses: {
    ...uContainerPadding550,
    "padding-bottom": coursesPaddingBottom550,
  },
  "course-list": {
    "row-gap": courseListRowGap550,
    "column-gap": courseListColumnGap550,
    "grid-template-columns": courseListGridTemplateColumns550,
  },
  "course-card-intro": courseCard,
  "course-card-2": courseCard,
  "course-card-3": courseCard,
  "course-card-4": courseCard,
  "course-card-5": courseCard,
  "course-card-6": courseCard,
  "course-card-title-1": {
    "font-size": courseCardTitleFontSize550,
  },
  "course-card-title-2": {
    "font-size": courseCardTitleFontSize550,
  },
  "course-card-title-3": {
    "font-size": courseCardTitleFontSize550,
  },
  "course-card-title-4": {
    "font-size": courseCardTitleFontSize550,
  },
  "course-card-title-5": {
    "font-size": courseCardTitleFontSize550,
  },
  "course-card-title-6": {
    "font-size": courseCardTitleFontSize550,
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
    ...uContainerPadding550,
    "padding-top": footerVerticalPadding550,
    "padding-bottom": footerVerticalPadding550,
  },
  "footer-logo": siteLogo550,
  "hero-btn": {
    "font-size": btnFontSize550,
    "padding-top": btnRadiantVerticalPadding550,
    "padding-right": btnRadiantHorizontalPadding550,
    "padding-bottom": btnRadiantVerticalPadding550,
    "padding-left": btnRadiantHorizontalPadding550,
  },
  "course-card-btn-2": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize550,
  },
  "course-card-btn-3": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize550,
  },
  "course-card-btn-4": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize550,
  },
  "course-card-btn-5": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize550,
  },
  "course-card-btn-6": {
    ...generalBtnPadding,
    "font-size": btnTransparentFontSize550,
  },
};

export { docStruct550 };
