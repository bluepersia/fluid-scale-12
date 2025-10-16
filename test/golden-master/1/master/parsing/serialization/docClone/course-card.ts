import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docCloneCourseCard: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".course-card",
      style: {
        "padding-top": "3.5rem",
        "padding-right": "1.75rem",
        "padding-bottom": "2rem",
        "padding-left": "1.75rem",
        "border-top-right-radius": "0.625rem",
        "border-bottom-right-radius": "0.625rem",
        "border-bottom-left-radius": "0.625rem",
        "border-top-left-radius": "0.625rem",
        height: "16rem",
      },
      specialProps: {
        "--span-start": "height, padding-top",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card__title",
      style: {
        "font-size": "1.25em",
        "margin-bottom": "1rem",
      },
      specialProps: {
        "--span-start": "font-size",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card__description",
      style: {
        "line-height": "1.625",
        "margin-bottom": "1.5rem",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card--intro",
      style: {
        "padding-top": "1.5rem",
        "margin-bottom": "0px",
        "background-position-y": "",
        "background-position-x": "",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card--intro .course-card__title",
      style: {
        "font-size": "1.5em",
      },
      specialProps: {
        "--span-start": "font-size",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card__image",
      style: {
        top: "-1.75rem",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".course-card__btn",
      style: {
        "margin-top": "auto",
        "margin-bottom": "0px",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".course-card",
          style: {
            "padding-right": "2rem",
            "padding-left": "2rem",
          },
          specialProps: {
            "--span-end": "height, padding-top",
          },
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".course-card__title",
          style: {},
          specialProps: {
            "--span-end": "font-size",
          },
        } as StyleRuleClone,

        {
          type: 1,
          selectorText: ".course-card--intro .course-card__title",
          style: {},
          specialProps: {
            "--span-end": "font-size",
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
          selectorText: ".course-card",
          style: {
            height: "20.125rem",
            "padding-top": "4rem",
            "padding-bottom": "2.5rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".course-card__description",
          style: {
            "font-size": "1.125em",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".course-card--intro .course-card__title",
          style: {
            "font-size": "2em",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".course-card__title",
          style: {
            "font-size": "1.5em",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneCourseCard };
