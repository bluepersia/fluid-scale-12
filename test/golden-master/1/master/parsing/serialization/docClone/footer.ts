import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docCloneFooter: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".footer",
      style: {
        "padding-top": "1rem",
        "padding-bottom": "1rem",
      },
      specialProps: {
        "--force": "padding-top, padding-bottom",
      },
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".footer",
          style: {
            "padding-top": "2.25rem",
            "padding-bottom": "2.25rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneFooter };
