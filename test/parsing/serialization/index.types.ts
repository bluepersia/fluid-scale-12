import {
  DocumentClone,
  RuleClone,
  StyleRuleClone,
} from "../../../src/parsing/serialization/docSerializer.types";
import { Master } from "../../golden-master/index.types";

type NullRule = RuleClone & {
  null: true;
};

type SerializeDocMaster = Master & {
  docClone: DocumentClone;
};

type AssertFluidPropContext = {
  rule: CSSStyleRule;
  isBrowser: boolean;
  style: Record<string, string>;
  styleArg: Record<string, string>;
  masterRule: StyleRuleClone | undefined;
};

type SerializedStyleRule = {
  type: 1;
  selectorText: string;
  style: Record<string, string>;
};

export {
  SerializeDocMaster,
  NullRule,
  AssertFluidPropContext,
  SerializedStyleRule,
};
