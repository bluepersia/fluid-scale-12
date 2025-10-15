import {
  EngineUpdateMaster,
  EngineUpdateMasterFlow,
} from "../../../../../engine/updater/index.types";
import {
  docStruct400,
  docStruct375,
  docStruct600,
  docStruct800,
  docStruct200,
  docStruct500,
} from "./docStruct";
const master: EngineUpdateMaster = {
  index: 0,
  coreDocStruct: docStruct400,
  coreDocStructWindowWidth: 400,
  coreDocStructRange: 0,
};

const userFlowMaster: EngineUpdateMasterFlow = {
  index: 0,
  steps: [
    {
      step: 0,
      index: 0,
      coreDocStruct: docStruct400,
      coreDocStructWindowWidth: 400,
      coreDocStructRange: 0,
    },
    {
      step: 1,
      index: 0,
      coreDocStruct: docStruct375,
      coreDocStructWindowWidth: 375,
      coreDocStructRange: 0,
    },
    {
      step: 2,
      index: 0,
      coreDocStruct: docStruct500,
      coreDocStructWindowWidth: 500,
      coreDocStructRange: 0,
    },
    {
      step: 3,
      index: 0,
      coreDocStruct: docStruct600,
      coreDocStructWindowWidth: 600,
      coreDocStructRange: 0,
    },
    {
      step: 4,
      index: 0,
      coreDocStruct: docStruct800,
      coreDocStructWindowWidth: 800,
      coreDocStructRange: 0,
    },
    {
      step: 5,
      index: 0,
      coreDocStruct: docStruct200,
      coreDocStructWindowWidth: 200,
      coreDocStructRange: 0,
    },
  ],
};

export { master, userFlowMaster };
