import {
  addElementsToState,
  initEngineState,
  addElements as addElementsToEngine,
  getState,
} from "./engine";
import { parseDocument } from "./parsing/parser/docParser";
import { serializeDocument } from "./parsing/serialization/docSerializer";

function addElements(els: Node[]) {
  const htmlEls = els.filter(
    (el) => el instanceof HTMLElement
  ) as HTMLElement[];

  const globalState = getState();
  const { allEls } = globalState;
  const toAddEls = addElementsToEngine(htmlEls, allEls, globalState);
  addElementsToState(toAddEls);
}

function init() {
  const docClone = serializeDocument(document, { isBrowser: true });

  const { breakpoints, fluidData } = parseDocument(docClone);

  initEngineState(breakpoints, fluidData);

  const allElements = Array.from(document.querySelectorAll("*"));
  addElements(allElements);
}

export default init;
