import { splitBySpaces } from "../../utils/stringHelpers";
import { StyleRuleClone } from "../serialization/docSerializer.types";
import { STYLE_RULE_TYPE } from "../serialization/docSerializerConsts";
import {
  ApplyForceContext,
  DocResultState,
  DocSpans,
  FluidData,
  FluidValue,
  FluidValueSingle,
  InsertFluidDataContext,
  ParseBatchContext,
  ParseBatchesContext,
  ParseNextBatchContext,
  ParseNextRuleContext,
  ParsePropertyContext,
  ParseSelectorContext,
  ParseStyleRuleContext,
  RuleBatch,
} from "./docParser.types";
import { EXPLICIT_PROPS } from "./docParserConsts";

let parseBatches = (
  batches: RuleBatch[],
  ctx: ParseBatchesContext
): DocResultState => {
  let { docResultState } = ctx;
  for (const [batchIndex, batch] of batches.entries()) {
    docResultState = parseBatch(batch, {
      ...ctx,
      docResultState,
      batchIndex,
      batches,
    });
  }
  return docResultState;
};

let parseBatch = (batch: RuleBatch, ctx: ParseBatchContext): DocResultState => {
  let { docResultState } = ctx;
  for (const rule of batch.rules) {
    if (rule.type !== STYLE_RULE_TYPE) continue;
    const styleRule = rule as StyleRuleClone;
    const newDocResultState = {
      ...parseStyleRule(styleRule, {
        ...ctx,
        batchWidth: batch.width,
        docResultState,
      }),
    };
    if (newDocResultState.isNew) {
      docResultState = { ...newDocResultState };
      docResultState.orderID++;
      docResultState.isNew = false;
    } else {
      docResultState = newDocResultState;
    }
  }
  return docResultState;
};

let parseStyleRule = (
  styleRule: StyleRuleClone,
  ctx: ParseStyleRuleContext
): DocResultState => {
  let { docResultState } = ctx;
  for (const selector of splitSelector(styleRule.selectorText)) {
    docResultState = parseSelector(styleRule, selector, {
      ...ctx,
      docResultState,
    });
  }
  return docResultState;
};

function splitSelector(selector: string): string[] {
  return selector.split(",").map((selector) => selector.trim());
}

let parseSelector = (
  styleRule: StyleRuleClone,
  selector: string,
  ctx: ParseSelectorContext
): DocResultState => {
  let { docResultState } = ctx;

  const spanEndsResult = applySpanEnd(styleRule, selector, ctx);

  if (spanEndsResult) {
    const { spanEnds, spans } = spanEndsResult;
    docResultState = { ...docResultState, spans };
    styleRule = { ...styleRule, style: { ...styleRule.style } };
    for (const [key, value] of spanEnds) {
      styleRule.style[key] = value;
    }
  }
  for (const property of Object.keys(styleRule.style)) {
    docResultState = parseProperty(styleRule, property, {
      ...ctx,
      selector,
      docResultState,
    });
  }
  return docResultState;
};

let applySpanEnd = (
  styleRule: StyleRuleClone,
  selector: string,
  ctx: ParseSelectorContext
): { spanEnds: [string, string][]; spans: DocSpans } | null => {
  const { docResultState } = ctx;
  const spanEnds: [string, string][] = [];
  const spanEndValue = styleRule.specialProps["--span-end"];
  if (spanEndValue) {
    const { spans } = docResultState;
    if (!spans[selector]) return null;
    const spanEndValues = parsePropsValues(spanEndValue);
    const spansNew = { ...spans, [selector]: { ...spans[selector] } };
    for (const [key, value] of Object.entries(spans[selector])) {
      if (propListContains(spanEndValues, key)) {
        spanEnds.push([key, value]);
        delete spansNew[selector][key];
      }
    }
    return { spanEnds, spans: spansNew };
  }
  return null;
};

function propListContains(propList: string[], property: string) {
  if (propList.includes("all")) return true;
  if (propList.includes(property)) return true;

  if (EXPLICIT_PROPS.has(property))
    return propList.includes(EXPLICIT_PROPS.get(property)!);

  return false;
}

