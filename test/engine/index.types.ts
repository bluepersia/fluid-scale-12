import { FluidProperty } from "../../src/engine/index.types";
import { Master } from "../golden-master/index.types";
import { ParseDocMaster } from "../parsing/parser/index.types";
import { SerializeDocMaster } from "../parsing/serialization/index.types";

type RuntimeGoldenDoc = {
  [goldenId: string]: {
    anchor: string;
    selector: string;
    fluidProperties: FluidProperty[];
  };
};

type RuntimeGoldenDocFlat = {
  [goldenId: string]: FluidProperty[];
};

type EngineMaster = Master & {
  serializeDocMaster: SerializeDocMaster;
  parseDocMaster: ParseDocMaster;
  docStructure: RuntimeGoldenDoc;
};

export type { RuntimeGoldenDoc, EngineMaster, RuntimeGoldenDocFlat };
