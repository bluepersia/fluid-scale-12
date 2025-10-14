let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import AssertionMaster, {
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
  ElementState,
  FluidProperty,
  FluidPropertyState,
  UpdateElementContext,
  UpdateFluidPropertyContext,
} from "../../../src/engine/index.types";
import {
  FluidRange,
  FluidValue,
  FluidValueSingle,
} from "../../../src/parsing/parser/docParser.types";
import { getState } from "../../../src/engine/engineState";
import { serializeElementState } from "../serialization";

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
        expect(actualValue).toBeNaN();
        expect(expectedValue).toBeNaN();
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
      const props = Object.keys(
        state.master!.coreDocStruct[elState.el.goldenId]
      );

      for (const prop of props) {
        expect(elState.inlineStyles[prop]).toBe("");
      }
    }
  },
};

const updateElementAssertionChain: AssertionChain<
  State,
  [ElementState, UpdateElementContext],
  SerializedElementState
> = {
  "should update the element": (state, args, result) => {
    assertElementState(result, state);
  },
};

const flushElementAssertionChain: AssertionChain<
  State,
  [ElementState],
  SerializedElementState
> = {
  "should flush the element": (state, args, result) => {
    const props = Object.keys(state.master!.coreDocStruct[result.el.goldenId]);

    for (const prop of props) {
      expect(result.inlineStyles[prop]).toBe("");
    }
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

    for (const [prop, value] of Object.entries(
      state.master!.coreDocStruct[elState.el.goldenId]
    )) {
      const actualValue = parseStyleValues(
        fluidPropertiesState.get(prop)!.value
      );
      const expectedValue = value.computedValues.actual;

      assertStyleValues(actualValue, expectedValue);
    }
  },
};

const updateFluidPropertyAssertionChain: AssertionChain<
  State,
  [FluidProperty, FluidPropertyState | undefined, UpdateFluidPropertyContext],
  [SerializedElementState, FluidPropertyState]
> = {
  "should update the fluid property": (state, args, result) => {
    const { property, orderID } = args[0].metaData;
    const [elState, fluidPropertyState] = result;

    const masterProp =
      state.master!.coreDocStruct[elState.el.goldenId][property];

    if (masterProp.computedValues.actualOrderID === orderID) {
      const actualValue = parseStyleValues(fluidPropertyState.value);

      assertStyleValues(
        actualValue,
        masterProp.computedValues.actual,
        JSON.stringify({
          actualValue,
          masterIndex: state.master!.index,
          masterStep: state.master!.coreDocStructWindowWidth,
        })
      );
    }
  },
};

const getCurrentRangeAssertionChain: AssertionChainForFunc<
  State,
  typeof getCurrentRange
> = {
  "should get the current range": (state, args, result) => {
    if (result) {
      expect(result.minBpIndex).toBe(state.master!.coreDocStructRange);
    }
  },
};

const computeValuesAssertionChain: AssertionChain<
  State,
  [FluidRange, FluidProperty, SerializedElementState],
  number[][]
> = {
  "should compute the values": (state, args, result) => {
    const [, fluidProperty, serializedElState] = args;

    assertStyleValues(
      result,
      state.master!.coreDocStruct[serializedElState.el.goldenId][
        fluidProperty.metaData.property
      ].computedValues.actual
    );
  },
};

const interpolateValuesAssertionChain: AssertionChain<
  State,
  { elState: SerializedElementState; fluidProperty: FluidProperty },
  number[][]
> = {
  "should interpolate the values": (state, args, result) => {
    const { elState, fluidProperty } = args;
    assertStyleValues(
      result,
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ].computedValues.actual
    );
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
  "should compute the fluid value": (state, args, result) => {
    const [fluidValue, { elState, fluidProperty }] = args;
    let key;
    if (fluidValue.type === "single") {
      const { value, unit } = fluidValue as FluidValueSingle;
      key = `${value}${unit}`;
    }
    expect(result).toBeCloseTo(
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ].conversions[`${key}`],
      1
    );
  },
};

const convertToPixelsAssertionChain: AssertionChain<
  State,
  [
    FluidValueSingle,
    { elState: SerializedElementState; fluidProperty: FluidProperty }
  ],
  number
> = {
  "should convert the fluid value to pixels": (state, args, result) => {
    const [fluidValue, { elState, fluidProperty }] = args;

    expect(result).toBeCloseTo(
      state.master!.coreDocStruct[elState.el.goldenId][
        fluidProperty.metaData.property
      ].conversions[`${fluidValue.value}${fluidValue.unit}`],
      1
    );
  },
};

const defaultAssertions = {
  update: updateAssertionChain,
  updateElement: updateElementAssertionChain,
  flushElement: flushElementAssertionChain,
  updateFluidProperties: updateFluidPropertiesAssertionChain,
  updateFluidProperty: updateFluidPropertyAssertionChain,
  getCurrentRange: getCurrentRangeAssertionChain,
  computeValues: computeValuesAssertionChain,
  interpolateValues: interpolateValuesAssertionChain,
  computeFluidValue: computeFluidValueAssertionChain,
  convertToPixels: convertToPixelsAssertionChain,
};

class EngineUpdateAssertionMaster extends AssertionMaster<
  State,
  EngineUpdateMaster
> {
  constructor() {
    super(defaultAssertions, "engineUpdate");
  }

  newState() {
    return {};
  }

  update = this.wrapTopFn(update, "update", {
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
      resultConverter: (result, args) => {
        const [, , ctx] = args;
        const { elState } = ctx;
        return [serializeElementState(elState), result];
      },
    }
  );

  getCurrentRange = this.wrapFn(getCurrentRange, "getCurrentRange");

  computeValues = this.wrapFn(computeValues, "computeValues", {
    argsConverter: (args) => {
      const [currentRange, fluidProperty, ctx] = args;
      const { elState } = ctx;
      return [currentRange, fluidProperty, serializeElementState(elState)];
    },
  });

  interpolateValues = this.wrapFn(interpolateValues, "interpolateValues", {
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
    argsConverter: (args) => {
      const [fluidValue, ctx] = args;

      const { elState, fluidProperty } = ctx;

      return [
        fluidValue,
        { elState: serializeElementState(elState), fluidProperty },
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
    engineUpdateAssertionMaster.getCurrentRange,
    engineUpdateAssertionMaster.computeValues,
    engineUpdateAssertionMaster.interpolateValues,
    engineUpdateAssertionMaster.computeFluidValue,
    engineUpdateAssertionMaster.convertToPixels
  );
}

export { engineUpdateAssertionMaster, wrapAll };
