let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import AssertionMaster, {
  AssertionBlueprint,
  AssertionChain,
  AssertionChainForFunc,
} from "gold-sight";
import { EngineUpdateMaster } from "./index.types";
import {
  computeFluidValue,
  computeValues,
  convertToPixels,
  flushElement,
  getCurrentRange,
  interpolateValues,
  update,
  updateElement,
  updateFluidProperties,
  updateFluidProperty,
  wrap,
} from "../../../src/engine/engineUpdater";
import { SerializedElementState } from "../index.types";
import {
  ConvertToPixelsContext,
  ElementState,
  FluidProperty,
  FluidPropertyState,
  UpdateElementContext,
  UpdateFluidPropertyContext,
} from "../../../src/engine/index.types";
import {
  FluidRange,
  FluidValue,
  FluidValueNumber,
  FluidValueSingle,
} from "../../../src/parsing/parser/docParser.types";
import { getState } from "../../../src/engine/engineState";
import { serializeElementState } from "../serialization";
import { C } from "vitest/dist/chunks/reporters.d.BFLkQcL6.js";

type State = {
  master?: EngineUpdateMaster;
};

function assertElementState(elState: SerializedElementState, state: State) {
  for (const [prop, value] of Object.entries(
    state.master!.coreDocStruct[elState.el.goldenId]
  )) {
    const actualValue = parseStyleValues(elState.computedStyles[prop]);
    const expectedValue = value.computedValues.actual;

    assertStyleValues(actualValue, expectedValue);
  }
}

function parseStyleValues(value: string) {
  if (!value) return [[NaN]];
  return value
    .split(",")
    .map((group) => group.split(" ").map((val) => parseFloat(val)));
}

function assertStyleValues(
  actual: number[][],
  expected: number[][],
  msg?: string
) {
  for (let i = 0; i < actual.length; i++) {
    for (let j = 0; j < actual[i].length; j++) {
      const actualValue = actual[i][j];
      const expectedValue = expected[i][j];

      if (isNaN(actualValue) || isNaN(expectedValue)) {
        expect(actualValue, msg).toBeNaN();
        expect(expectedValue, msg).toBeNaN();
      } else {
        expect(actual[i][j], msg).toBeCloseTo(expected[i][j], 1);
      }
    }
  }
}

const updateAssertionChain: AssertionChain<
  State,
  [],
  {
    visibleEls: SerializedElementState[];
    hiddenEls: SerializedElementState[];
  }
> = {
  "should update the document": (state, args, result) => {
    for (const elState of result.visibleEls) {
      assertElementState(elState, state);
    }

    for (const elState of result.hiddenEls) {
      for (const prop of Object.keys(elState.inlineStyles)) {
        expect(elState.inlineStyles[prop]).toBe("");
      }
    }
    return true;
  },
};

const updateElementAssertionChain: AssertionChain<
  State,
  [ElementState, UpdateElementContext],
  SerializedElementState
> = {
  "should update the element": (state, args, result) => {
    assertElementState(result, state);
    return true;
  },
};

const flushElementAssertionChain: AssertionChain<
  State,
  [ElementState],
  SerializedElementState
> = {
  "should flush the element": (state, args, result) => {
    for (const prop of Object.keys(result.inlineStyles)) {
      expect(result.inlineStyles[prop]).toBe("");
    }
    return true;
  },
};

const updateFluidPropertiesAssertionChain: AssertionChain<
  State,
  [ElementState, FluidProperty[], UpdateElementContext],
  [SerializedElementState, [string, FluidPropertyState][]]
> = {
  "should update the fluid properties": (state, args, result) => {
    const [elState, fluidPropertiesStateArr] = result;

    const fluidPropertiesState: Map<string, FluidPropertyState> = new Map(
      fluidPropertiesStateArr
    );

    const [, , ctx] = args;
    for (const [prop, value] of Object.entries(
      state.master!.coreDocStruct[elState.el.goldenId]
    )) {
      const actualValue = parseStyleValues(
        fluidPropertiesState.get(prop)!.value
      );
      const expectedValue = value.computedValues.actual;

      assertStyleValues(
        actualValue,
        expectedValue,
        JSON.stringify({
          prop,
          windowWidth: ctx.windowWidth,
        })
      );
    }
    return true;
  },
};

function findWinner(
  allAssertions: AssertionBlueprint<any, any, any>[],
  property: string,
  goldenId: string
) {
  const assertionsForGoldenElement = allAssertions.find((assertion) => {
    if (assertion.name !== "updateFluidProperties") return false;
    if (assertion.result[0].el.goldenId !== goldenId) return false;
    return true;
  });
  if (!assertionsForGoldenElement) return;
  const fluidPropertiesState: Map<string, FluidPropertyState> = new Map(
    assertionsForGoldenElement.result[1]
  );
  return fluidPropertiesState.get(property);
}

