import {
  EngineUpdateMaster,
  EngineUpdateMasterFlow,
} from "../../../../../engine/updater/index.types";
import { docStruct550 } from "./docStruct550";
import { docStruct1000 } from "./docStruct1000";
import { docStruct375 } from "./docStruct375";

const master: EngineUpdateMaster = {
  index: 1,
  step: 0,
  coreDocStruct: docStruct550,
  coreDocStructWindowWidth: 550,
  coreDocStructRange: 0,
};

const userFlowMaster: EngineUpdateMasterFlow = {
  index: 1,
  steps: [
    {
      step: 0,
      index: 1,
      coreDocStruct: docStruct550,
      coreDocStructWindowWidth: 550,
      coreDocStructRange: 0,
    },
    {
      step: 1,
      index: 1,
      coreDocStruct: docStruct1000,
      coreDocStructWindowWidth: 1000,
      coreDocStructRange: 1,
    },
    {
      step: 2,
      index: 1,
      coreDocStruct: docStruct375,
      coreDocStructWindowWidth: 375,
      coreDocStructRange: 0,
    },
  ],
};

export { master, userFlowMaster };
