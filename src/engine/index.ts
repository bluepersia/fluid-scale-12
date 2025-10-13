import { FluidData } from "../parsing/parser/docParser.types";
import {
  AddElementsContext,
  ElementState,
  FluidProperty,
  GlobalState,
  InsertFluidPropertiesForAnchorContext,
} from "./index.types";

let state: GlobalState = newState();

function getState(): GlobalState {
  return { ...state };
}

function newState(): GlobalState {
  return {
    breakpoints: [],
    fluidData: {},
    allEls: new Map(),
  };
}

function resetState() {
  state = newState();
}

function initEngineState(breakpoints: number[], fluidData: FluidData) {
  state.breakpoints = breakpoints;
  state.fluidData = fluidData;
}

function addElementsToState(els: ElementState[]) {
  const { allEls } = getState();
  for (const el of els) {
    allEls.set(el.el, el);
  }
}

let addElements = (
  els: HTMLElement[],
  allEls: Map<HTMLElement, ElementState>,
  ctx: AddElementsContext
): ElementState[] => {
  const toAddEls: ElementState[] = [];

  for (const el of els) {
    if (allEls.has(el)) continue;

    const elState: ElementState = { el, fluidProperties: [] };
    const fluidProperties: FluidProperty[] = elState.fluidProperties;
    for (const klass of el.classList) {
      fluidProperties.push(
        ...insertFluidPropertiesForAnchor(`.${klass}`, el, ctx)
      );
    }

    const id = el.id;

    if (id)
      fluidProperties.push(
        ...insertFluidPropertiesForAnchor(`#${id}`, el, ctx)
      );

    const tag = el.tagName.toLowerCase();
    fluidProperties.push(...insertFluidPropertiesForAnchor(tag, el, ctx));

    if (fluidProperties.length <= 0) continue;

    toAddEls.push(elState);
  }
  return toAddEls;
};

let insertFluidPropertiesForAnchor = (
  anchor: string,
  el: HTMLElement,
  ctx: InsertFluidPropertiesForAnchorContext
): FluidProperty[] => {
  const { fluidData, breakpoints } = ctx;

  const anchorData = fluidData[anchor];
  if (!anchorData) return [];

  const fluidProperties: FluidProperty[] = [];
  for (const [selector, selectorData] of Object.entries(anchorData)) {
    if (!el.matches(selector)) continue;

    for (const [, propertyData] of Object.entries(selectorData)) {
      const ranges = new Array(breakpoints.length).fill(null);
      for (const range of propertyData.ranges) {
        ranges[range.minBpIndex] = range;
      }

      const newFluidProperty = { metaData: propertyData.metaData, ranges };
      fluidProperties.push(newFluidProperty);
    }
  }

  return fluidProperties;
};

function wrap(
  addElementsWrapped: typeof addElements,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor
) {
  addElements = addElementsWrapped;
  insertFluidPropertiesForAnchor = insertFluidPropertiesForAnchorWrapped;
}

export {
  resetState,
  getState,
  initEngineState,
  addElements,
  addElementsToState,
  insertFluidPropertiesForAnchor,
  wrap,
};
