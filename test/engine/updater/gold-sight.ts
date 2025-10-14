let expect;
if (process.env.NODE_ENV === "test") {
  expect = (await import("vitest")).expect;
}

import { AssertionChain, AssertionChainForFunc } from "gold-sight";
import { EngineUpdateMaster } from "./index.types";
import {
  computeValues,
  getCurrentRange,
  update,
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
  return value
    .split(",")
    .map((group) => group.split(" ").map((val) => parseFloat(val)));
}

function assertStyleValues(actual: number[][], expected: number[][]) {
  for (let i = 0; i < actual.length; i++) {
    for (let j = 0; j < actual[i].length; j++) {
      expect(actual[i][j]).toBeCloseTo(expected[i][j], 1);
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

      assertStyleValues(actualValue, masterProp.computedValues.actual);
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
