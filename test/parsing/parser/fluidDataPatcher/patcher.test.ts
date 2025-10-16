import { describe, test, expect } from "vitest";
import { deepClone } from "../../../utils/objectCloner";
import { applySpanStart } from "../../../../src/parsing/parser/fluidDataPatcher";

describe("applySpanStart", () => {
  const cases = [
    {
      property: "font-size",
      styleRule: {
        style: {
          "font-size": "14px",
          height: "20rem",
        },
        specialProps: {
          "--span-start": "font-size",
        },
      },
      ctx: {
        selector: ".product-card",
        docResultState: {
          spans: {
            ".other-item": {
              height: "20rem",
            },
          },
        },
      },
      expected: {
        spans: {
          ".product-card": {
            "font-size": "14px",
          },
          ".other-item": {
            height: "20rem",
          },
        },
      },
    },
    {
      property: "width",
      styleRule: {
        style: {
          width: "20rem",
          "font-size": "1rem",
          height: "30rem",
          "line-height": "1.6",
        },
        specialProps: {
          "--span-start": "width, font-size",
        },
      },
      ctx: {
        selector: ".product-inner",
        docResultState: {
          spans: {
            ".other-item": {
              height: "20rem",
            },
          },
        },
      },
      expected: {
        spans: {
          ".product-inner": {
            width: "20rem",
          },
          ".other-item": {
            height: "20rem",
          },
        },
      },
    },
  ];

  cases.push(deepClone(cases[cases.length - 1]));
  const lastCase = cases[cases.length - 1];
  lastCase.property = "font-size";
  lastCase.ctx.docResultState.spans = cases[1].expected.spans;
  lastCase.expected.spans[".product-inner"]!["font-size"] = "1rem";

  cases.push(deepClone(cases[0]));
  cases[cases.length - 1].styleRule.specialProps["--span-start"] = "all";

  cases.push(deepClone(cases[1]));
  cases[cases.length - 1].styleRule.specialProps["--span-start"] = "all";

  test.each(cases)("should apply the span start", (testCase) => {
    const { styleRule, property, ctx } = testCase;

    const result = applySpanStart(
      styleRule as any,
      property as any,
      ctx as any
    );

    const { expected } = testCase;

    expect(result).toEqual(expected);
  });
});
