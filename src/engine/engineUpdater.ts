import {
  FluidRange,
  FluidValue,
  FluidValueSingle,
} from "../parsing/parser/docParser.types";
import { getState, setUpdateEndWidth, updateWindowWidth } from "./engineState";
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
    flushElement(elState);
  }
  pendingHiddenEls.clear();

  //Update visible elements
  for (const elState of visibleEls) {
    updateElement(elState, {
      ...globalState,
      documentElement: document.documentElement,
    });
  }
  setUpdateEndWidth(globalState.windowWidth);
  requestAnimationFrame(update);
};

let flushElement = (elState: ElementState) => {
  const { el, fluidProperties } = elState;
  if (!el.isConnected) {
    removeElement(elState);
    return;
  }
  const propsToFlush = getFlushProps(fluidProperties);

  for (const property of propsToFlush) {
    el.style.removeProperty(property);
  }
};

let getFlushProps = (fluidProperties: FluidProperty[]) => {
  const propsToFlush: Set<string> = new Set();
  for (const fluidProperty of fluidProperties)
    propsToFlush.add(fluidProperty.metaData.property);
  return propsToFlush;
};

let updateElement = (elState: ElementState, ctx: UpdateElementContext) => {
  const { el } = elState;

  if (!el.isConnected) {
    removeElement(elState);
    return;
  }

  const { fluidProperties } = elState;
  const stateUpdates = updateFluidProperties(elState, fluidProperties, ctx);

  for (const [property, stateUpdate] of stateUpdates) {
    el.style.setProperty(property, stateUpdate.value);
  }
};

let updateFluidProperties = (
  elState: ElementState,
  fluidProperties: FluidProperty[],
  ctx: UpdateElementContext
) => {
  const stateUpdates: Map<string, FluidPropertyState> =
    (elState.fluidPropertiesState = new Map());

  for (const fluidProperty of fluidProperties) {
    const { property } = fluidProperty.metaData;
    if (!stateUpdates.has(property)) {
      stateUpdates.set(property, {
        property,
        value: "",
        orderID: -1,
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
  return stateUpdates;
};

let updateFluidProperty = (
  fluidProperty: FluidProperty,
  currentPropertyState: FluidPropertyState | undefined,
  ctx: UpdateFluidPropertyContext
): FluidPropertyState | undefined => {
  const { property, orderID } = fluidProperty.metaData;
  if (currentPropertyState?.value && currentPropertyState.orderID > orderID)
    return;

  let value = "";
  const currentRange = getCurrentRange(fluidProperty, ctx);

  if (currentRange) {
    const result = computeValues(currentRange, fluidProperty, ctx);

    value = result
      .map((group) => group.map((value) => `${value.toString()}px`).join(" "))
      .join(",");
  }

  return {
    property,
    value,
    orderID,
  };
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
  fluidProperty: FluidProperty,
  ctx: UpdateFluidPropertyContext
) => {
  const { minBpIndex, maxBpIndex } = currentRange;
  const { breakpoints, windowWidth } = ctx;
  const minBp = breakpoints[minBpIndex];
  const maxBp = breakpoints[maxBpIndex];
  const progress = (windowWidth - minBp) / (maxBp - minBp);

  const childCtx = { ...ctx, fluidProperty };
  let result: number[][];
  if (progress <= 0) result = calcFluidArray(currentRange.minValue, childCtx);
  else if (progress >= 1)
    result = calcFluidArray(currentRange.maxValue, childCtx);
  else
    result = interpolateValues(currentRange.minValue, currentRange.maxValue, {
      ...childCtx,
      progress,
    });
  return result;
};

function calcFluidArray(
  values: FluidValue[][] | string,
  ctx: ConvertToPixelsContext
) {
  if (typeof values === "string") {
    const { fluidProperty } = ctx;
    const { property } = fluidProperty.metaData;
    if (property.startsWith("grid-")) return computeGridValues(values, ctx);
    throw Error(`Unknown property: ${property}`);
  }

  return values.map((group) =>
    group.map((value) => computeFluidValue(value, ctx))
  );
}

function computeGridValues(
  value: string,
  ctx: ConvertToPixelsContext
): number[][] {
  const {
    elState,
    fluidProperty: {
      metaData: { property },
    },
  } = ctx;
  const { el } = elState;
  const prevValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);

  const computedStyle = window.getComputedStyle(el);
  const gridTemplate = computedStyle.getPropertyValue(property);
  el.style.setProperty(property, prevValue);
  const gridTemplateArray = gridTemplate.split(" ");
  const gridTemplateValues = gridTemplateArray.map((value) => {
    return parseFloat(value);
  });
  return [gridTemplateValues];
}

let interpolateValues = (
  minValues: FluidValue[][] | string,
  maxValues: FluidValue[][] | string,
  ctx: InterpolateValuesContext
) => {
  const { progress } = ctx;
  const minValuesPx = calcFluidArray(minValues, ctx);
  /*if (
    ctx.fluidProperty.metaData.property.startsWith("grid-") &&
    ctx.windowWidth === 550
  ) {
    console.log(`GRID MIN for width ${ctx.windowWidth}`, minValuesPx[0]);
    console.log(minValues);
  }*/
  const maxValuesPx = calcFluidArray(maxValues, ctx);
  /*if (
    ctx.fluidProperty.metaData.property.startsWith("grid-") &&
    ctx.windowWidth === 550
  ) {
    console.log(`GRID MAX for width ${ctx.windowWidth}`, maxValuesPx[0]);
    console.log(maxValues);
  }*/
  return minValuesPx.map((group, groupIndex) =>
    group.map((minValuePx, valueIndex) => {
      if (groupIndex >= maxValues.length) return minValuePx;

      const maxGroup = maxValuesPx[groupIndex];

      if (valueIndex >= maxGroup.length) return minValuePx;

      const maxValuePx = maxGroup[valueIndex];
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

const unitConversionRouter: Record<
  string,
  (value: number, ctx: ConvertToPixelsContext) => number
> = {
  "": calcUnitless,
  px: (value: number) => value,
  em: calcEm,
  rem: calcRem,
};

let convertToPixels = (
  value: FluidValueSingle,
  ctx: ConvertToPixelsContext
) => {
  const route = unitConversionRouter[value.unit];
  if (!route) {
    throw Error(`Unknown unit: ${value.unit}`);
  }
  return route(value.value, ctx);
};

function calcUnitless(value: number, ctx: ConvertToPixelsContext) {
  const {
    fluidProperty: {
      metaData: { property },
    },
    elState: { el },
  } = ctx;
  if (property === "line-height") {
    const prevValue = el.style.getPropertyValue("line-height");

    el.style.setProperty("line-height", value.toString());

    const result = getComputedStyle(el).getPropertyValue("line-height");

    el.style.setProperty("line-height", prevValue);

    return parseFloat(result);
  }

  return value;
}

function calcEm(value: number, ctx: ConvertToPixelsContext) {
  const {
    elState,
    fluidProperty: {
      metaData: { property },
    },
    documentElement,
  } = ctx;
  if (property === "font-size")
    return (
      value *
      parseFloat(
        getComputedStyle(elState.el.parentElement || documentElement).fontSize
      )
    );
  else return value * readPropertyValue(property, elState);
}

function calcRem(value: number, ctx: ConvertToPixelsContext) {
  const { documentElement } = ctx;
  return value * parseFloat(getComputedStyle(documentElement).fontSize);
}

function wrap(
  updateWrapped: typeof update,
  updateElementWrapped: typeof updateElement,
  flushElementWrapped: typeof flushElement,
  updateFluidPropertiesWrapped: typeof updateFluidProperties,
  updateFluidPropertyWrapped: typeof updateFluidProperty,
  computeValuesWrapped: typeof computeValues,
  interpolateValuesWrapped: typeof interpolateValues,
  computeFluidValueWrapped: typeof computeFluidValue,
  convertToPixelsWrapped: typeof convertToPixels
) {
  update = updateWrapped;
  updateElement = updateElementWrapped;
  flushElement = flushElementWrapped;
  updateFluidProperties = updateFluidPropertiesWrapped;
  updateFluidProperty = updateFluidPropertyWrapped;
  computeValues = computeValuesWrapped;
  interpolateValues = interpolateValuesWrapped;
  computeFluidValue = computeFluidValueWrapped;
  convertToPixels = convertToPixelsWrapped;
}

export {
  update,
  updateElement,
  flushElement,
  getFlushProps,
  updateFluidProperties,
  updateFluidProperty,
  readPropertyValue,
  getCurrentRange,
  computeValues,
  interpolateValues,
  computeFluidValue,
  convertToPixels,
  wrap,
};
