import { describe, it, test, expect } from "vitest";
import fs from "fs";
import { masterCollection } from "../parsing/parser/masterCollection";
import {
  build,
  generateJSDOMDocument,
  loadConfig,
  resolvePath,
} from "../../src/parsing/json-builder";
import path from "path";
import { FluidScaleConfig } from "../../src/index.types";
import { ParseDocResults } from "../../src/parsing/parser/docParser.types";
import {
  isAscendingOrderCorrect,
  stripOrderIDsForFluidData,
} from "./parser/masterController";

const resolvePathTests = [
  {
    cssPath: "./css/global.css",
    htmlFilePath: "test/golden-master/0/index.html",
    expected: "css/global.css",
  },
  {
    cssPath: "css/utils.css",
    htmlFilePath: "test/golden-master/0/index.html",
    expected: "css/utils.css",
  },
  {
    cssPath:
      "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap",
    htmlFilePath: "test/golden-master/0/index.html",
    expected: null,
  },
];

describe("resolvePath", () => {
  test.each(resolvePathTests)(
    "should resolve the path",
    ({ cssPath, htmlFilePath, expected }) => {
      const finalExpected = expected
        ? path.resolve(path.dirname(htmlFilePath), expected)
        : null;
      expect(resolvePath(cssPath, htmlFilePath)).toBe(finalExpected);
    }
  );
});

describe("generateJSDOMDocument", () => {
  it("should generate a JSDOM document", () => {
    const document = generateJSDOMDocument(["test/golden-master/0/index.html"]);
    expect(document).toBeDefined();
    expect(document.styleSheets).toHaveLength(3);
    expect(document.styleSheets[0].cssRules).toHaveLength(6);
    expect(document.styleSheets[1].cssRules).toHaveLength(1);
    expect(document.styleSheets[2].cssRules).toHaveLength(14);
  });
});

describe("loadConfig", () => {
  it("should load the config", () => {
    const config = loadConfig("test/golden-master/0/fluid-scale.config.json");
    expect(config).toBeDefined();
  });
});

describe("build", () => {
  test.each(masterCollection)("should build the document", (master) => {
    const { index } = master;
    const configPath = `test/golden-master/${index}/fluid-scale.config.json`;
    const config = JSON.parse(
      fs.readFileSync(configPath, "utf8")
    ) as FluidScaleConfig;

    build(configPath);

    for (const [key, value] of Object.entries(config.inputFiles)) {
      const outputFile = path.resolve(
        process.cwd(),
        config.outputDir!,
        `${key}.json`
      );

      const fluidScaleJson: ParseDocResults = JSON.parse(
        fs.readFileSync(outputFile, "utf8")
      ) as ParseDocResults;

      expect(isAscendingOrderCorrect(fluidScaleJson.fluidData)).toBe(true);

      fluidScaleJson.fluidData = stripOrderIDsForFluidData(
        fluidScaleJson.fluidData
      );

      expect(fluidScaleJson).toEqual({
        breakpoints: master.breakpoints,
        fluidData: stripOrderIDsForFluidData(master.fluidData),
      });
    }
  });
});
