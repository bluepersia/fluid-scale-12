import { RuntimeGoldenDoc } from "../../../../engine/index.types";
import fluidData from "../parsing/parser/fluidData";

const docStructure: RuntimeGoldenDoc = {
  "1": {
    anchor: ".product-card",
    selector: ".product-card",
    fluidProperties: [fluidData[".product-card"][".product-card"]["max-width"]],
  },
  "4": {
    anchor: ".product-card__content",
    selector: ".product-card__content",
    fluidProperties: [
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
  "5": {
    anchor: ".product-card__category",
    selector: ".product-card__category",
    fluidProperties: [
      fluidData[".product-card__category"][".product-card__category"][
        "margin-bottom"
      ],
    ],
  },
  "6": {
    anchor: ".product-card__title",
    selector: ".product-card__title",
    fluidProperties: [
      fluidData[".product-card__title"][".product-card__title"][
        "margin-bottom"
      ],
    ],
  },
  "7": {
    anchor: ".product-card__description",
    selector: ".product-card__description",
    fluidProperties: [
      fluidData[".product-card__description"][".product-card__description"][
        "margin-bottom"
      ],
    ],
  },
  "11": {
    anchor: ".product-card__button",
    selector: ".product-card__button",
    fluidProperties: [
      fluidData[".product-card__button"][".product-card__button"]["margin-top"],
    ],
  },
};

export { docStructure };
