import {
  FluidData,
  FluidPropertyData,
} from "../../../../../../../src/parsing/parser/docParser.types";

function applyProperty(
  fluidData: FluidData,
  anchor: string,
  selector: string,
  property: string,
  value: FluidPropertyData
) {
  if (!fluidData[anchor]) fluidData[anchor] = {};
  if (!fluidData[anchor][selector]) fluidData[anchor][selector] = {};
  fluidData[anchor][selector][property] = value;
}

export { applyProperty };