let parseProperty = (
  styleRule: StyleRuleClone,
  property: string,
  ctx: ParsePropertyContext
): DocResultState => {
  const minValue = styleRule.style[property];

  const appliedSpanStart = applySpanStart(styleRule, property, ctx);
  if (appliedSpanStart) return appliedSpanStart;

  const appliedForce = applyForce(styleRule, property, { ...ctx, minValue });
  if (appliedForce) return appliedForce;

  return parseNextBatches(minValue, property, ctx);
};

let applySpanStart = (
  styleRule: StyleRuleClone,
  property: string,
  ctx: ParsePropertyContext
): DocResultState | null => {
  const { docResultState, selector } = ctx;

  const spanStart = styleRule.specialProps["--span-start"];
  if (spanStart) {
    const spanValues = parsePropsValues(spanStart);
    if (propListContains(spanValues, property)) {
      const propValue = styleRule.style[property];
      if (!propValue) return null;
      let { spans } = docResultState;
      spans = { ...spans };
      if (spans[selector]) spans[selector] = { ...spans[selector] };
      else if (!spans[selector]) spans[selector] = {};
      spans[selector][property] = propValue;

      return { ...docResultState, spans };
    }
  }
  return null;
};

let applyForce = (
  styleRule: StyleRuleClone,
  property: string,
  ctx: ApplyForceContext
) => {
  const { docResultState, minValue, breakpoints } = ctx;
  const force = styleRule.specialProps["--force"];
  if (force) {
    const forceValues = parsePropsValues(force);
    if (propListContains(forceValues, property)) {
      return parseNextRule(styleRule, {
        ...ctx,
        minValue,
        property,
        nextBatchWidth: breakpoints[breakpoints.length - 1],
        docResultState,
      });
    }
  }
};

function parsePropsValues(value: string) {
  return value.split(",").map((seg) => seg.trim());
}

let parseNextBatches = (
  minValue: string,
  property: string,
  ctx: ParsePropertyContext
) => {
  const { batchIndex, batches, docResultState } = ctx;
  for (
    let nextBatchIndex = batchIndex + 1;
    nextBatchIndex < batches.length;
    nextBatchIndex++
  ) {
    const nextBatch = batches[nextBatchIndex];
    if (!nextBatch.isMediaQuery) return docResultState;
    const newDocResultState = parseNextBatch(nextBatch, {
      ...ctx,
      minValue,
      property,
      docResultState,
    });
    if (newDocResultState !== docResultState) {
      return newDocResultState;
    }
  }
  return docResultState;
};

let parseNextBatch = (
  nextBatch: RuleBatch,
  ctx: ParseNextBatchContext
): DocResultState => {
  const { docResultState } = ctx;
  const { selector } = ctx;
  for (const nextRule of nextBatch.rules) {
    if (nextRule.type !== STYLE_RULE_TYPE) continue;
    const nextStyleRule = nextRule as StyleRuleClone;
    if (!splitSelector(nextStyleRule.selectorText).includes(selector)) continue;
    const newDocResultState = parseNextRule(nextStyleRule, {
      ...ctx,
      nextBatchWidth: nextBatch.width,
      docResultState,
    });
    if (newDocResultState !== docResultState) {
      return newDocResultState;
    }
  }
  return docResultState;
};

let parseNextRule = (
  nextStyleRule: StyleRuleClone,
  ctx: ParseNextRuleContext
): DocResultState => {
  const { docResultState, property, selector } = ctx;

  const maxValue = nextStyleRule.style[property];
  if (!maxValue) return docResultState;

  const selectorParts = selector.split(" ");
  const anchor = selectorParts[selectorParts.length - 1];

  const { fluidData } = docResultState;
  return insertFluidData(fluidData, { ...ctx, anchor, maxValue });
};

function getAnchor(selector: string) {
  const selectorParts = selector.split(" ");
  return selectorParts[selectorParts.length - 1];
}

