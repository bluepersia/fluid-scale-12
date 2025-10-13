import { RuntimeGoldenDoc } from "../../../../engine/index.types";
import { fillDocWithNullRanges } from "../../../../engine/masterController";
import fluidData from "../parsing/parser/fluidData";

const docStructureBase: RuntimeGoldenDoc = {
  "1": {
    ".product-card": {
      ".product-card": [
        fluidData[".product-card"][".product-card"]["max-width"],
        fluidData[".product-card"][".product-card"][
          "border-bottom-right-radius"
        ],
      ],
    },
  },
  "4": {
    ".product-card__content": {
      ".product-card__content": [
        fluidData[".product-card__content"][".product-card__content"][
          "padding-top"
        ],
        fluidData[".product-card__content"][".product-card__content"][
          "padding-right"
        ],
        fluidData[".product-card__content"][".product-card__content"][
          "padding-bottom"
        ],
        fluidData[".product-card__content"][".product-card__content"][
          "padding-left"
        ],
      ],
    },
  },
  "5": {
    ".product-card__category": {
      ".product-card__category": [
        fluidData[".product-card__category"][".product-card__category"][
          "margin-bottom"
        ],
      ],
    },
  },
  "6": {
    ".product-card__title": {
      ".product-card__title": [
        fluidData[".product-card__title"][".product-card__title"][
          "margin-bottom"
        ],
      ],
    },
  },
  "7": {
    ".product-card__description": {
      ".product-card__description": [
        fluidData[".product-card__description"][".product-card__description"][
          "margin-bottom"
        ],
      ],
    },
  },
  "11": {
    ".product-card__button": {
      ".product-card__button": [
        fluidData[".product-card__button"][".product-card__button"][
          "margin-top"
        ],
      ],
    },
  },
};

const docStructure = fillDocWithNullRanges(docStructureBase, 2);
export { docStructure };
