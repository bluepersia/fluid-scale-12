import { RuntimeGoldenDoc } from "../../../../engine/index.types";
import { fillDocWithNullRanges } from "../../../../engine/masterController";
import { fluidData } from "../parsing/parser/fluidData/fluidData";

const containerProperties = [
  fluidData[".u-container"][".u-container"]["padding-top"],
  fluidData[".u-container"][".u-container"]["padding-right"],
  fluidData[".u-container"][".u-container"]["padding-bottom"],
  fluidData[".u-container"][".u-container"]["padding-left"],
];

const courseCardProperties = [
  fluidData[".course-card"][".course-card"]["padding-right"],
  fluidData[".course-card"][".course-card"]["padding-bottom"],
  fluidData[".course-card"][".course-card"]["padding-left"],
  fluidData[".course-card"][".course-card"]["padding-top"],
];

const courseCardTitleProperties = [
  fluidData[".course-card__title"][".course-card__title"]["font-size"],
];

const btnProperties = [
  fluidData[".btn"][".btn"]["font-size"],
  fluidData[".btn"][".btn"]["padding-top"],
  fluidData[".btn"][".btn"]["padding-right"],
  fluidData[".btn"][".btn"]["padding-bottom"],
  fluidData[".btn"][".btn"]["padding-left"],
];
const docStructureBase: RuntimeGoldenDoc = {
  header: {
    ".header": {
      ".header": [fluidData[".header"][".header"]["padding-top"]],
    },
    ".u-container": {
      ".u-container": containerProperties,
    },
  },
  "header-logo": {
    ".site-logo": {
      ".site-logo": [fluidData[".site-logo"][".site-logo"]["width"]],
    },
  },
  "header-btn": {
    ".btn": {
      ".btn": btnProperties,
    },
  },
  hero: {
    ".hero": {
      ".hero": [
        fluidData[".hero"][".hero"]["padding-top"],
        fluidData[".hero"][".hero"]["padding-bottom"],
      ],
    },
    ".u-container": {
      ".u-container": containerProperties,
    },
  },
  "hero-title": {
    ".hero__title": {
      ".hero__title": [
        fluidData[".hero__title"][".hero__title"]["font-size"],
        fluidData[".hero__title"][".hero__title"]["margin-bottom"],
      ],
    },
  },
  "hero-description": {
    ".hero__description": {
      ".hero__description": [
        fluidData[".hero__description"][".hero__description"]["margin-bottom"],
      ],
    },
  },
  "hero-btn": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--radiant": {
      ".btn--radiant": [
        fluidData[".btn--radiant"][".btn--radiant"]["padding-top"],
        fluidData[".btn--radiant"][".btn--radiant"]["padding-right"],
        fluidData[".btn--radiant"][".btn--radiant"]["padding-bottom"],
        fluidData[".btn--radiant"][".btn--radiant"]["padding-left"],
      ],
    },
  },
  "hero-image-tablet": {
    ".hero__image--tablet": {
      ".hero__image--tablet": [
        fluidData[".hero__image--tablet"][".hero__image--tablet"]["right"],
        fluidData[".hero__image--tablet"][".hero__image--tablet"]["top"],
        fluidData[".hero__image--tablet"][".hero__image--tablet"]["width"],
      ],
    },
  },
  courses: {
    ".home-page__courses": {
      ".home-page__courses": [
        fluidData[".home-page__courses"][".home-page__courses"][
          "padding-bottom"
        ],
      ],
    },
    ".u-container": {
      ".u-container": containerProperties,
    },
  },
  "course-list": {
    ".home-page__course-list": {
      ".home-page__course-list": [
        fluidData[".home-page__course-list"][".home-page__course-list"][
          "row-gap"
        ],
        fluidData[".home-page__course-list"][".home-page__course-list"][
          "grid-template-columns"
        ],
        fluidData[".home-page__course-list"][".home-page__course-list"][
          "column-gap"
        ],
      ],
    },
  },
  "course-card-intro": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-1": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
      ".course-card--intro .course-card__title": [
        fluidData[".course-card__title"][
          ".course-card--intro .course-card__title"
        ]["font-size"],
      ],
    },
  },

  "course-card-2": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-2": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
    },
  },
  "course-card-description-2": {
    ".course-card__description": {
      ".course-card__description": [
        fluidData[".course-card__description"][".course-card__description"][
          "font-size"
        ],
      ],
    },
  },
  "course-card-btn-2": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--transparent": {
      ".btn--transparent": [
        fluidData[".btn--transparent"][".btn--transparent"]["font-size"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-top"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-right"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-bottom"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-left"],
      ],
    },
  },
  "course-card-3": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-3": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
    },
  },
  "course-card-description-3": {
    ".course-card__description": {
      ".course-card__description": [
        fluidData[".course-card__description"][".course-card__description"][
          "font-size"
        ],
      ],
    },
  },
  "course-card-btn-3": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--transparent": {
      ".btn--transparent": [
        fluidData[".btn--transparent"][".btn--transparent"]["font-size"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-top"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-right"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-bottom"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-left"],
      ],
    },
  },
  "course-card-4": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-4": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
    },
  },
  "course-card-description-4": {
    ".course-card__description": {
      ".course-card__description": [
        fluidData[".course-card__description"][".course-card__description"][
          "font-size"
        ],
      ],
    },
  },
  "course-card-btn-4": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--transparent": {
      ".btn--transparent": [
        fluidData[".btn--transparent"][".btn--transparent"]["font-size"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-top"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-right"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-bottom"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-left"],
      ],
    },
  },
  "course-card-5": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-5": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
    },
  },
  "course-card-description-5": {
    ".course-card__description": {
      ".course-card__description": [
        fluidData[".course-card__description"][".course-card__description"][
          "font-size"
        ],
      ],
    },
  },
  "course-card-btn-5": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--transparent": {
      ".btn--transparent": [
        fluidData[".btn--transparent"][".btn--transparent"]["font-size"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-top"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-right"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-bottom"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-left"],
      ],
    },
  },
  "course-card-6": {
    ".course-card": {
      ".course-card": courseCardProperties,
    },
  },
  "course-card-title-6": {
    ".course-card__title": {
      ".course-card__title": courseCardTitleProperties,
    },
  },
  "course-card-description-6": {
    ".course-card__description": {
      ".course-card__description": [
        fluidData[".course-card__description"][".course-card__description"][
          "font-size"
        ],
      ],
    },
  },
  "course-card-btn-6": {
    ".btn": {
      ".btn": btnProperties,
    },
    ".btn--transparent": {
      ".btn--transparent": [
        fluidData[".btn--transparent"][".btn--transparent"]["font-size"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-top"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-right"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-bottom"],
        fluidData[".btn--transparent"][".btn--transparent"]["padding-left"],
      ],
    },
  },

  footer: {
    ".footer": {
      ".footer": [
        fluidData[".footer"][".footer"]["padding-top"],
        fluidData[".footer"][".footer"]["padding-bottom"],
      ],
    },
    ".u-container": {
      ".u-container": containerProperties,
    },
  },
  "footer-logo": {
    ".site-logo": {
      ".site-logo": [fluidData[".site-logo"][".site-logo"]["width"]],
    },
  },
  "footer-btn": {
    ".btn": {
      ".btn": btnProperties,
    },
  },
};

const docStructure = fillDocWithNullRanges(docStructureBase, 3);
export { docStructure };
