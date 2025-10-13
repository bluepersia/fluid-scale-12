import {
  FluidData,
  FluidPropertyMetaData,
  FluidRange,
} from "../parsing/parser/docParser.types";

type GlobalState = {
  breakpoints: number[];
  fluidData: FluidData;
  allEls: Map<HTMLElement, ElementState>;
};

type ElementState = {
  el: HTMLElement;
  fluidProperties: FluidProperty[];
};

type FluidProperty = {
  metaData: FluidPropertyMetaData;
  ranges: (FluidRange | null)[];
};

type AddElementsContext = {
  breakpoints: number[];
  fluidData: FluidData;
};

type InsertFluidPropertiesForAnchorContext = AddElementsContext;

export type {
  GlobalState,
  ElementState,
  FluidProperty,
  AddElementsContext,
  InsertFluidPropertiesForAnchorContext,
};
