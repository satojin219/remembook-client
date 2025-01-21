import { configure, defineConfig } from "@trigger.dev/sdk/v3";
import { syncVercelEnvVars } from "@trigger.dev/build/extensions/core";

configure({
  secretKey: process.env.TRIGGER_SECRET_KEY,
});

export default defineConfig({
  project: "proj_oxgdsubmosfedtvmphqa",
  runtime: "node",
  logLevel: "log",
  // The max compute seconds a task is allowed to run. If the task run exceeds this duration, it will be stopped.
  // You can override this on an individual task.
  // See https://trigger.dev/docs/runs/max-duration
  maxDuration: 3600,
  retries: {
    enabledInDev: true,
    default: {
      maxAttempts: 3,
      minTimeoutInMs: 1000,
      maxTimeoutInMs: 10000,
      factor: 2,
      randomize: true,
    },
  },
  dirs: ["./src/trigger"],
  build: {
    extensions: [
      syncVercelEnvVars({
        projectId: process.env.VERCEL_PROJECT_ID,
        vercelAccessToken: process.env.VERCEL_ACCESS_TOKEN,
      }),
    ],
  },
});
