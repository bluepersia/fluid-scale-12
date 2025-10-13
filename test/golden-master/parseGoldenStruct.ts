import { RuntimeGoldenDoc, RuntimeGoldenDocFlat } from "../engine/index.types";
import { ElementState } from "../../src/engine/index.types";

function parseGoldenStructFluidProperties(elWStates: ElementState[]) {
  const goldenStruct: RuntimeGoldenDocFlat = {};

  for (const elWState of elWStates) {
    const goldenId = elWState.el.getAttribute("data-golden-id");
    if (goldenId) {
      goldenStruct[goldenId] = elWState.fluidProperties;
    }
  }

  return goldenStruct;
}

export { parseGoldenStructFluidProperties };
