import { ParseDocResults } from "../parsing/parser/docParser.types";
import { getState, setInterObserverIsInitialized } from "./engineState";
import {
  addHiddenElement,
  addVisibleElement,
  removeHiddenElement,
  removeVisibleElement,
} from "./engineState";
import {
  AddElementsContext,
  ElementState,
  FluidProperty,
  InsertFluidPropertiesForAnchorContext,
} from "./index.types";

const intersectionObserver = new IntersectionObserver(handleIntersection);

function handleIntersection(entries: IntersectionObserverEntry[]) {
  for (const entry of entries.filter(
    (entry) => entry.target instanceof HTMLElement
  )) {
    const el = entry.target as HTMLElement;
    const elState = getState().allEls.get(el);
    if (!elState) continue;
    if (entry.isIntersecting) {
      addVisibleElement(elState);
      removeHiddenElement(elState);
      elState.isVisible = true;
    } else {
      addHiddenElement(elState);
      removeVisibleElement(elState);
      elState.isVisible = false;
    }
  }
  setInterObserverIsInitialized();
}

const insertFluidPropertiesForAnchorRouter = [
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    const classes = el.classList;
    const fluidProperties: FluidProperty[] = [];
    for (const className of classes) {
      fluidProperties.push(
        ...insertFluidPropertiesForAnchor(`.${className}`, el, ctx)
      );
    }
    return fluidProperties;
  },
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    if (!el.id) return [];
    return insertFluidPropertiesForAnchor(`#${el.id}`, el, ctx);
  },
  (el: HTMLElement, ctx: InsertFluidPropertiesForAnchorContext) => {
    return insertFluidPropertiesForAnchor(el.tagName.toLowerCase(), el, ctx);
  },
];

let addElements = (
  els: HTMLElement[],
  allEls: Map<HTMLElement, ElementState>,
  ctx: AddElementsContext
): ElementState[] => {
  const toAddEls: ElementState[] = [];

  for (const el of els) {
    if (allEls.has(el)) continue;

    const elState: ElementState = {
      el,
      fluidProperties: [],
      isVisible: false,
      parentEl: undefined,
      fluidPropertiesState: new Map(),
    };
    let fluidProperties: FluidProperty[] = elState.fluidProperties;

    for (const anchorRoute of insertFluidPropertiesForAnchorRouter) {
      fluidProperties.push(...anchorRoute(el, ctx));
    }

    fluidProperties = elState.fluidProperties =
      filterForcedProperties(fluidProperties);

    if (fluidProperties.length <= 0) continue;

    toAddEls.push(elState);
  }

  return toAddEls;
};

let insertFluidPropertiesForAnchor = (
  anchor: string,
  el: HTMLElement,
  ctx: InsertFluidPropertiesForAnchorContext
): FluidProperty[] => {
  const { fluidData, breakpoints } = ctx;

  const anchorData = fluidData[anchor];
  if (!anchorData) return [];

  const fluidProperties: FluidProperty[] = [];
  for (const [selector, selectorData] of Object.entries(anchorData)) {
    if (!el.matches(selector)) continue;

    for (const [, propertyData] of Object.entries(selectorData)) {
      const ranges = new Array(breakpoints.length).fill(null);
      const newFluidProperty: FluidProperty = {
        metaData: propertyData.metaData,
      };

      if (propertyData.ranges) {
        for (const range of propertyData.ranges) {
          ranges[range.minBpIndex] = range;
        }
        newFluidProperty.ranges = ranges;
      } else if (propertyData.forceValue) {
        newFluidProperty.forceValue = propertyData.forceValue;
      }

      fluidProperties.push(newFluidProperty);
    }
  }

  return fluidProperties;
};

let filterForcedProperties = (
  fluidProperties: FluidProperty[]
): FluidProperty[] => {
  const uniqueFluidProperties = new Set(
    fluidProperties.map((fp) => fp.metaData.property)
  );

  for (const property of uniqueFluidProperties) {
    const count = fluidProperties.reduce(
      (acc, fp) =>
        fp.metaData.property === property && !fp.metaData.isForce
          ? acc + 1
          : acc,
      0
    );
    if (count === 0) {
      fluidProperties = fluidProperties.filter(
        (fp) => fp.metaData.property !== property
      );
    }
  }

  return fluidProperties;
};

let assignParentEls = () => {
  const { allEls } = getState();
  for (const elState of allEls.values()) {
    const { el } = elState;
    const parentEl = el.parentElement;
    if (parentEl) {
      elState.parentEl = allEls.get(parentEl);
    }
  }
};

async function loadJSDOMData(jsonID: string): Promise<ParseDocResults> {
  const raw = await fetch(`/fluid-scale/${jsonID}.json`);
  const json = await raw.json();
  return json as ParseDocResults;
}

function wrap(
  addElementsWrapped: typeof addElements,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor,
  assignParentElsWrapped: typeof assignParentEls
) {
  addElements = addElementsWrapped;
  insertFluidPropertiesForAnchor = insertFluidPropertiesForAnchorWrapped;
  assignParentEls = assignParentElsWrapped;
}

export {
  handleIntersection,
  insertFluidPropertiesForAnchorRouter,
  addElements,
  insertFluidPropertiesForAnchor,
  assignParentEls,
  intersectionObserver,
  wrap,
  loadJSDOMData,
};
