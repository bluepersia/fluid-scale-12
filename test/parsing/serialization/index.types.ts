import {
  DocumentClone,
  RuleClone,
} from "../../../src/parsing/serialization/serializer.types";
import { Master } from "../../golden-master/0/master/index.types";

type NullRule = RuleClone & {
  null: true;
};

type SerializeDocMaster = Master & {
  docClone: DocumentClone;
};

export { SerializeDocMaster, NullRule };
