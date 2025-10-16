import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";
import { NullRule } from "../../../../../../parsing/serialization/index.types";

const docCloneGlobal: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: "*, ::before, ::after",
      style: {
        "margin-top": "0px",
        "margin-right": "0px",
        "margin-bottom": "0px",
        "margin-left": "0px",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 1,
      null: true,
    } as NullRule,
    {
      type: 1,
      null: true,
    } as NullRule,
    {
      type: 1,
      selectorText: ".u-container",
      style: {
        "padding-top": "0px",
        "padding-right": "1rem",
        "padding-bottom": "0px",
        "padding-left": "1rem",
      },
      specialProps: {},
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 375,
      cssRules: [],
    } as MediaRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".u-container",
          style: {
            "padding-top": "0px",
            "padding-right": "2.4375rem",
            "padding-bottom": "0px",
            "padding-left": "2.4375rem",
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
          selectorText: ".u-container",
          style: {
            "padding-top": "0px",
            "padding-right": "10.3125rem",
            "padding-bottom": "0px",
            "padding-left": "10.3125rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneGlobal };
