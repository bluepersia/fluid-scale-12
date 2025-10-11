import { splitBySpaces } from "../../utils/stringHelpers";
import { StyleRuleClone } from "../serialization/docSerializer.types";
import { STYLE_RULE_TYPE } from "../serialization/docSerializerConsts";
import {
  DocResultState,
  FluidData,
  FluidValue,
  FluidValueSingle,
  InsertFluidDataContext,
  ParseBatchContext,
  ParseNextBatchContext,
  ParseNextRuleContext,
  ParsePropertyContext,
  ParseSelectorContext,
  ParseStyleRuleContext,
  RuleBatch,
} from "./docParser.types";

let parseBatches = (
  batches: RuleBatch[],
  docResultState: DocResultState
): DocResultState => {
  for (const [batchIndex, batch] of batches.entries()) {
    docResultState = parseBatch(batch, { docResultState, batchIndex, batches });
  }
  return docResultState;
};

let parseBatch = (batch: RuleBatch, ctx: ParseBatchContext): DocResultState => {
  let { orderID, fluidData } = ctx.docResultState;

  for (const rule of batch.rules) {
    if (rule.type !== STYLE_RULE_TYPE) continue;
    const styleRule = rule as StyleRuleClone;
    fluidData = parseStyleRule(styleRule, { ...ctx, fluidData, orderID });
    orderID++;
  }
  return { fluidData, orderID };
};

let parseStyleRule = (
  styleRule: StyleRuleClone,
  ctx: ParseStyleRuleContext
): FluidData => {
  let { fluidData } = ctx;
  for (const selector of styleRule.selectorText.split(",")) {
    fluidData = parseSelector(styleRule, selector, { ...ctx, fluidData });
  }
  return fluidData;
};

let parseSelector = (
  styleRule: StyleRuleClone,
  selector: string,
  ctx: ParseSelectorContext
): FluidData => {
  let { fluidData } = ctx;
  for (const property of Object.keys(styleRule.style)) {
    fluidData = parseProperty(styleRule, property, {
      ...ctx,
      fluidData,
      selector,
    });
  }
  return fluidData;
};

let parseProperty = (
  styleRule: StyleRuleClone,
  property: string,
  ctx: ParsePropertyContext
): FluidData => {
  let { fluidData } = ctx;
  const { batchIndex, batches } = ctx;

  const minValue = styleRule.style[property];

  for (
    let nextBatchIndex = batchIndex + 1;
    nextBatchIndex < batches.length;
    nextBatchIndex++
  ) {
    const nextBatch = batches[nextBatchIndex];
    fluidData = parseNextBatch(nextBatch, {
      ...ctx,
      minValue,
      property,
      fluidData,
      nextBatchIndex,
    });
  }
  return fluidData;
};

function parseNextBatch(
  nextBatch: RuleBatch,
  ctx: ParseNextBatchContext
): FluidData {
  let { fluidData } = ctx;
  const { selector } = ctx;
  for (const nextRule of nextBatch.rules) {
    if (nextRule.type !== STYLE_RULE_TYPE) continue;
    const nextStyleRule = nextRule as StyleRuleClone;
    if (!nextStyleRule.selectorText.split(",").includes(selector)) continue;
    fluidData = parseNextRule(nextStyleRule, { ...ctx, fluidData });
  }
  return fluidData;
}

function parseNextRule(
  nextStyleRule: StyleRuleClone,
  ctx: ParseNextRuleContext
): FluidData {
  const { fluidData, property, selector } = ctx;

  const maxValue = nextStyleRule.style[property];
  if (!maxValue) return fluidData;

  const selectorParts = selector.split(" ");
  const anchor = selectorParts[selectorParts.length - 1];

  return insertFluidData(fluidData, { ...ctx, anchor, maxValue });
}

function insertFluidData(fluidData: FluidData, ctx: InsertFluidDataContext) {
  const { anchor, selector, property, minValue, maxValue } = ctx;
  const { orderID, batchIndex, nextBatchIndex } = ctx;
  const newFluidData = cloneFluidData(fluidData, anchor, selector, property);

  if (!newFluidData[anchor]) newFluidData[anchor] = {};
  if (!newFluidData[anchor][selector]) newFluidData[anchor][selector] = {};
  if (!newFluidData[anchor][selector][property])
    newFluidData[anchor][selector][property] = {
      metaData: {
        orderID,
        property,
      },
      ranges: [],
    };

  newFluidData[anchor][selector][property].ranges.push({
    minValue: parseFluidValue2D(minValue),
    maxValue: parseFluidValue2D(maxValue),
    minBpIndex: batchIndex,
    maxBpIndex: nextBatchIndex,
  });

  return newFluidData;
}

function cloneFluidData(
  fluidData: FluidData,
  anchor: string,
  selector: string,
  property: string
): FluidData {
  const newFluidData = { ...fluidData };
  if (newFluidData[anchor]) newFluidData[anchor] = { ...newFluidData[anchor] };
  if (newFluidData[anchor][selector])
    newFluidData[anchor][selector] = { ...newFluidData[anchor][selector] };
  if (newFluidData[anchor][selector][property]) {
    newFluidData[anchor][selector][property] = {
      ...newFluidData[anchor][selector][property],
    };
    newFluidData[anchor][selector][property].ranges = [
      ...newFluidData[anchor][selector][property].ranges,
    ];
  }
  return newFluidData;
}

let parseFluidValue2D = (value: string): FluidValue[][] => {
  let depth = 0;
  let currentValue = "";
  let values: FluidValue[][] = [];
  for (const char of value) {
    if (char === "(") {
      depth++;
    } else if (char === ")") {
      depth--;
    } else if (char === "," && depth === 0) {
      values.push(parseFluidValue1D(currentValue.trim()));
      currentValue = "";
    } else {
      currentValue += char;
    }
  }
  values.push(parseFluidValue1D(currentValue.trim()));

  return values;
};

let parseFluidValue1D = (value: string): FluidValue[] => {
  const values: string[] = splitBySpaces(value);
  return values.map(parseFluidValue);
};

let parseFluidValue = (strValue: string): FluidValue => {
  const value = parseFloat(strValue);

  // Match any alphabetic characters after the number
  const match = strValue.match(/[a-z%]+$/i);
  const unit = match?.[0] || "px";

  return {
    value,
    unit,
  } as FluidValueSingle;
};

export { parseBatches, parseFluidValue2D, parseFluidValue1D, parseFluidValue };
