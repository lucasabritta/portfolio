import { buildBackendServer } from "./app";

function parsePort(input: string | undefined): number {
  if (!input) {
    return 4000;
  }

  const parsedPort = Number(input);

  if (!Number.isInteger(parsedPort) || parsedPort < 1 || parsedPort > 65535) {
    throw new Error(`Invalid PORT value: ${input}`);
  }

  return parsedPort;
}

const host = process.env.HOST && process.env.HOST.trim() ? process.env.HOST : "0.0.0.0";
const port = parsePort(process.env.PORT);

async function main() {
  const app = await buildBackendServer();
  let shuttingDown = false;

  const stopServer = async (signal: NodeJS.Signals) => {
    if (shuttingDown) {
      return;
    }

    shuttingDown = true;
    app.log.info({ signal }, "Shutting down backend server");

    try {
      await app.close();
      process.exit(0);
    } catch (error) {
      app.log.error({ error }, "Failed to shutdown backend server cleanly");
      process.exit(1);
    }
  };

  process.on("SIGINT", () => {
    void stopServer("SIGINT");
  });
  process.on("SIGTERM", () => {
    void stopServer("SIGTERM");
  });

  await app.listen({ host, port });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
