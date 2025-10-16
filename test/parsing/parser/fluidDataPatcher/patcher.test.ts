import { describe, test, expect } from "vitest";
import { deepClone } from "../../../utils/objectCloner";
import {
  applySpanEnd,
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

describe("applySpanEnd", () => {
  const testCases = [
    {
      styleRule: {
        specialProps: {
          "--span-end": "font-size, line-height",
        },
      },
      selector: ".product-card__body",
      ctx: {
        docResultState: {
          spans: {
            ".product-card__body": {
              "font-size": "1rem",
              "line-height": "1.5",
            },
          },
        },
      },
      expected: {
        spanEnds: [
          ["font-size", "1rem"],
          ["line-height", "1.5"],
        ],
        spans: { ".product-card__body": {} },
      },
    },
    {
      styleRule: {
        specialProps: {
          "--span-end": "padding, width",
        },
      },
      selector: ".product-card__body",
      ctx: {
        docResultState: {
          spans: {
            ".product-card__body": {
              "padding-top": "1rem",
              "padding-bottom": "1rem",
              "padding-right": "1.5rem",
              "padding-left": "1.5rem",
              width: "100%",
            },
          },
        },
      },
      expected: {
        spanEnds: [
          ["padding-top", "1rem"],
          ["padding-bottom", "1rem"],
          ["padding-right", "1.5rem"],
          ["padding-left", "1.5rem"],
          ["width", "100%"],
        ],
        spans: { ".product-card__body": {} },
      },
    },
    {
      styleRule: {
        specialProps: {
          "--span-end": "all",
        },
      },
      selector: ".product-card__body",
      ctx: {
        docResultState: {
          spans: {
            ".product-card__body": {
              "font-size": "1rem",
              "line-height": "1.5",
            },
          },
        },
      },
      expected: {
        spanEnds: [
          ["font-size", "1rem"],
          ["line-height", "1.5"],
        ],
        spans: { ".product-card__body": {} },
      },
    },
  ];
  test.each(testCases)(
    "should apply a span end fluid data insertion",
    (testCase) => {
      const { styleRule, selector, ctx, expected } = testCase;
      const result = applySpanEnd(styleRule as any, selector, ctx as any);
      expect(result).toEqual(expected);
    }
  );
});
