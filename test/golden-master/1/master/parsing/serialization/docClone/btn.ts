import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";
import { NullRule } from "../../../../../../parsing/serialization/index.types";

const docCloneBtn: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".btn",
      style: {
        "font-size": "1rem",
        "border-top-right-radius": "1.75rem",
        "border-bottom-right-radius": "1.75rem",
        "border-bottom-left-radius": "1.75rem",
        "border-top-left-radius": "1.75rem",
        "padding-top": "0.625rem",
        "padding-right": "1.5rem",
        "padding-bottom": "0.625rem",
        "padding-left": "1.5rem",
      },
      specialProps: {
        "--span-start": "font-size, padding",
      },
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".btn",
          style: {},
          specialProps: {
            "--span-end": "font-size, padding",
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
          selectorText: ".btn",
          style: {
            "font-size": "1.125rem",
            "padding-top": "0.875rem",
            "padding-right": "2rem",
            "padding-bottom": "0.875rem",
            "padding-left": "2rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
    {
      type: 1,
      null: true,
    } as NullRule,
    {
      type: 1,
      selectorText: ".btn--radiant",
      style: {
        "padding-top": "0.9375rem",
        "padding-right": "2.375rem",
        "padding-bottom": "0.9375rem",
        "padding-left": "2.375rem",
        "border-top-right-radius": "1.96rem",
        "border-bottom-right-radius": "1.96rem",
        "border-bottom-left-radius": "1.96rem",
        "border-top-left-radius": "1.96rem",
        "background-position-y": "",
        "background-position-x": "",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".btn--transparent",
      style: {
        "padding-top": "0px",
        "padding-right": "0px",
        "padding-bottom": "0px",
        "padding-left": "0px",
        "font-size": "1.125rem",
        "background-position-y": "initial",
        "background-position-x": "initial",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      selectorText: ".btn--radiant-2",
      style: {
        "background-position-y": "initial",
        "background-position-x": "initial",
      },
      specialProps: {},
    } as StyleRuleClone,
  ],
};

export { docCloneBtn };
