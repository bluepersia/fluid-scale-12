import { SerializeDocMaster } from "../../../../../parsing/serialization/index.types";
import { docClone } from "./docClone/docClone";

const master: SerializeDocMaster = {
  index: 1,
  docClone,
};

export { master };
