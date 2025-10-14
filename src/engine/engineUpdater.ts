import {
  FluidRange,
  FluidValue,
  FluidValueSingle,
} from "../parsing/parser/docParser.types";
import { getState, updateWindowWidth } from "./engineState";
import { removeElement } from "./engineState";
import {
  ConvertToPixelsContext,
  ElementState,
  FluidProperty,
  FluidPropertyState,
  InterpolateValuesContext,
  UpdateElementContext,
  UpdateFluidPropertyContext,
} from "./index.types";

let update = () => {
  updateWindowWidth();
  const globalState = getState();

  const { visibleEls, pendingHiddenEls } = globalState;

  //Flush pending elements
  for (const elState of pendingHiddenEls) {
    updateElement(elState, globalState);
  }

  //Update visible elements
  for (const elState of visibleEls) {
    updateElement(elState, globalState);
  }
};

update = update;

let updateElement = (elState: ElementState, ctx: UpdateElementContext) => {
  const { el } = elState;

  if (!el.isConnected) {
    removeElement(elState);
    return;
  }

  const { fluidProperties } = elState;
  const stateUpdates: Map<string, FluidPropertyState> =
    elState.fluidPropertiesState || new Map();
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
      stateUpdates.get(property),
      { ...ctx, elState }
    );
    if (stateUpdate) {
      stateUpdates.set(property, stateUpdate);
    }
  }

  for (const [property, stateUpdate] of stateUpdates) {
    el.style.setProperty(property, stateUpdate.value);
  }
};

let updateFluidProperty = (
  fluidProperty: FluidProperty,
  currentPropertyState: FluidPropertyState | undefined,
  ctx: UpdateFluidPropertyContext
): FluidPropertyState | undefined => {
  const { property, orderID } = fluidProperty.metaData;
  if (currentPropertyState && orderID < currentPropertyState.orderID) return;

  const value = computeValueAsString(fluidProperty, ctx);

  return {
    property,
    value,
    orderID,
  };
};

let computeValueAsString = (
  fluidProperty: FluidProperty,
  ctx: UpdateFluidPropertyContext
) => {
  const currentRange = getCurrentRange(fluidProperty, ctx);
  if (!currentRange) return "";

  const result = computeValues(
    currentRange,
    fluidProperty.metaData.property,
    ctx
  );

  return result
    .map((group) => group.map((value) => value.toString()).join(" "))
    .join(",");
};

let getCurrentRange = (
  fluidProperty: FluidProperty,
  ctx: UpdateFluidPropertyContext
) => {
  const { breakpoints, windowWidth } = ctx;

  return fluidProperty.ranges.find((range) => {
    if (!range) return false;

    const { minBpIndex, maxBpIndex } = range;
    const minBp = breakpoints[minBpIndex];
    const maxBp = breakpoints[maxBpIndex];
    return windowWidth >= minBp && windowWidth <= maxBp;
  });
};

let computeValues = (
  currentRange: FluidRange,
  property: string,
  ctx: UpdateFluidPropertyContext
) => {
  const { minBpIndex, maxBpIndex } = currentRange;
  const { breakpoints, windowWidth } = ctx;
  const minBp = breakpoints[minBpIndex];
  const maxBp = breakpoints[maxBpIndex];
  const progress = (windowWidth - minBp) / (maxBp - minBp);

  const childCtx = { ...ctx, property };
  let result;
  if (progress <= 0)
    result = currentRange.minValue.map((group) =>
      group.map((minValue) => computeFluidValue(minValue, childCtx))
    );
  else if (progress >= 1)
    result = currentRange.maxValue.map((group) =>
      group.map((maxValue) => computeFluidValue(maxValue, childCtx))
    );
  else
    result = interpolateValues(currentRange.minValue, currentRange.maxValue, {
      ...childCtx,
      progress,
    });
  return result;
};

let interpolateValues = (
  minValues: FluidValue[][],
  maxValues: FluidValue[][],
  ctx: InterpolateValuesContext
) => {
  const { progress } = ctx;
  return minValues.map((group, groupIndex) =>
    group.map((minValue, valueIndex) => {
      if (groupIndex >= maxValues.length) return minValue;

      const maxGroup = maxValues[groupIndex];

      if (valueIndex >= maxGroup.length) return minValue;

      const maxValue = maxGroup[valueIndex];
      const minValuePx = computeFluidValue(minValue, ctx);
      const maxValuePx = computeFluidValue(maxValue, ctx);
      return minValuePx + (maxValuePx - minValuePx) * progress;
    })
  );
};

function readPropertyValue(property: string, elState: ElementState) {
  const { fluidPropertiesState } = elState;
  const propertyState = fluidPropertiesState.get(property);
  if (!propertyState)
    return parseFloat(getComputedStyle(elState.el).getPropertyValue(property));
  return parseFloat(propertyState.value);
}

let computeFluidValue = (
  fluidValue: FluidValue,
  ctx: ConvertToPixelsContext
): number => {
  if (fluidValue.type === "single") {
    return convertToPixels(fluidValue as FluidValueSingle, ctx);
  }
  throw Error(`Unknown fluid value type: ${fluidValue.type}`);
};

let convertToPixels = (
  value: FluidValueSingle,
  ctx: ConvertToPixelsContext
) => {
  const { elState, property } = ctx;
  switch (value.unit) {
    case "px":
      return value.value;
    case "em": {
      if (property === "font-size")
        return (
          value.value *
          parseFloat(
            (elState.el.parentElement || document.documentElement).style
              .fontSize
          )
        );
      else return value.value * readPropertyValue(property, elState);
    }
    case "rem":
      return (
        value.value *
        parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
  }
  throw Error(`Unknown unit: ${value.unit}`);
};

export { updateElement, updateFluidProperty };
