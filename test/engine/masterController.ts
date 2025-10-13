import { FluidProperty } from "../../src/engine/index.types";
import {
  FluidPropertyData,
  FluidRange,
} from "../../src/parsing/parser/docParser.types";
import { deepClone } from "../utils/objectCloner";
import { RuntimeGoldenDoc, RuntimeGoldenDocFlat } from "./index.types";

function convertToFlat(doc: RuntimeGoldenDoc) {
  const newDoc: RuntimeGoldenDocFlat = {};

  for (const [goldenId, elData] of Object.entries(doc)) {
    const elProperties = [] as FluidProperty[];
    for (const [anchor, selectorData] of Object.entries(elData)) {
      for (const [selector, fluidProperties] of Object.entries(selectorData)) {
        elProperties.push(...fluidProperties);
      }
    }
    newDoc[goldenId] = elProperties;
  }

  return newDoc;
}

function fillDocWithNullRanges(
  doc: RuntimeGoldenDoc,
  breakpointsLength: number
) {
  const newDoc: RuntimeGoldenDoc = deepClone(doc);

  for (const anchorData of Object.values(newDoc)) {
    for (const selectorData of Object.values(anchorData)) {
      for (const [selector, fluidProperties] of Object.entries(selectorData)) {
        for (const fluidProperty of fluidProperties) {
          const fullRanges = new Array(breakpointsLength).fill(
            null
          ) as FluidRange[];
          for (const range of fluidProperty.ranges as FluidRange[]) {
            fullRanges[range.minBpIndex] = range;
          }
          fluidProperty.ranges = fullRanges;
        }
      }
    }
  }

  return newDoc;
}

export { fillDocWithNullRanges, convertToFlat };
