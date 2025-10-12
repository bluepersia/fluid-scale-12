import { AssertionBlueprintForFunc } from "gold-sight";
import {
  FluidData,
  RuleBatch,
} from "../../../src/parsing/parser/docParser.types";
import { DocumentClone } from "../../../src/parsing/serialization/docSerializer.types";
import { Master } from "../../golden-master/index.types";
import { State } from "./gold-sight";
import { parseProperty } from "../../../src/parsing/parser/fluidDataPatcher";

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

type ParsePropertyAssertionBlueprint = AssertionBlueprintForFunc<
  State,
  typeof parseProperty
>;

export {
  ParseDocMaster,
  AssertChildFluidInsertionsContext,
  ParsePropertyAssertionBlueprint,
};
