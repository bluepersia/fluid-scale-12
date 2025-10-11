import { RuleBatch } from "../../../src/parsing/parser/parser.types";
import { DocumentClone } from "../../../src/parsing/serialization/serializer.types";
import { Master } from "../../golden-master/index.types";

type ParseDocMaster = Master & {
  breakpoints: number[];
  baselineWidths: number[];
  inputDoc: DocumentClone;
  ruleBatches: RuleBatch[][];
};

export { ParseDocMaster };