const updateFluidPropertyAssertionChain: AssertionChain<
  State,
  [FluidProperty, FluidPropertyState | undefined, UpdateFluidPropertyContext],
  [SerializedElementState, FluidPropertyState]
> = {
  "should update the fluid property": (state, args, result, allAssertions) => {
    const { property, orderID } = args[0].metaData;
    const [elState, fluidPropertyState] = result;

    if (!fluidPropertyState) return;

    const winner = findWinner(allAssertions, property, elState.el.goldenId);

    if (winner?.orderID !== orderID) return;

    const masterProp =
      state.master!.coreDocStruct[elState.el.goldenId][property];

    const actualValue = parseStyleValues(fluidPropertyState.value);

    assertStyleValues(actualValue, masterProp.computedValues.actual);
    return true;
  },
};

const computeValuesAssertionChain: AssertionChain<
  State,
  [FluidRange, FluidProperty, SerializedElementState],
  number[][]
> = {
  "should compute the values": (state, args, result, allAssertions) => {
    const [, fluidProperty, serializedElState] = args;

    const masterProp =
      state.master!.coreDocStruct[serializedElState.el.goldenId][
        fluidProperty.metaData.property
      ];

    const winner = findWinner(
      allAssertions,
      fluidProperty.metaData.property,
      serializedElState.el.goldenId
    );

    if (winner?.orderID !== fluidProperty.metaData.orderID) return;

    assertStyleValues(result, masterProp.computedValues.actual);

    return true;
  },
};

const interpolateValuesAssertionChain: AssertionChain<
  State,
  { elState: SerializedElementState; fluidProperty: FluidProperty },
  number[][]
> = {
  "should interpolate the values": (state, args, result, allAssertions) => {
    const { elState, fluidProperty } = args;

    const masterProp =
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ];

    const winner = findWinner(
      allAssertions,
      fluidProperty.metaData.property,
      elState.el.goldenId
    );

    if (winner?.orderID !== fluidProperty.metaData.orderID) return;

    assertStyleValues(result, masterProp.computedValues.actual);

    return true;
  },
};

const computeFluidValueAssertionChain: AssertionChain<
  State,
  [
    FluidValue,
    { elState: SerializedElementState; fluidProperty: FluidProperty }
  ],
  number
> = {
  "should compute the fluid value": (state, args, result, allAssertions) => {
    const [fluidValue, { elState, fluidProperty }] = args;

    const masterProp =
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ];
    const winner = findWinner(
      allAssertions,
      fluidProperty.metaData.property,
      elState.el.goldenId
    );

    if (winner?.orderID !== fluidProperty.metaData.orderID) return;

    let key;
    if (fluidValue.type === "single") {
      const { value, unit } = fluidValue as FluidValueSingle;
      key = `${value}${unit}`;
    }
    expect(result).toBeCloseTo(masterProp.conversions[`${key}`], 1);

    return true;
  },
};

const convertToPixelsAssertionChain: AssertionChain<
  State,
  [
    FluidValueNumber,
    { elState: SerializedElementState; fluidProperty: FluidProperty },
    ConvertToPixelsContext
  ],
  number
> = {
  "should convert the fluid value to pixels": (
    state,
    args,
    result,
    allAssertions
  ) => {
    const [fluidValue, { elState, fluidProperty }] = args;

    const masterProp =
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ];
    const winner = findWinner(
      allAssertions,
      fluidProperty.metaData.property,
      elState.el.goldenId
    );

    if (winner?.orderID !== fluidProperty.metaData.orderID) return;

    expect(result).toBeCloseTo(
      masterProp.conversions[`${fluidValue.value}${fluidValue.unit}`],
      1
    );

    return true;
  },
};

const defaultAssertions = {
  update: updateAssertionChain,
  updateElement: updateElementAssertionChain,
  flushElement: flushElementAssertionChain,
  updateFluidProperties: updateFluidPropertiesAssertionChain,
  updateFluidProperty: updateFluidPropertyAssertionChain,
  computeValues: computeValuesAssertionChain,
  interpolateValues: interpolateValuesAssertionChain,
  computeFluidValue: computeFluidValueAssertionChain,
  convertToPixels: convertToPixelsAssertionChain,
};

const updateState = {
  hasUpdateBeenCalled: false,
};
class EngineUpdateAssertionMaster extends AssertionMaster<
  State,
  EngineUpdateMaster
