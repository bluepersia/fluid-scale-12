import {
  FluidData,
  FluidPropertyData,
  FluidValueSingle,
} from "../../../../../../src/parsing/parser/docParser.types";

import { Counter } from "../../../../../parsing/parser/orderCounter";

const counter = new Counter();

let orderID = counter.next();

const htmlData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "font-size",
  },
  forceValue: "14px",
};

orderID = counter.next();

const bodyMarginTopData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-top",
  },
  forceValue: "0px",
};

const bodyMarginRightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-right",
  },
  forceValue: "0px",
};

const bodyMarginBottomData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-bottom",
  },
  forceValue: "0px",
};

const bodyMarginLeftData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "margin-left",
  },
  forceValue: "0px",
};

const bodyPaddingTopData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  forceValue: "0px",
};

const bodyPaddingRightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-right",
  },
  forceValue: "0px",
};

const bodyPaddingBottomData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-bottom",
  },
  forceValue: "0px",
};

const bodyPaddingLeftData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-left",
  },
  forceValue: "0px",
};

const bodyMinHeightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "min-height",
  },
  forceValue: "100vh",
};

const bodyData = {
  "margin-top": bodyMarginTopData,
  "margin-right": bodyMarginRightData,
  "margin-bottom": bodyMarginBottomData,
  "margin-left": bodyMarginLeftData,
  "padding-top": bodyPaddingTopData,
  "padding-right": bodyPaddingRightData,
  "padding-bottom": bodyPaddingBottomData,
  "padding-left": bodyPaddingLeftData,
  "min-height": bodyMinHeightData,
};

orderID = counter.next();

const allData = {
  "margin-top": {
    metaData: {
      orderID,
      property: "margin-top",
    },
    forceValue: "0px",
  },
  "margin-right": {
    metaData: {
      orderID,
      property: "margin-right",
    },
    forceValue: "0px",
  },
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    forceValue: "0px",
  },
  "margin-left": {
    metaData: {
      orderID,
      property: "margin-left",
    },
    forceValue: "0px",
  },
};

orderID = counter.next();

const imgMaxWidthData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "max-width",
  },
  forceValue: "100%",
};

const imgHeightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "height",
  },
  forceValue: "auto",
};

orderID = counter.next();

const uContainerPaddingTopData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-top",
  },
  forceValue: "0px",
};

const uContainerPaddingRightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-right",
  },
  forceValue: "1.14rem",
};

const uContainerPaddingBottomData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-bottom",
  },
  forceValue: "0px",
};

const uContainerPaddingLeftData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "padding-left",
  },
  forceValue: "1.14rem",
};

orderID = counter.next();

const productCardData = {
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "1rem",
  },
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
  "border-bottom-left-radius": {
    metaData: {
      orderID,
      property: "border-bottom-left-radius",
    },
    forceValue: "0.71rem",
  },
};
orderID = counter.next();

const productCardMobileImgBorderTopLeftRadiusData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "border-top-left-radius",
  },
  forceValue: "0.71rem",
};

const productCardMobileImgBorderTopRightRadiusData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "border-top-right-radius",
  },
  forceValue: "0.71rem",
};

const productCardMobileImgWidthData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "width",
  },
  forceValue: "100%",
};

const productCardMobileImgObjectPositionData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "object-position",
  },
  forceValue: "0px -5rem",
};

const productCardMobileImgMaxHeightData: FluidPropertyData = {
  metaData: {
    orderID,
    property: "max-height",
  },
  forceValue: "17.14rem",
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
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "0.85em",
  },
  "letter-spacing": {
    metaData: {
      orderID,
      property: "letter-spacing",
    },
    forceValue: "0.41rem",
  },
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
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "2.28em",
  },
  "line-height": {
    metaData: {
      orderID,
      property: "line-height",
    },
    forceValue: "1em",
  },
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
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "1em",
  },
  "line-height": {
    metaData: {
      orderID,
      property: "line-height",
    },
    forceValue: "1.64em",
  },
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

