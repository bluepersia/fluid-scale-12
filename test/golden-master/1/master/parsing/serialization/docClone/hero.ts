import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";
import { NullRule } from "../../../../../../parsing/serialization/index.types";

const docCloneHero: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".hero",
      style: {
        "font-size": "1rem",
        "padding-top": "2.375rem",
      },
      specialProps: {
        "--force": "padding-top",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".hero__content",
      style: {
        "max-width": "24.875rem",
        "margin-bottom": "2.875rem",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".hero__title",
      style: {
        "font-size": "2.5em",
        "margin-bottom": "1.625rem",
      },
      specialProps: {
        "--soan-start": "font-size, margin-bottom",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".hero__description",
      style: {
        "line-height": "1.625",
        "margin-bottom": "1.5rem",
      },
      specialProps: {
        "--span-start": "margin-bottom",
      },
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".hero__image--mobile",
      style: {
        "margin-top": "0px",
        "margin-right": "auto",
        "margin-bottom": "0px",
        "margin-left": "auto",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      null: true,
    } as NullRule,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".hero",
          style: {
            "padding-top": "6.1875rem",
            "padding-bottom": "11.625rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__title",
          style: {},
          specialProps: {
            "--span-end": "font-size, margin-bottom",
          },
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__description",
          style: {},
          specialProps: {
            "--span-end": "margin-bottom",
          },
        } as StyleRuleClone,
        {
          type: 1,
          null: true,
        } as NullRule,
        {
          type: 1,
          selectorText: ".hero__image--tablet",
          style: {
            right: "-18rem",
            top: "-9rem",
            width: "43.43rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
    {
      type: 4,
      minWidth: 1200,
      cssRules: [
        {
          type: 1,
          selectorText: ".hero",
          style: {
            "padding-top": "10.75rem",
            "padding-bottom": "14.125rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__title",
          style: {
            "font-size": "3.5em",
            "margin-bottom": "1.8125rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__description",
          style: {
            "margin-bottom": "2.5rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__image--tablet, .hero__image--desktop",
          style: {
            right: "-20rem",
            top: "-14rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          selectorText: ".hero__image--tablet",
          style: {
            width: "65rem",
          },
          specialProps: {},
        } as StyleRuleClone,
        {
          type: 1,
          null: true,
        } as NullRule,
      ],
    } as MediaRuleClone,
  ],
};
