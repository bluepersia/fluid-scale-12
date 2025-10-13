import { FluidProperty } from "../../src/engine/index.types";
import {
  FluidPropertyData,
  FluidRange,
} from "../../src/parsing/parser/docParser.types";
import { deepClone } from "../utils/objectCloner";
import { RuntimeGoldenDoc, RuntimeGoldenDocFlat } from "./index.types";

function convertToFlat(doc: RuntimeGoldenDoc) {
  const newDoc: RuntimeGoldenDocFlat = {};

  for (const [goldenId, fluidPropertyEntry] of Object.entries(doc)) {
    const { fluidProperties } = fluidPropertyEntry;
    newDoc[goldenId] = fluidProperties;
  }

  return newDoc;
}

function fillDocWithNullRanges(
  doc: RuntimeGoldenDoc,
  breakpointsLength: number
) {
  const newDoc: RuntimeGoldenDoc = deepClone(doc);

  for (const [goldenId, fluidPropertyEntry] of Object.entries(newDoc)) {
    const { fluidProperties } = fluidPropertyEntry;
    for (const fluidPropertyData of fluidProperties) {
      const fullRanges = new Array(breakpointsLength).fill(null);
      for (const range of fluidPropertyData.ranges as FluidRange[]) {
        fullRanges[range.minBpIndex] = range;
      }
      fluidPropertyData.ranges = fullRanges;
    }
  }

  return newDoc;
}

export { fillDocWithNullRanges, convertToFlat };