const productCardPriceData = {
  "column-gap": {
    metaData: {
      orderID,
      property: "column-gap",
    },
    forceValue: "1.35rem",
  },
  "row-gap": {
    metaData: {
      orderID,
      property: "row-gap",
    },
    forceValue: "1.35rem",
  },
  "margin-bottom": {
    metaData: {
      orderID,
      property: "margin-bottom",
    },
    forceValue: "0px",
  },
};
orderID = counter.next();

const productCardPriceActualData = {
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "2.28em",
  },
};
orderID = counter.next();

const productCardPriceOriginalData = {
  "font-size": {
    metaData: {
      orderID,
      property: "font-size",
    },
    forceValue: "0.92em",
  },
};
const productCardButtonData = {
  width: {
    metaData: {
      orderID,
      property: "width",
    },
    forceValue: "100%",
  },
  "border-top-left-radius": {
    metaData: {
      orderID,
      property: "border-top-left-radius",
    },
    forceValue: "0.57rem",
  },
  "border-top-right-radius": {
    metaData: {
      orderID,
      property: "border-top-right-radius",
    },
    forceValue: "0.57rem",
  },
  "border-bottom-right-radius": {
    metaData: {
      orderID,
      property: "border-bottom-right-radius",
    },
    forceValue: "0.57rem",
  },
  "border-bottom-left-radius": {
    metaData: {
      orderID,
      property: "border-bottom-left-radius",
    },
    forceValue: "0.57rem",
  },
  "padding-top": {
    metaData: {
      orderID,
      property: "padding-top",
    },
    forceValue: "1.07rem",
  },
  "padding-right": {
    metaData: {
      orderID,
      property: "padding-right",
    },
    forceValue: "1.07rem",
  },
  "padding-bottom": {
    metaData: {
      orderID,
      property: "padding-bottom",
    },
    forceValue: "1.07rem",
  },
  "padding-left": {
    metaData: {
      orderID,
      property: "padding-left",
    },
    forceValue: "1.07rem",
  },
  "row-gap": {
    metaData: {
      orderID,
      property: "row-gap",
    },
    forceValue: "0.85rem",
  },
  "column-gap": {
    metaData: {
      orderID,
      property: "column-gap",
    },
    forceValue: "0.85rem",
  },
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
  html: {
    html: {
      "font-size": htmlData,
    },
  },
  body: {
    body: bodyData,
  },
  "*": {
    "*": allData,
  },
  "::before": {
    "::before": allData,
  },
  "::after": {
    "::after": allData,
  },
  img: {
    img: {
      "max-width": imgMaxWidthData,
      height: imgHeightData,
    },
  },
  ".u-container": {
    ".u-container": {
      "padding-top": uContainerPaddingTopData,
      "padding-right": uContainerPaddingRightData,
      "padding-bottom": uContainerPaddingBottomData,
      "padding-left": uContainerPaddingLeftData,
    },
  },

  ".product-card": {
    ".product-card": productCardData,
  },
  ".product-card__img--mobile": {
    ".product-card__img--mobile": {
      "border-top-left-radius": productCardMobileImgBorderTopLeftRadiusData,
      "border-top-right-radius": productCardMobileImgBorderTopRightRadiusData,
      width: productCardMobileImgWidthData,
      "object-position": productCardMobileImgObjectPositionData,
      "max-height": productCardMobileImgMaxHeightData,
    },
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
  ".product-card__price": {
    ".product-card__price": productCardPriceData,
  },
  ".product-card__price--actual": {
    ".product-card__price--actual": productCardPriceActualData,
  },
  ".product-card__price--original": {
    ".product-card__price--original": productCardPriceOriginalData,
  },
  ".product-card__button": {
    ".product-card__button": productCardButtonData,
  },
};

export default fluidData;
