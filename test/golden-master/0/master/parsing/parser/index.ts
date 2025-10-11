import { ParseDocMaster } from "../../../../../parsing/parser/index.types";
import { clearNullsForDoc } from "../../../../../parsing/serialization/masterController";
import { docClone } from "../serialization/docClone";
import { ruleBatches } from "./batches";

const master: ParseDocMaster = {
  index: 0,
  baselineWidths: [375, 375, 375],
  breakpoints: [375, 600],
  inputDoc: clearNullsForDoc(docClone),
  ruleBatches,
};

export { master };
