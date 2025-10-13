import {
  FluidData,
  FluidPropertyMetaData,
  FluidRange,
} from "../parsing/parser/docParser.types";

type GlobalState = {
  breakpoints: number[];
  fluidData: FluidData;
  elsObserving: Set<HTMLElement>;
  allEls: Map<HTMLElement, ElementState>;
  visibleEls: Set<ElementState>;
  pendingHiddenEls: Set<ElementState>;
  windowWidth: number;
};

type ElementState = {
  el: HTMLElement;
  fluidProperties: FluidProperty[];
  isVisible: boolean;
  parentEl: ElementState | undefined;
};

type FluidPropertyState = {
  property: string;
  value: string;
  orderID: number;
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
  FluidPropertyState,
  AddElementsContext,
  InsertFluidPropertiesForAnchorContext,
};
