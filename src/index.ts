import { Hono } from "hono";
import { contextStorage } from "hono/context-storage";
import { createMcpHandler } from "mcp-handler";
import { registerMcpTools } from "./decorators.js";
import { tools } from "./tools/index.js";

const app = new Hono();

app.use(contextStorage());

const handler = createMcpHandler((server) => {
  registerMcpTools(server, tools);
});

app.all("/mcp/*", async (c) => {
  return await handler(c.req.raw);
});

export default app;
