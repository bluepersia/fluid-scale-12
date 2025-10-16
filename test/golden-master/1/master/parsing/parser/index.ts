import { ParseDocMaster } from "../../../../../parsing/parser/index.types";
import { clearNullsForDoc } from "../../../../../parsing/serialization/masterController";
import { docClone } from "../serialization/docClone/docClone";
import { ruleBatches } from "./batches/batches";
import { fluidData } from "./fluidData/fluidData";
import { spans } from "./spans";

const master: ParseDocMaster = {
  index: 1,
  baselineWidths: new Array(8).fill(375),
  breakpoints: [375, 768, 1200],
  inputDoc: clearNullsForDoc(docClone),
  ruleBatches,
  fluidData,
  spans,
};

export { master };
