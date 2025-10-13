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
  SerializedElement,
  SerializedElementState,
} from "./index.types";
import {
  insertFluidPropertiesForAnchor,
  addElements as addElementsToEngine,
  getState,
} from "../../src/engine";
import init, { addElements, wrap } from "../../src";
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
import { convertToFlat, fillDocWithNullRanges } from "./masterController";

type State = {
  master?: EngineMaster;
};

function assertElementStateStructureToDocStructure(
  result: SerializedElementState[],
  state: State
) {
  const goldenStruct = parseGoldenStructFluidProperties(result);

  expect(goldenStruct).toEqual(convertToFlat(state.master!.docStructure));
}

const initAssertionChain: AssertionChain<State, [], SerializedElementState[]> =
  {
    "should initialize the engine": (state, args, result) => {
      assertElementStateStructureToDocStructure(result, state);
    },
  };

const addElementsAssertionChain: AssertionChain<
  State,
  [Node[]],
  SerializedElementState[]
> = {
  "should add elements to the engine (index)": (state, args, result) => {
    assertElementStateStructureToDocStructure(result, state);
  },
};

const addElementsEngineAssertionChain: AssertionChain<
  State,
  [HTMLElement[], Map<HTMLElement, ElementState>, AddElementsContext],
  SerializedElementState[]
> = {
  "should add elements to the engine (engine)": (state, args, result) => {
    assertElementStateStructureToDocStructure(result, state);
  },
};

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

    expect(
      result,
      JSON.stringify({
        anchor,
      })
    ).toEqual(resultFluidProperties);
  },
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

  init = this.wrapTopFn(init, "init", {
    resultConverter: () => {
      const globalState = getState();
      const { allEls } = globalState;
      return Array.from(allEls.values()).map(serializeElementState);
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
      return Array.from(allEls.values()).map(serializeElementState);
    },
  });

  addElementsEngine = this.wrapFn(addElementsToEngine, "addElementsEngine", {
    resultConverter: (result) => {
      return result.map(serializeElementState);
    },
  });
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

export { engineAssertionMaster, wrapAll };
