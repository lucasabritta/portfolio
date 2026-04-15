import Fastify from "fastify";

import { createCvPdfDownloadPayload } from "./cv-pdf-download-response";

export async function buildBackendServer() {
  const app = Fastify({
    logger: true,
  });

  app.get("/api/health", async () => {
    return { ok: true };
  });

  app.get("/api/cv", async (_request, reply) => {
    const payload = await createCvPdfDownloadPayload();

    for (const [headerName, headerValue] of Object.entries(payload.headers)) {
      reply.header(headerName, headerValue);
    }

    return reply.status(payload.status).send(Buffer.from(payload.body));
  });

  return app;
}
