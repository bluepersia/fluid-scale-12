import { FluidData } from "../parsing/parser/docParser.types";
import {
  AddElementsContext,
  ElementState,
  FluidProperty,
  FluidPropertyState,
  GlobalState,
  InsertFluidPropertiesForAnchorContext,
} from "./index.types";

const intersectionObserver = new IntersectionObserver(handleIntersection);

function handleIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries.filter(
    (entry) => entry.target instanceof HTMLElement
  )) {
    const el = entry.target as HTMLElement;
    const elState = getState().allEls.get(el);
    if (!elState) continue;
    if (entry.isIntersecting) {
      addVisibleElement(elState);
      removeHiddenElement(elState);
      elState.isVisible = true;
    } else {
      addHiddenElement(elState);
      removeVisibleElement(elState);
      elState.isVisible = false;
    }
  }
}

function observeElements(els: HTMLElement[]) {
  for (const el of els) {
    state.elsObserving.add(el);
    intersectionObserver.observe(el);
  }
}

let state: GlobalState = newState();

function getState(): GlobalState {
  return { ...state };
}

function newState(): GlobalState {
  return {
    breakpoints: [],
    fluidData: {},
    allEls: new Map(),
    visibleEls: new Set(),
    pendingHiddenEls: new Set(),
    elsObserving: new Set(),
    windowWidth: 0,
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

function addVisibleElement(elState: ElementState) {
  state.visibleEls.add(elState);
}

function addHiddenElement(elState: ElementState) {
  state.pendingHiddenEls.add(elState);
}

function removeVisibleElement(elState: ElementState) {
  state.visibleEls.delete(elState);
}

function removeHiddenElement(elState: ElementState) {
  state.pendingHiddenEls.delete(elState);
}

function removeElement(elState: ElementState) {
  state.allEls.delete(elState.el);
  state.visibleEls.delete(elState);
  state.pendingHiddenEls.delete(elState);
  state.elsObserving.delete(elState.el);
  intersectionObserver.unobserve(elState.el);
}

function updateWindowWidth() {
  state.windowWidth = window.innerWidth;
}

const insertFluidPropertiesForAnchorRouter = [
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    const classes = el.classList;
    const fluidProperties: FluidProperty[] = [];
    for (const className of classes) {
      fluidProperties.push(
        ...insertFluidPropertiesForAnchor(`.${className}`, el, ctx)
      );
    }
    return fluidProperties;
  },
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    if (!el.id) return [];
    return insertFluidPropertiesForAnchor(`#${el.id}`, el, ctx);
  },
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    return insertFluidPropertiesForAnchor(el.tagName.toLowerCase(), el, ctx);
  },
];

let addElements = (
  els: HTMLElement[],
  allEls: Map<HTMLElement, ElementState>,
  ctx: AddElementsContext
): ElementState[] => {
  const toAddEls: ElementState[] = [];

  for (const el of els) {
    if (allEls.has(el)) continue;

    const elState: ElementState = {
      el,
      fluidProperties: [],
      isVisible: false,
      parentEl: undefined,
    };
    const fluidProperties: FluidProperty[] = elState.fluidProperties;

    for (const anchorRoute of insertFluidPropertiesForAnchorRouter) {
      fluidProperties.push(...anchorRoute(el, ctx));
    }

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

let assignParentEls = () => {
  const { allEls } = getState();
  for (const elState of allEls.values()) {
    const { el } = elState;
    const parentEl = el.parentElement;
    if (parentEl) {
      elState.parentEl = allEls.get(parentEl);
    }
  }
};

let update = () => {
  updateWindowWidth();
  const { visibleEls, pendingHiddenEls } = getState();

  //Flush pending elements
  for (const elState of pendingHiddenEls) {
    updateElement(elState);
  }

  //Update visible elements
  for (const elState of visibleEls) {
    updateElement(elState);
  }
};

update = update;

function updateElement(elState: ElementState) {
  const { el } = elState;

  if (!el.isConnected) {
    removeElement(elState);
    return;
  }

  const { fluidProperties } = elState;
  const stateUpdates: Map<string, FluidPropertyState> = new Map();
  for (const fluidProperty of fluidProperties) {
    const { property, orderID } = fluidProperty.metaData;
    if (!stateUpdates.has(property)) {
      stateUpdates.set(property, {
        property,
        value: "",
        orderID,
      });
    }
    const stateUpdate: FluidPropertyState | undefined = updateFluidProperty(
      fluidProperty,
      stateUpdates.get(property)
    );
    if (stateUpdate) {
      stateUpdates.set(property, stateUpdate);
    }
  }

  for (const [property, stateUpdate] of stateUpdates) {
    el.style.setProperty(property, stateUpdate.value);
  }
}

function updateFluidProperty(
  fluidProperty: FluidProperty,
  currentPropertyState: FluidPropertyState | undefined
): FluidPropertyState | undefined {
  if (
    currentPropertyState &&
    fluidProperty.metaData.orderID < currentPropertyState.orderID
  )
    return;
}

function wrap(
  addElementsWrapped: typeof addElements,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor,
  assignParentElsWrapped: typeof assignParentEls
) {
  addElements = addElementsWrapped;
  insertFluidPropertiesForAnchor = insertFluidPropertiesForAnchorWrapped;
  assignParentEls = assignParentElsWrapped;
}

export {
  resetState,
  getState,
  initEngineState,
  addElements,
  addElementsToState,
  insertFluidPropertiesForAnchor,
  wrap,
  observeElements,
  handleIntersection,
  updateWindowWidth,
  assignParentEls,
};
