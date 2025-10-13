import {
  addElementsToState,
  initEngineState,
  addElements as addElementsToEngine,
  getState,
  wrap as wrapEngine,
  insertFluidPropertiesForAnchor,
} from "./engine";
import { parseDocument } from "./parsing/parser/docParser";
import { serializeDocument } from "./parsing/serialization/docSerializer";

let addElements = (els: Node[]): void => {
  const htmlEls = els.filter(
    (el) => el instanceof HTMLElement
  ) as HTMLElement[];

  const globalState = getState();
  const { allEls } = globalState;
  const toAddEls = addElementsToEngine(htmlEls, allEls, globalState);
  addElementsToState(toAddEls);
};

let init = (): void => {
  const docClone = serializeDocument(document, { isBrowser: true });

  const { breakpoints, fluidData } = parseDocument(docClone);

  initEngineState(breakpoints, fluidData);

  const allElements = Array.from(document.querySelectorAll("*"));
  addElements(allElements);
};

function wrap(
  addElementsWrapped: typeof addElements,
  initWrapped: typeof init,
  addElementsEngineWrapped: typeof addElementsToEngine,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor
) {
  addElements = addElementsWrapped;
  init = initWrapped;
  wrapEngine(addElementsEngineWrapped, insertFluidPropertiesForAnchorWrapped);
}

export { addElements, init, wrap };

export default init;
