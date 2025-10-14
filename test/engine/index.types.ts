import { FluidProperty } from "../../src/engine/index.types";
import { Master } from "../golden-master/index.types";
import { ParseDocMaster } from "../parsing/parser/index.types";
import { SerializeDocMaster } from "../parsing/serialization/index.types";

type RuntimeGoldenDoc = {
  [goldenId: string]: {
    [anchor: string]: {
      [selector: string]: FluidProperty[];
    };
  };
};

type RuntimeGoldenDocFlat = {
  [goldenId: string]: FluidProperty[];
};

type EngineMaster = Master & {
  serializeDocMaster: SerializeDocMaster;
  parseDocMaster: ParseDocMaster;
  docStructure: RuntimeGoldenDoc;
  breakpointsLength: number;
};

type SerializedElement = {
  goldenId: string;
};

type SerializedElementState = {
  el: SerializedElement;
  fluidProperties: FluidProperty[];
  inlineStyles: Record<string, string>;
  computedStyles: Record<string, string>;
};

export type {
  RuntimeGoldenDoc,
  EngineMaster,
  RuntimeGoldenDocFlat,
  SerializedElement,
  SerializedElementState,
};
