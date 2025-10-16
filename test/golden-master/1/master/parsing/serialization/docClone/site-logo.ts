import {
  MediaRuleClone,
  StyleRuleClone,
  StyleSheetClone,
} from "../../../../../../../src/parsing/serialization/docSerializer.types";

const docCloneSiteLogo: StyleSheetClone = {
  cssRules: [
    {
      type: 1,
      selectorText: ".site-logo",
      style: {
        width: "5.5625rem",
      },
      specialProps: {
        "--span-start": "width",
      },
    } as StyleRuleClone,
    {
      type: 4,
      minWidth: 768,
      cssRules: [
        {
          type: 1,
          selectorText: ".site-logo",
          style: {},
          specialProps: {
            "--span-end": "width",
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
          selectorText: ".site-logo",
          style: {
            width: "7.125rem",
          },
          specialProps: {},
        } as StyleRuleClone,
      ],
    } as MediaRuleClone,
  ],
};

export { docCloneSiteLogo };
