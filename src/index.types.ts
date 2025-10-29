type Config = {
  jsonID?: string;
};

type FluidScaleConfig = {
  inputFiles: {
    [key: string]: string[];
  };
  outputDir?: string;
};

export type { Config, FluidScaleConfig };
