import { getQueue } from "gold-sight";
import {
  wrapAll as wrapAllSerializeDoc,
  serializeDocAssertionMaster,
} from "../../test/parsing/serialization/gold-sight/gold-sight";

wrapAllSerializeDoc();

import { serializeDocument } from "../../src/parsing/serialization/docSerializer";

import {
  parseDocAssertionMaster,
  wrapAll as wrapAllParseDoc,
} from "../../test/parsing/parser/gold-sight";

wrapAllParseDoc();

import {
  wrapAll as wrapAllEngine,
  engineAssertionMaster,
} from "../../test/engine/gold-sight";

wrapAllEngine();

import { init } from "../../src/index";

export {
  getQueue,
  serializeDocAssertionMaster,
  serializeDocument,
  parseDocAssertionMaster,
  init,
  engineAssertionMaster,
};
