import { EngineMaster } from "../../../../engine/index.types";
import { docStructure } from "./docStruct";
import { master as parseDocMaster } from "../parsing/parser/index";
import { master as serializeDocMaster } from "../parsing/serialization/index";

const master: EngineMaster = {
  index: 0,
  docStructure,
  parseDocMaster,
  serializeDocMaster,
  breakpointsLength: 2,
};

export { master };
