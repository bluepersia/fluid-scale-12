let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}
import AssertionMaster, {
  AssertionChain,
  AssertionChainForFunc,
} from "gold-sight";
import {
  EngineMaster,
  RuntimeGoldenDoc,
  RuntimeGoldenDocFlat,
  SerializedElement,
  SerializedElementState,
} from "./index.types";
import {
  insertFluidPropertiesForAnchor,
  addElements as addElementsToEngine,
  assignParentEls,
} from "../../src/engine/engineSetup";
import { getState } from "../../src/engine/engineState";
import init, { addElements, loadParseDocResults, wrap } from "../../src";
import {
  AddElementsContext,
  ElementState,
  FluidProperty,
  InsertFluidPropertiesForAnchorContext,
} from "../../src/engine/index.types";
import {
  parseGoldenStructFluidProperties,
  serializeElement,
  serializeElementState,
} from "./serialization";
import { convertToFlat } from "./masterController";

type State = {
  master?: EngineMaster;
};

function assertElementStateStructureToDocStructure(
  result: SerializedElementState[],
  state: State
) {
  const actualStruct = parseGoldenStructFluidProperties(result);
  const masterStruct = convertToFlat(state.master!.docStructure);

  expect(sortDocStructure(actualStruct)).toEqual(
    sortDocStructure(masterStruct)
  );
}

function sortDocStructure(
  docStructure: RuntimeGoldenDocFlat
): RuntimeGoldenDocFlat {
  const sortedDocStructure: RuntimeGoldenDocFlat = {};
  for (const [goldenId, fluidProperties] of Object.entries(docStructure)) {
    sortedDocStructure[goldenId] = sortFluidProperties(fluidProperties);
  }
  return sortedDocStructure;
}

const initAssertionChain: AssertionChain<
  State,
  [],
  {
    docStructure: SerializedElementState[];
    elsObserving: string[];
  }
> = {
  "should initialize the engine": (state, args, result) => {
    assertElementStateStructureToDocStructure(result.docStructure, state);

    expect(result.elsObserving).toEqual(
      Object.keys(state.master!.docStructure)
    );
    return true;
  },
};

const addElementsAssertionChain: AssertionChain<
  State,
  [Node[]],
  {
    docStructure: SerializedElementState[];
    elsObserving: string[];
  }
> = {
  "should add elements to the engine (index)": (state, args, result) => {
    assertElementStateStructureToDocStructure(result.docStructure, state);

    expect(result.elsObserving).toEqual(
      Object.keys(state.master!.docStructure)
    );
    return true;
  },
};

const addElementsEngineAssertionChain: AssertionChain<
  State,
  [HTMLElement[], Map<HTMLElement, ElementState>, AddElementsContext],
  SerializedElementState[]
> = {
  "should add elements to the engine (engine)": (state, args, result) => {
    assertElementStateStructureToDocStructure(result, state);
    return true;
  },
};

function sortFluidProperties(
  fluidProperties: FluidProperty[]
): FluidProperty[] {
  // Sort by orderID first, then by property name to ensure consistent ordering
  return fluidProperties.sort((a, b) => {
    const orderDiff = a.metaData.orderID - b.metaData.orderID;
    if (orderDiff !== 0) return orderDiff;
    // If orderID is the same, sort by property name alphabetically
    return a.metaData.property.localeCompare(b.metaData.property);
  });
}

const insertFluidPropertiesForAnchorAssertionChain: AssertionChain<
  State,
  [string, SerializedElement, InsertFluidPropertiesForAnchorContext, string[]],
  FluidProperty[]
> = {
  "should insert fluid properties for anchor": (state, args, result) => {
    const [anchor, el, ctx, matchingSelectors] = args;

    const goldenId = el.goldenId;

    const goldenFluidProperties = state.master!.docStructure[goldenId];

    if (!goldenFluidProperties) {
      expect(result).toEqual([]);
      return;
    }

    const { fluidData } = ctx;

    if (!fluidData[anchor]) {
      expect(result).toEqual([]);
      return;
    }

    const resultFluidProperties: FluidProperty[] = [];
    for (const [selector, propertyData] of Object.entries(fluidData[anchor])) {
      if (!matchingSelectors.includes(selector)) {
        continue;
      }
      resultFluidProperties.push(...goldenFluidProperties[anchor][selector]);
    }

    expect(sortFluidProperties(result)).toEqual(
      sortFluidProperties(resultFluidProperties)
    );
    return true;
  },
};

