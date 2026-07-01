import { Container } from "@cloudflare/containers";

export class DailyHotContainer extends Container {
  defaultPort = 6688;
  requiredPorts = [6688];
  sleepAfter = "10m";
  enableInternet = true;
  envVars = {
    PORT: "6688",
    NODE_ENV: "docker",
    USE_LOG_FILE: "false",
    ALLOWED_DOMAIN: "*",
  };
}

interface Env {
  DAILYHOT: DurableObjectNamespace<DailyHotContainer>;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const container = env.DAILYHOT.getByName("singleton");
    await container.startAndWaitForPorts();
    return container.fetch(request);
  },
};
