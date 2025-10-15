import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docCloneHomePage: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".home-page__courses",
      style: {
        "padding-bottom": "5rem",
      },
      specialProps: {
        "--force": "padding-bottom",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".home-page__course-list",
      style: {
        "padding-left": "0px",
        "row-gap": "2.5rem",
        "column-gap": "0.624rem",
        "grid-template-columns": "repeat(auto-fit, minmax(21.43rem, 1fr))",
      },
      specialProps: {
        "--span-start": "column-gap",
      },
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".home-page__courses",
          style: {
            "padding-bottom": "5.375rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".home-page__course-list",
          style: {
            "row-gap": "3.5rem",
          },
          specialProps: {
            "--span-end": "column-gap",
          },
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
    {
      type: 4,
      minWidth: 1200,
      cssRules: [
        {
          type: 1,
          selectorText: ".home-page__courses",
          style: {
            "padding-bottom": "8.75rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".home-page__course-list",
          style: {
            "row-gap": "5rem",
            "column-gap": "1.875rem",
            "grid-template-columns": "repeat(3, 1fr)",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneHomePage };
