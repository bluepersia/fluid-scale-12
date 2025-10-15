import { SerializedElement, SerializedElementState } from "./index.types";

function serializeElement(el: HTMLElement): SerializedElement {
  return {
    goldenId: el.dataset.goldenId as string,
  };
}

function serializeElementState(elWState: ElementState): SerializedElementState {
  const currentInlineStyles = elWState.el.style;
  const currentComputedStyles = getComputedStyle(elWState.el);
  const inlineStylesRecord: Record<string, string> = {};
  const computedStylesRecord: Record<string, string> = {};
  for (let i = 0; i < currentInlineStyles.length; i++) {
    const prop = currentInlineStyles[i];
    const value = currentInlineStyles.getPropertyValue(prop);
    if (value) {
      inlineStylesRecord[prop] = value;
      computedStylesRecord[prop] = currentComputedStyles.getPropertyValue(prop);
    }
  }
  return {
    el: serializeElement(elWState.el),
    fluidProperties: elWState.fluidProperties,
    inlineStyles: inlineStylesRecord,
    computedStyles: computedStylesRecord,
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
