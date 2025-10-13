import AssertionMaster, { AssertionChainForFunc } from "gold-sight";
import { EngineMaster } from "./index.types";
import {
  insertFluidPropertiesForAnchor,
  addElements as addElementsToEngine,
} from "../../src/engine";
import init, { addElements, wrap } from "../../src";

type State = {
  master?: EngineMaster;
};

const initAssertionChain: AssertionChainForFunc<State, typeof init> = {
  "should initialize the engine": (state, args, result) => {},
};

const addElementsAssertionChain: AssertionChainForFunc<
  State,
  typeof addElements
> = {
  "should add elements to the engine": (state, args, result) => {},
};

const addElementsEngineAssertionChain: AssertionChainForFunc<
  State,
  typeof addElementsToEngine
> = {
  "should add elements to the engine": (state, args, result) => {},
};

const insertFluidPropertiesForAnchorAssertionChain: AssertionChainForFunc<
  State,
  typeof insertFluidPropertiesForAnchor
> = {
  "should insert fluid properties for anchor": (state, args, result) => {},
};

const defaultAssertions = {
  init: initAssertionChain,
  insertFluidPropertiesForAnchor: insertFluidPropertiesForAnchorAssertionChain,
  addElements: addElementsAssertionChain,
  addElementsEngine: addElementsEngineAssertionChain,
};

class EngineAssertionMaster extends AssertionMaster<State, EngineMaster> {
  constructor() {
    super(defaultAssertions, "engine");
  }

  newState(): State {
    return {};
  }

  init = this.wrapTopFn(init, "init");

  insertFluidPropertiesForAnchor = this.wrapFn(
    insertFluidPropertiesForAnchor,
    "insertFluidPropertiesForAnchor"
  );

  addElements = this.wrapFn(addElements, "addElements");

  addElementsEngine = this.wrapFn(addElementsToEngine, "addElementsEngine");
}

const engineAssertionMaster = new EngineAssertionMaster();

function wrapAll() {
  wrap(
    engineAssertionMaster.addElements,
    engineAssertionMaster.init,
    engineAssertionMaster.addElementsEngine,
    engineAssertionMaster.insertFluidPropertiesForAnchor
  );
}

export { EngineAssertionMaster, wrapAll };
