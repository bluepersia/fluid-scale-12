import {
  addElements as addElementsToEngine,
  wrap as wrapEngine,
  insertFluidPropertiesForAnchor,
  assignParentEls,
  loadJSDOMData,
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
import { ParseDocResults } from "./parsing/parser/docParser.types";
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

let loadParseDocResults = async (jsonID?: string): Promise<ParseDocResults> => {
  if (jsonID) {
    return await loadJSDOMData(jsonID);
  } else {
    const docClone = serializeDocument(document, { isBrowser: true });
    return parseDocument(docClone);
  }
};
let isInitialized = false;

let init = async (config?: Config): Promise<void> => {
  config = {
    ...(config ?? {}),
  };

  const parseDocResults: ParseDocResults = await loadParseDocResults(
    config.jsonID
  );
  if (!parseDocResults) throw new Error("Failed to parse document");

  const { breakpoints, fluidData } = parseDocResults;

  initEngineState(breakpoints, fluidData, config);

  const allElements = Array.from(document.querySelectorAll("*"));
  addElements(allElements);

  if (isInitialized) return;
  isInitialized = true;

  if (!(window as any).dontStartEngine) {
    requestAnimationFrame(update);
  }
};

function wrap(
  addElementsWrapped: typeof addElements,
  initWrapped: typeof init,
  addElementsEngineWrapped: typeof addElementsToEngine,
  insertFluidPropertiesForAnchorWrapped: typeof insertFluidPropertiesForAnchor,
  assignParentElsWrapped: typeof assignParentEls,
  loadParseDocResultsWrapped: typeof loadParseDocResults
) {
  addElements = addElementsWrapped;
  init = initWrapped;
  loadParseDocResults = loadParseDocResultsWrapped;
  wrapEngine(
    addElementsEngineWrapped,
    insertFluidPropertiesForAnchorWrapped,
    assignParentElsWrapped
  );
}

export { addElements, init, wrap, loadParseDocResults };

export default init;
