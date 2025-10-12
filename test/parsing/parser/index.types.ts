import {
  FluidData,
  RuleBatch,
} from "../../../src/parsing/parser/docParser.types";
import { DocumentClone } from "../../../src/parsing/serialization/docSerializer.types";
import { Master } from "../../golden-master/index.types";
import { State } from "./gold-sight";

type ParseDocMaster = Master & {
  breakpoints: number[];
  baselineWidths: number[];
  inputDoc: DocumentClone;
  ruleBatches: RuleBatch[][];
  fluidData: FluidData;
};

type AssertChildFluidInsertionsContext = {
  result: FluidData;
  state: State;
  prevFluidData: FluidData;
};

export { ParseDocMaster, AssertChildFluidInsertionsContext };
