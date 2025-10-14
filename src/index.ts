import {
  addElements as addElementsToEngine,
  wrap as wrapEngine,
  insertFluidPropertiesForAnchor,
  assignParentEls,
} from "./engine/engineSetup";
import {
  getState,
  observeElements,
  initEngineState,
  addElementsToState,
} from "./engine/engineState";
import { update } from "./engine/engineUpdater";
import { Config } from "./index.types";
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
  assignParentEls();
  observeElements(toAddEls.map((el) => el.el));
};

let init = (config?: Config): void => {
  config = {
    startEngine: true,
    ...(config ?? {}),
  };
  const docClone = serializeDocument(document, { isBrowser: true });

  const { breakpoints, fluidData } = parseDocument(docClone);

  initEngineState(breakpoints, fluidData, config);

  const allElements = Array.from(document.querySelectorAll("*"));
  addElements(allElements);

  if (config.startEngine) {
    requestAnimationFrame(update);
  }
};

function wrap(
  addElementsWrapped: typeof addElements,
  initWrapped: typeof init,
  addElementsEngineWrapped: typeof addElementsToEngine,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor,
  assignParentElsWrapped: typeof assignParentEls
) {
  addElements = addElementsWrapped;
  init = initWrapped;
  wrapEngine(
    addElementsEngineWrapped,
    insertFluidPropertiesForAnchorWrapped,
    assignParentElsWrapped
  );
}

export { addElements, init, wrap };

export default init;