const assignParentElsAssertionChain: AssertionChain<
  State,
  [],
  {
    parentGoldenIdVanilla: string;
    parentGoldenIdState: string;
  }[]
> = {
  "should assign parent els": (state, args, result) => {
    for (const { parentGoldenIdVanilla, parentGoldenIdState } of result) {
      expect(parentGoldenIdVanilla).toEqual(parentGoldenIdState);
    }
  },
};

const loadParseDocResultsAssertionChain: AssertionChainForFunc<
  State,
  typeof loadParseDocResults
> = {
  "should load parse doc results": async (state, args, result) => {
    const { breakpoints, fluidData } = await result;
    expect(fluidData).toEqual(state.master!.parseDocMaster.fluidData);
    expect(breakpoints).toEqual(state.master!.parseDocMaster.breakpoints);

    return true;
  },
};

const defaultAssertions = {
  init: initAssertionChain,
  insertFluidPropertiesForAnchor: insertFluidPropertiesForAnchorAssertionChain,
  addElements: addElementsAssertionChain,
  addElementsEngine: addElementsEngineAssertionChain,
  assignParentEls: assignParentElsAssertionChain,
  loadParseDocResults: loadParseDocResultsAssertionChain,
};

class EngineAssertionMaster extends AssertionMaster<State, EngineMaster> {
  constructor() {
    super(defaultAssertions, "engine");
  }

  newState(): State {
    return {};
  }

  init = this.wrapTopFn(init, "init", {
    resultConverter: () => {
      const globalState = getState();
      const { allEls } = globalState;
      return {
        docStructure: Array.from(allEls.values()).map(serializeElementState),
        elsObserving: Array.from(globalState.elsObserving).map(
          (el) => el.dataset.goldenId
        ),
      };
    },
  });

  insertFluidPropertiesForAnchor = this.wrapFn(
    insertFluidPropertiesForAnchor,
    "insertFluidPropertiesForAnchor",
    {
      argsConverter: (args) => {
        const [anchor, el, ctx] = args;
        const anchorData = ctx.fluidData[anchor];

        const matchingSelectors: string[] = [];

        if (anchorData) {
          for (const [selector, propertyData] of Object.entries(anchorData)) {
            if (el.matches(selector)) {
              matchingSelectors.push(selector);
            }
          }
        }
        return [anchor, serializeElement(el), ctx, matchingSelectors];
      },
    }
  );

  addElements = this.wrapFn(addElements, "addElements", {
    resultConverter: () => {
      const globalState = getState();
      const { allEls } = globalState;
      return {
        docStructure: Array.from(allEls.values()).map(serializeElementState),
        elsObserving: Array.from(globalState.elsObserving).map(
          (el) => el.dataset.goldenId
        ),
      };
    },
  });

  addElementsEngine = this.wrapFn(addElementsToEngine, "addElementsEngine", {
    resultConverter: (result) => {
      return result.map(serializeElementState);
    },
  });

  assignParentEls = this.wrapFn(assignParentEls, "assignParentEls", {
    resultConverter: () => {
      const globalState = getState();
      const { allEls } = globalState;
      return Array.from(allEls.values()).map((elState) => {
        const parentGlobalEl = elState.el.parentElement
          ? allEls.get(elState.el.parentElement)
          : undefined;
        return {
          parentGoldenIdVanilla: parentGlobalEl
            ? elState.el.parentElement?.dataset.goldenId
            : undefined,
          parentGoldenIdState: parentGlobalEl
            ? elState.parentEl?.el.dataset.goldenId
            : undefined,
        };
      });
    },
  });

  loadParseDocResults = this.wrapFn(loadParseDocResults, "loadParseDocResults");
}

const engineAssertionMaster = new EngineAssertionMaster();

function wrapAll() {
  wrap(
    engineAssertionMaster.addElements,
    engineAssertionMaster.init,
    engineAssertionMaster.addElementsEngine,
    engineAssertionMaster.insertFluidPropertiesForAnchor,
    engineAssertionMaster.assignParentEls,
    engineAssertionMaster.loadParseDocResults
  );
}

export { engineAssertionMaster, wrapAll };
