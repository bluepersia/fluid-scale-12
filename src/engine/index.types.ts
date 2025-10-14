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
  interObserverIsInitialized: boolean;
};

type ElementState = {
  el: HTMLElement;
  fluidProperties: FluidProperty[];
  isVisible: boolean;
  fluidPropertiesState: Map<string, FluidPropertyState>;
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

type UpdateElementContext = {
  breakpoints: number[];
  windowWidth: number;
};

type UpdateFluidPropertyContext = UpdateElementContext & {
  elState: ElementState;
};

type PropertyContext = {
  fluidProperty: FluidProperty;
};

type InterpolateValuesContext = UpdateFluidPropertyContext & {
  progress: number;
} & PropertyContext;

type ConvertToPixelsContext = UpdateFluidPropertyContext & PropertyContext;

export type {
  GlobalState,
  ElementState,
  FluidProperty,
  FluidPropertyState,
  AddElementsContext,
  InsertFluidPropertiesForAnchorContext,
  UpdateElementContext,
  UpdateFluidPropertyContext,
  ConvertToPixelsContext,
  InterpolateValuesContext,
};
