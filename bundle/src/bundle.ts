import { getQueue } from "gold-sight";
import {
  wrapAll as wrapAllSerializeDoc,
  serializeDocAssertionMaster,
} from "../../test/parsing/serialization/gold-sight";
wrapAllSerializeDoc();

import { serializeDocument } from "../../src/parsing/serialization/serializer";

export { getQueue, serializeDocAssertionMaster, serializeDocument };
