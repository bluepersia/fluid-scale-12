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

import {
  engineUpdateAssertionMaster,
  wrapAll as wrapAllEngineUpdate,
} from "../../test/engine/updater/gold-sight";

wrapAllEngineUpdate();

import { readPropertyValue, update } from "../../src/engine/engineUpdater";

import { waitUntil } from "../../src/utils/waitUntil";
import { getState } from "../../src/engine/engineState";

export {
  getQueue,
  serializeDocAssertionMaster,
  serializeDocument,
  parseDocAssertionMaster,
  init,
  engineAssertionMaster,
  readPropertyValue,
  update,
  engineUpdateAssertionMaster,
  waitUntil,
  getState,
};
