import path from "path";
import fs from "fs";
import { JSDOM } from "jsdom";
import { FluidScaleConfig } from "../index.types";
import { serializeDocument } from "./serialization/docSerializer";
import { parseDocument } from "./parser/docParser";
import { normalizeDoc } from "./serialization/normalizer";

function getArg(name: string): string | undefined {
  const arg = process.argv.find((a) => a.startsWith(`--${name}=`));
  if (arg) return arg.split("=")[1];
}

const isExecutedDirectly = import.meta.url === `file://${process.argv[1]}`;

if (isExecutedDirectly) init();

function init() {
  build(getArg("config"));
}

function build(configPath?: string) {
  const config = loadConfig(configPath);

  for (const [key, value] of Object.entries(config.inputFiles)) {
    const document = generateJSDOMDocument(value);

    let serializedDoc = serializeDocument(document, { isBrowser: false });

    if (!isExecutedDirectly) serializedDoc = normalizeDoc(serializedDoc);

    const parseDocResults = parseDocument(serializedDoc);

    const outputDir = path.resolve(
      process.cwd(),
      config.outputDir || "public/fluid-scale"
    );
    fs.mkdirSync(outputDir, { recursive: true });

    const outputFile = path.resolve(outputDir, `${key}.json`);
    fs.writeFileSync(outputFile, JSON.stringify(parseDocResults, null, 2));
  }
}

function loadConfig(filePath?: string): FluidScaleConfig {
  let finalFilePath = path.resolve(
    process.cwd(),
    filePath || "fluid-scale.config.json"
  );
  if (!fs.existsSync(finalFilePath)) {
    throw new Error(`Config file not found: ${finalFilePath}`);
  }
  const config = JSON.parse(fs.readFileSync(finalFilePath, "utf8"));
  return config as FluidScaleConfig;
}

function resolvePath(cssPath: string, htmlFilePath: string) {
  if (/^(https?:)?\/\//.test(cssPath)) {
    // External URL or CDN
    return null;
  }
  if (!cssPath.startsWith("/"))
    return path.resolve(path.dirname(htmlFilePath), cssPath);

  return cssPath;
}

function generateJSDOMDocument(inputFiles: string[]) {
  const cssFiles = inputFiles.filter((file) => file.endsWith(".css"));
  for (const file of inputFiles) {
    const content = fs.readFileSync(file).toString();

    if (file.endsWith(".html"))
      cssFiles.push(
        ...([...content.matchAll(/<link\s+[^>]*href=["']([^"']+\.css)["']/g)]
          .map((m) => resolvePath(m[1], file))
          .filter((m) => m !== null) as string[])
      );
  }
  let html = "<!DOCTYPE html><html><head>";

  for (let cssFile of cssFiles) {
    const cssContent = fs.readFileSync(cssFile, "utf8");
    html += `<style>${cssContent}</style>`;
  }

  html += "</head><body></body></html>";

  const dom = new JSDOM(html);
  const document = dom.window.document;

  return document;
}

export { generateJSDOMDocument, resolvePath, loadConfig, build };
