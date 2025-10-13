import { FluidPropertyData } from "../../src/parsing/parser/docParser.types";
import { RuntimeGoldenDoc } from "./index.types";

function fillDocWithNullRanges(
  doc: RuntimeGoldenDoc,
  breakpointsLength: number
) {
  const newDoc: RuntimeGoldenDoc = {};

  for (const [goldenId, fluidPropertyDatas] of Object.entries(doc)) {
    const newFluidPropertyDatas: FluidPropertyData[] = [];
    for (const fluidPropertyData of fluidPropertyDatas) {
      const newFluidPropertyData: FluidPropertyData = { ...fluidPropertyData };

      const fullRanges = new Array(breakpointsLength).fill(null);
      for (const range of fluidPropertyData.ranges) {
        fullRanges[range.minBpIndex] = range;
      }
      newFluidPropertyData.ranges = fullRanges;
      newFluidPropertyDatas.push(newFluidPropertyData);
    }
    newDoc[goldenId] = newFluidPropertyDatas;
  }
  return newDoc;
}

export { fillDocWithNullRanges };
