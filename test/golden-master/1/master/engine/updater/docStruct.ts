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
    "2.4375rem": 26.24,
  },
  computedValues: {
    actual: [[0]],
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

const docStruct550: UpdateDocStruc = {
  header: {
    ...uContainerPadding550,
    "padding-top": headerPaddingTop550,
  },
  hero: { ...uContainerPadding550, "padding-top": heroPaddingTop550 },
  courses: {
    ...uContainerPadding550,
    "padding-bottom": coursesPaddingBottom550,
  },
  "course-list": {
    "row-gap": courseListRowGap550,
  },
  "course-card": {
    "padding-left": courseCardPaddingHorizontal550,
    "padding-right": courseCardPaddingHorizontal550,
    "padding-bottom": courseCardPaddingBottom550,
  },
  footer: { ...uContainerPadding550 },
  "site-logo": siteLogo550,
};
