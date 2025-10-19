import {
  FluidData,
  FluidValueSingle,
} from "../../../../../../src/parsing/parser/docParser.types";

import { Counter } from "../../../../../parsing/parser/orderCounter";

const counter = new Counter();

let orderID = counter.next();

const productCardData = {
  "max-width": {
    metaData: {
      orderID,
      property: "max-width",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 24.5,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 42.85,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
  "border-bottom-right-radius": {
    metaData: {
      orderID,
      property: "border-bottom-right-radius",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 0.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 0.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
orderID = counter.next();
const productCardContentData = {
  "padding-top": {
    metaData: {
      orderID,
      property: "padding-top",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.28,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
  "padding-right": {
    metaData: {
      orderID,
      property: "padding-right",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.28,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
  "padding-bottom": {
    metaData: {
      orderID,
      property: "padding-bottom",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.28,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
  "padding-left": {
    metaData: {
      orderID,
      property: "padding-left",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.28,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
orderID = counter.next();

const productCardCategoryData = {
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 0.85,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 1.42,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
orderID = counter.next();

const productCardTitleData = {
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.14,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
orderID = counter.next();

const productCardDescriptionData = {
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.71,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.07,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
orderID = counter.next();

const productCardButtonData = {
  "margin-top": {
    metaData: {
      orderID,
      property: "margin-top",
    },
    ranges: [
      {
        minValue: [
          [
            {
              value: 1.42,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        maxValue: [
          [
            {
              value: 2.14,
              unit: "rem",
              type: "single",
            } as FluidValueSingle,
          ],
        ],
        minBpIndex: 0,
        maxBpIndex: 1,
      },
    ],
  },
};
const fluidData: FluidData = {
  ".product-card": {
    ".product-card": productCardData,
  },
  ".product-card__content": {
    ".product-card__content": productCardContentData,
  },
  ".product-card__category": {
    ".product-card__category": productCardCategoryData,
  },
  ".product-card__title": {
    ".product-card__title": productCardTitleData,
  },
  ".product-card__description": {
    ".product-card__description": productCardDescriptionData,
  },
  ".product-card__button": {
    ".product-card__button": productCardButtonData,
  },
};

export default fluidData;
