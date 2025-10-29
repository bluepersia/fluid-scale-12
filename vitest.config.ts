// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    testTimeout: 20000,
    pool: "threads", // ensures multi-threading
    poolOptions: {
      threads: {
        singleThread: false, // ensure it’s not serial
        isolate: true, // isolate env per file
        maxThreads: 8, // optional — set CPU limit
      },
    },
    environment: "jsdom",
    setupFiles: ["./test/setup.ts"], // <-- runs at start
    // or setupFilesAfterEnv: ['./test/setupAfterEnv.ts'],
  },
});
