import { describe, test, expect } from "vitest";
import { masterCollection } from "./masterCollection";
import { parseDocAssertionMaster } from "./gold-sight";

import { parseDocument } from "../../../src/parsing/parser/docParser";
import {
  getAnchor,
  parseFluidValue,
  parseFluidValue1D,
  parseFluidValue2D,
} from "../../../src/parsing/parser/fluidDataPatcher";
import { splitSelectors } from "../../../../FluidScaleB5/src/parse/parse";

describe("parseDocument", () => {
  test.each(masterCollection)("should parse the document", (master) => {
    const { index, inputDoc } = master;
    parseDocAssertionMaster.master = master;
    parseDocument(inputDoc);
    parseDocAssertionMaster.assertQueue();
  });
});

describe("make fluid value", () => {
  const parseSingleFluidValueTests = [
    {
      value: "10px",
      expected: {
        value: 10,
        unit: "px",
        type: "single",
      },
    },
    {
      value: "2.2rem",
      expected: {
        value: 2.2,
        unit: "rem",
        type: "single",
      },
    },
  ];
  test.each(parseSingleFluidValueTests)(
    "should make a fluid value from single value",
    (testCase) => {
      const { value, expected } = testCase;

      const result = parseFluidValue(value);

      expect(result).toEqual(expected);
    }
  );

  const parse1DFluidValueArrayTests = [
    {
      value: "10px 20px",
      expected: [
        { value: 10, unit: "px", type: "single" },
        { value: 20, unit: "px", type: "single" },
      ],
    },
    {
      value: "2.2rem 3.3rem",
      expected: [
        { value: 2.2, unit: "rem", type: "single" },
        { value: 3.3, unit: "rem", type: "single" },
      ],
    },
  ];
  test.each(parse1DFluidValueArrayTests)(
    "should make a 1D fluid value array from 1D values",
    (testCase) => {
      const { value, expected } = testCase;
      const result = parseFluidValue1D(value);

      expect(result).toEqual(expected);
    }
  );

  const parse2DFluidValueArrayTests = [
    {
      value: "10px 20px, 30px 40px",
      expected: [
        [
          { value: 10, unit: "px", type: "single" },
          { value: 20, unit: "px", type: "single" },
        ],
        [
          { value: 30, unit: "px", type: "single" },
          { value: 40, unit: "px", type: "single" },
        ],
      ],
      property: "padding",
    },
    {
      value: "20px 3.3rem, 4.4px 5.5rem",
      expected: [
        [
          { value: 20, unit: "px", type: "single" },
          { value: 3.3, unit: "rem", type: "single" },
        ],
        [
          { value: 4.4, unit: "px", type: "single" },
          { value: 5.5, unit: "rem", type: "single" },
        ],
      ],
      property: "width",
    },
    {
      value: "repeat(auto-fit, minmax(21.43rem, 1fr))",
      property: "grid-template-columns",
      expected: "repeat(auto-fit, minmax(21.43rem, 1fr))",
    },
  ];
  test.each(parse2DFluidValueArrayTests)(
    "should make a 2D fluid value array from 2D values",
    (testCase) => {
      const { value, expected, property } = testCase;
      const result = parseFluidValue2D(value, { property });

      expect(result).toEqual(expected);
    }
  );
});

describe("splitSelectors", () => {
  const splitSelectorsTests = [
    {
      selectors: ".product-card__price--actual, .product-card__price--original",
      expected: [
        ".product-card__price--actual",
        ".product-card__price--original",
      ],
    },
    {
      selectors: ".product-card__price--actual",
      expected: [".product-card__price--actual"],
    },
  ];

  test.each(splitSelectorsTests)(
    "should split selectors",
    (propertyExpectations) => {
      const { selectors, expected } = propertyExpectations;

      const result = splitSelectors(selectors);

      expect(result).toEqual(expected);
    }
  );
});

describe("getAnchor", () => {
  const getAnchorTests = [
    {
      selector: ".product-card",
      expected: ".product-card",
    },
    {
      selector: ".product-card .inner .title",
      expected: ".title",
    },
  ];
  test.each(getAnchorTests)("should get the anchor", (testCase) => {
    const { selector, expected } = testCase;
    const result = getAnchor(selector);
    expect(result).toEqual(expected);
  });
});
