import { Master } from "../../golden-master/index.types";

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
      };
    };
  };
};

type EngineUpdateMaster = Master & {
  updateDocStructure: UpdateDocStruc;
};

export { EngineUpdateMaster, UpdateDocStruc };
