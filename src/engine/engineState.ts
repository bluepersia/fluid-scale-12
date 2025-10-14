import { FluidData } from "../parsing/parser/docParser.types";
import { intersectionObserver } from "./engineSetup";
import { ElementState, GlobalState } from "./index.types";

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
    interObserverIsInitialized: false,
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

function observeElements(els: HTMLElement[]) {
  for (const el of els) {
    state.elsObserving.add(el);
    intersectionObserver.observe(el);
  }
}

function setInterObserverIsInitialized() {
  state.interObserverIsInitialized = true;
}

export {
  getState,
  newState,
  resetState,
  initEngineState,
  addElementsToState,
  addVisibleElement,
  addHiddenElement,
  removeVisibleElement,
  removeHiddenElement,
  removeElement,
  updateWindowWidth,
  observeElements,
  setInterObserverIsInitialized,
};