let insertFluidData = (fluidData: FluidData, ctx: InsertFluidDataContext) => {
  const { anchor, selector, property, minValue, maxValue } = ctx;
  const { docResultState, breakpoints, batchWidth, nextBatchWidth } = ctx;
  const { orderID } = docResultState;
  const newFluidData = cloneFluidData(fluidData, anchor, selector, property);

  let isNew = false;
  if (!newFluidData[anchor]) newFluidData[anchor] = {};
  if (!newFluidData[anchor][selector]) newFluidData[anchor][selector] = {};
  if (!newFluidData[anchor][selector][property]) {
    newFluidData[anchor][selector][property] = {
      metaData: {
        orderID,
        property,
      },
      ranges: [],
    };
    isNew = true;
  }

  newFluidData[anchor][selector][property].ranges.push({
    minValue: parseFluidValue2D(minValue, ctx),
    maxValue: parseFluidValue2D(maxValue, ctx),
    minBpIndex: breakpoints.indexOf(batchWidth),
    maxBpIndex: breakpoints.indexOf(nextBatchWidth),
  });

  return { ...docResultState, fluidData: newFluidData, isNew };
};

let cloneFluidData = (
  fluidData: FluidData,
  anchor: string,
  selector: string,
  property: string
): FluidData => {
  const newFluidData = { ...fluidData };
  if (newFluidData[anchor]) newFluidData[anchor] = { ...newFluidData[anchor] };
  if (newFluidData[anchor]?.[selector])
    newFluidData[anchor][selector] = { ...newFluidData[anchor][selector] };
  if (newFluidData[anchor]?.[selector]?.[property]) {
    newFluidData[anchor][selector][property] = {
      ...newFluidData[anchor][selector][property],
    };
    newFluidData[anchor][selector][property].ranges = [
      ...newFluidData[anchor][selector][property].ranges,
    ];
  }
  return newFluidData;
};

function parseFluidValue2D(
  value: string,
  ctx: Pick<InsertFluidDataContext, "property">
): FluidValue[][] | string {
  const { property } = ctx;

  if (property.startsWith("grid-")) return value;

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
}

function parseFluidValue1D(value: string): FluidValue[] {
  const values: string[] = splitBySpaces(value);
  return values.map((value) => parseFluidValue(value));
}

function parseFluidValue(strValue: string): FluidValue {
  const value = parseFloat(strValue);

  // Match any alphabetic characters after the number
  const match = strValue.match(/[a-z%]+$/i);
  const unit = match?.[0] || "";

  return {
    value,
    unit,
    type: "single",
  } as FluidValueSingle;
}

function wrap(
  parseBatchesWrapped: (
    batches: RuleBatch[],
    ctx: ParseBatchesContext
  ) => DocResultState,
  parseBatchWrapped: (
    batch: RuleBatch,
    ctx: ParseBatchContext
  ) => DocResultState,
  parseStyleRuleWrapped: typeof parseStyleRule,
  parseSelectorWrapped: typeof parseSelector,
  parsePropertyWrapped: typeof parseProperty,
  applySpanStartWrapped: typeof applySpanStart,
  applyForceWrapped: typeof applyForce,
  parseNextBatchWrapped: typeof parseNextBatch,
  parseNextBatchesWrapped: typeof parseNextBatches,
  parseNextRuleWrapped: typeof parseNextRule,
  insertFluidDataWrapped: typeof insertFluidData,
  cloneFluidDataWrapped: (
    fluidData: FluidData,
    anchor: string,
    selector: string,
    property: string
  ) => FluidData
) {
  parseBatches = parseBatchesWrapped;
  parseBatch = parseBatchWrapped;
  parseStyleRule = parseStyleRuleWrapped;
  parseSelector = parseSelectorWrapped;
  parseProperty = parsePropertyWrapped;
  applySpanStart = applySpanStartWrapped;
  applyForce = applyForceWrapped;
  parseNextBatch = parseNextBatchWrapped;
  parseNextBatches = parseNextBatchesWrapped;
  parseNextRule = parseNextRuleWrapped;
  insertFluidData = insertFluidDataWrapped;
  cloneFluidData = cloneFluidDataWrapped;
}

export {
  parseBatches,
  parseBatch,
  parseStyleRule,
  parseSelector,
  parseProperty,
  applyForce,
  parseNextBatch,
  parseNextBatches,
  parseNextRule,
  insertFluidData,
  cloneFluidData,
  parseFluidValue2D,
  parseFluidValue1D,
  parseFluidValue,
  getAnchor,
  wrap,
  applySpanStart,
  propListContains,
  parsePropsValues,
  applySpanEnd,
};
