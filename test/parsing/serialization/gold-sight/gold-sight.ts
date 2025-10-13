import AssertionMaster from "gold-sight";
import { SerializeDocMaster } from "../index.types";
import defaultAssertions from "./assertions";
import {
  applyExplicitPropsFromShorthand,
  serializeFluidProp,
  serializeStyleProp,
  serializeStyleProps,
  getAccessibleStyleSheets,
  serializeDocument,
  serializeMediaRule,
  serializeRule,
  serializeRules,
  serializeStyleRule,
  serializeStyleSheet,
  serializeStyleSheets,
  wrap,
} from "../../../../src/parsing/serialization/docSerializer";

export type State = {
  sheetIndex: number;
  ruleIndex: number;
  rulesIndex: number;
  styleRuleIndex: number;
  mediaRuleIndex: number;
  master?: SerializeDocMaster;
};

class SerializeDocAssertionMaster extends AssertionMaster<
  State,
  SerializeDocMaster
> {
  constructor() {
    super(defaultAssertions, "serializeDoc");
  }
  newState(): State {
    return {
      sheetIndex: 0,
      ruleIndex: 0,
      rulesIndex: 0,
      styleRuleIndex: 0,
      mediaRuleIndex: 0,
    };
  }

  serializeDocument = this.wrapTopFn(serializeDocument, "serializeDocument");

  getAccessibleStyleSheets = this.wrapFn(
    getAccessibleStyleSheets,
    "getAccessibleStyleSheets"
  );

  serializeStyleSheets = this.wrapFn(
    serializeStyleSheets,
    "serializeStyleSheets"
  );

  serializeStyleSheet = this.wrapFn(
    serializeStyleSheet,
    "serializeStyleSheet",
    {
      post: (state) => {
        state.sheetIndex++;
      },
    }
  );

  serializeRules = this.wrapFn(serializeRules, "serializeRules", {
    post: (state) => {
      state.rulesIndex++;
    },
  });

  serializeRule = this.wrapFn(serializeRule, "serializeRule", {
    post: (state) => {
      state.ruleIndex++;
    },
  });

  serializeStyleRule = this.wrapFn(serializeStyleRule, "serializeStyleRule", {
    post: (state) => {
      state.styleRuleIndex++;
    },
  });

  serializeMediaRule = this.wrapFn(serializeMediaRule, "serializeMediaRule", {
    post: (state) => {
      state.mediaRuleIndex++;
    },
  });

  cloneStyleProps = this.wrapFn(serializeStyleProps, "serializeStyleProps");

  cloneStyleProp = this.wrapFn(serializeStyleProp, "serializeStyleProp");

  cloneFluidProp = this.wrapFn(serializeFluidProp, "serializeFluidProp");

  applyExplicitPropsFromShorthand = this.wrapFn(
    applyExplicitPropsFromShorthand,
    "applyExplicitPropsFromShorthand"
  );
}

const serializeDocAssertionMaster = new SerializeDocAssertionMaster();

function wrapAll() {
  wrap(
    serializeDocAssertionMaster.serializeDocument,
    serializeDocAssertionMaster.getAccessibleStyleSheets,
    serializeDocAssertionMaster.serializeStyleSheet,
    serializeDocAssertionMaster.serializeStyleSheets,
    serializeDocAssertionMaster.serializeRules,
    serializeDocAssertionMaster.serializeRule,
    serializeDocAssertionMaster.serializeStyleRule,
    serializeDocAssertionMaster.serializeMediaRule,
    serializeDocAssertionMaster.cloneStyleProps,
    serializeDocAssertionMaster.cloneStyleProp,
    serializeDocAssertionMaster.cloneFluidProp,
    serializeDocAssertionMaster.applyExplicitPropsFromShorthand
  );
}

export { serializeDocAssertionMaster, wrapAll };
