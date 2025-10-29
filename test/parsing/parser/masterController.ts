import {
  FluidData,
  FluidPropertyData,
} from "../../../src/parsing/parser/docParser.types";
import { deepClone } from "../../utils/objectCloner";

function stripOrderIDsForFluidData(fluidData: FluidData): FluidData {
  const newFluidData: FluidData = deepClone(fluidData);
  for (const [anchor, anchorData] of Object.entries(newFluidData)) {
    for (const [selector, selectorData] of Object.entries(anchorData)) {
      for (const [property, propertyData] of Object.entries(selectorData)) {
        newFluidData[anchor][selector][property] =
          stripOrderIDsForFluidDataProp(propertyData);
      }
    }
  }
  return newFluidData;
}

function stripOrderIDsForFluidDataProp(
  prop: FluidPropertyData
): FluidPropertyData {
  return {
    ...prop,
    metaData: {
      ...prop.metaData,
      orderID: -1,
    },
  };
}

function isAscendingOrderCorrect(fluidData: FluidData): boolean {
  let lastOrderID = -1;
  for (const [anchor, anchorData] of Object.entries(fluidData)) {
    for (const [selector, selectorData] of Object.entries(anchorData)) {
      for (const [property, propertyData] of Object.entries(selectorData)) {
        if (propertyData.metaData.orderID <= lastOrderID) return false;
      }
    }
  }
  return true;
}

export {
  stripOrderIDsForFluidData,
  stripOrderIDsForFluidDataProp,
  isAscendingOrderCorrect,
};
