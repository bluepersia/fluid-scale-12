import {
  DocumentClone,
  RuleClone,
  StyleRuleClone,
} from "../../../src/parsing/serialization/serializer.types";
import { Master } from "../../golden-master/index.types";

type NullRule = RuleClone & {
  null: true;
};

type SerializeDocMaster = Master & {
  docClone: DocumentClone;
};

type AssertFluidPropContext = {
  isBrowser: boolean;
  style: Record<string, string>;
  styleArg: Record<string, string>;
  masterRule: StyleRuleClone | undefined;
};

export { SerializeDocMaster, NullRule, AssertFluidPropContext };