> {
  constructor() {
    super(defaultAssertions, "engineUpdate", {
      getSnapshot: (state, args) => {
        const globalState = getState();
        const ctx = args.find((arg) => arg.windowWidth ?? false) || globalState;

        return {
          hasMaster: state.master ? true : false,
          masterWidth: state.master?.coreDocStructWindowWidth ?? 0,
          windowWidth: ctx.windowWidth,
          updateCounter: globalState.updateCounter,
        };
      },
    });
  }

  newState() {
    return {};
  }

  update = this.wrapTopFn(update, "update", {
    pre: () => {
      updateState.hasUpdateBeenCalled = true;
    },
    resultConverter: () => {
      const { visibleEls, hiddenEls } = getState();
      return {
        visibleEls: [...visibleEls].map((el) => serializeElementState(el)),
        hiddenEls: [...hiddenEls].map((el) => serializeElementState(el)),
      };
    },
  });

  flushElement = this.wrapFn(flushElement, "flushElement", {
    resultConverter: (result, args) => {
      const [elState] = args;
      return serializeElementState(elState);
    },
  });

  updateElement = this.wrapFn(updateElement, "updateElement", {
    resultConverter: (result, args) => {
      const [elState] = args;
      return serializeElementState(elState);
    },
  });

  updateFluidProperties = this.wrapFn(
    updateFluidProperties,
    "updateFluidProperties",
    {
      getId: (args) => args[0].el.dataset.goldenId || "",

      resultConverter: (result, args) => {
        const [elState] = args;
        return [serializeElementState(elState), Array.from(result.entries())];
      },
    }
  );

  updateFluidProperty = this.wrapFn(
    updateFluidProperty,
    "updateFluidProperty",
    {
      getId: (args) =>
        args[2].elState.el.dataset.goldenId +
        "/" +
        args[0].metaData.property +
        "/" +
        args[2].windowWidth,
      resultConverter: (result, args) => {
        const [, , ctx] = args;
        const { elState } = ctx;
        return [serializeElementState(elState), result, ctx];
      },
    }
  );

  getCurrentRange = this.wrapFn(getCurrentRange, "getCurrentRange");

  computeValues = this.wrapFn(computeValues, "computeValues", {
    getId: (args) =>
      args[2].elState.el.dataset.goldenId +
      "/" +
      args[1].metaData.property +
      "/" +
      args[2].windowWidth,
    argsConverter: (args) => {
      const [currentRange, fluidProperty, ctx] = args;
      const { elState } = ctx;
      return [currentRange, fluidProperty, serializeElementState(elState)];
    },
  });

  interpolateValues = this.wrapFn(interpolateValues, "interpolateValues", {
    getId: (args) =>
      args[2].elState.el.dataset.goldenId +
      "/" +
      args[2].fluidProperty.metaData.property +
      "/" +
      args[2].windowWidth,
    argsConverter: (args) => {
      const ctx = args[2];
      const { elState, fluidProperty } = ctx;
      return { elState: serializeElementState(elState), fluidProperty };
    },
  });

  computeFluidValue = this.wrapFn(computeFluidValue, "computeFluidValue", {
    argsConverter: (args) => {
      const [fluidValue, ctx] = args;
      const { elState, fluidProperty } = ctx;
      return [
        fluidValue,
        { elState: serializeElementState(elState), fluidProperty },
      ];
    },
  });

  convertToPixels = this.wrapFn(convertToPixels, "convertToPixels", {
    getId: (args) =>
      args[1].elState.el.dataset.goldenId +
      "/" +
      args[1].fluidProperty.metaData.property +
      "/" +
      args[1].windowWidth,
    argsConverter: (args) => {
      const [fluidValue, ctx] = args;

      const { elState, fluidProperty } = ctx;

      return [
        fluidValue,
        { elState: serializeElementState(elState), fluidProperty },
        ctx,
      ];
    },
  });
}

const engineUpdateAssertionMaster = new EngineUpdateAssertionMaster();

function wrapAll() {
  wrap(
    engineUpdateAssertionMaster.update,
    engineUpdateAssertionMaster.updateElement,
    engineUpdateAssertionMaster.flushElement,
    engineUpdateAssertionMaster.updateFluidProperties,
    engineUpdateAssertionMaster.updateFluidProperty,
    engineUpdateAssertionMaster.computeValues,
    engineUpdateAssertionMaster.interpolateValues,
    engineUpdateAssertionMaster.computeFluidValue,
    engineUpdateAssertionMaster.convertToPixels
  );
}

export { engineUpdateAssertionMaster, wrapAll, updateState };
