type Config = {
  jsonID?: string;
  startEngine?: boolean;
};

type FluidScaleConfig = {
  inputFiles: {
    [key: string]: string[];
  };
  outputDir?: string;
};

export type { Config, FluidScaleConfig };
