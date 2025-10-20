import { Master, MasterStep } from "../../golden-master/index.types";

type UpdateDocStruc = {
  [goldenId: string]: {
    [property: string]: {
      conversions: {
        [conversionId: string]: number;
      };
      computedValues: {
        actual: number[][];
        actualRaw?: number[][];
        actualOrderID: number;
      };
    };
  };
};

type EngineUpdateMaster = Master & {
  coreDocStruct: UpdateDocStruc;
  coreDocStructWindowWidth: number;
  coreDocStructRange: number;
  step: number;
};

type EngineUpdateMasterFlow = Master & {
  steps: EngineUpdateMaster[];
};

export { EngineUpdateMaster, UpdateDocStruc, EngineUpdateMasterFlow };
