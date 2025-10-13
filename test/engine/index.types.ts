import { FluidPropertyData } from "../../src/parsing/parser/docParser.types";

type RuntimeGoldenDoc = {
  [goldenId: string]: FluidPropertyData[];
};

export type { RuntimeGoldenDoc };
