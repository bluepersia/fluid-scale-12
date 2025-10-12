import {
  FluidData,
  RuleBatch,
} from "../../../src/parsing/parser/docParser.types";
import { DocumentClone } from "../../../src/parsing/serialization/docSerializer.types";
import { Master } from "../../golden-master/index.types";

type ParseDocMaster = Master & {
  breakpoints: number[];
  baselineWidths: number[];
  inputDoc: DocumentClone;
  ruleBatches: RuleBatch[][];
  fluidData: FluidData;
};

export { ParseDocMaster };
