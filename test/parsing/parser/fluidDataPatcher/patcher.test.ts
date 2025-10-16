import { describe, test, expect } from "vitest";
import { deepClone } from "../../../utils/objectCloner";
import {
  applySpanStart,
  propListContains,
} from "../../../../src/parsing/parser/fluidDataPatcher";
import { parsePropsValues } from "../../../../src/parsing/parser/fluidDataPatcher";

describe("parsePropsValues", () => {
  test("should parse the property list", () => {
    expect(parsePropsValues("font-size, line-height")).toEqual([
      "font-size",
      "line-height",
    ]);
    expect(parsePropsValues("font-size, line-height, all")).toEqual([
      "font-size",
      "line-height",
      "all",
    ]);
    expect(parsePropsValues("font-size, line-height, width")).toEqual([
      "font-size",
      "line-height",
      "width",
    ]);
  });
});
describe("propListContains", () => {
  test("should return true if the property is in the list", () => {
    expect(propListContains(["font-size", "line-height"], "font-size")).toBe(
      true
    );
    expect(propListContains(["font-size", "line-height"], "line-height")).toBe(
      true
    );
    expect(propListContains(["font-size", "line-height"], "width")).toBe(false);
    expect(propListContains(["all"], "line-height")).toBe(true);
  });
});
