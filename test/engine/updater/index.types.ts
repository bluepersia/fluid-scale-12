import { Master, MasterStep } from "../../golden-master/index.types";

type UpdateDocStruc = {
  [goldenId: string]: {
    [property: string]: {
      conversions: {
        [conversionId: string]: number;
      };
      computedValues: {
        min: [[number]];
        max: [[number]];
        actual: [[number]];
        actualOrderID: number;
      };
    };
  };
};

type EngineUpdateMaster = Master & {
  coreDocStruct: UpdateDocStruc;
  coreDocStructWindowWidth: number;
  coreDocStructRange: number;
};

type EngineUpdateMasterFlow = Master & {
  steps: (EngineUpdateMaster & { step: number })[];
};

export { EngineUpdateMaster, UpdateDocStruc, EngineUpdateMasterFlow };
