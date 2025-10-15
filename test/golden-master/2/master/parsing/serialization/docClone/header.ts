import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docCloneHeader: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".header",
      style: {
        "padding-top": "1rem",
      },
      specialProps: {
        "--force": "padding-top",
      },
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".header",
          style: {
            "padding-top": "1.5rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneHeader };
