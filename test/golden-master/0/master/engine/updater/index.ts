import {
  EngineUpdateMaster,
  EngineUpdateMasterFlow,
} from "../../../../../engine/updater/index.types";
import { docStruct400, docStruct375 } from "./docStruct";
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
  ],
};

export { master, userFlowMaster };
