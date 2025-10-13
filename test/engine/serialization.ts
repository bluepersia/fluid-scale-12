import { SerializedElement, SerializedElementState } from "./index.types";

function serializeElement(el: HTMLElement): SerializedElement {
  return {
    goldenId: el.dataset.goldenId as string,
  };
}

function serializeElementState(elWState: ElementState): SerializedElementState {
  return {
    el: serializeElement(elWState.el),
    fluidProperties: elWState.fluidProperties,
  };
}

import { RuntimeGoldenDoc, RuntimeGoldenDocFlat } from "../engine/index.types";
import { ElementState } from "../../src/engine/index.types";

function parseGoldenStructFluidProperties(elWStates: SerializedElementState[]) {
  const goldenStruct: RuntimeGoldenDocFlat = {};

  for (const elWState of elWStates) {
    const goldenId = elWState.el.goldenId;
    if (goldenId) {
      goldenStruct[goldenId] = elWState.fluidProperties;
    }
  }

  return goldenStruct;
}

export {
  serializeElement,
  parseGoldenStructFluidProperties,
  serializeElementState,
};
