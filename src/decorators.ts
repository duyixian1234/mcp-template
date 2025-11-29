import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export interface ToolConfig {
  name: string;
  title?: string;
  description: string;
  inputSchema?: z.ZodType<any>;
}

export function McpTool(config: ToolConfig) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    if (!target.constructor._mcpTools) {
      target.constructor._mcpTools = [];
    }
    target.constructor._mcpTools.push({
      ...config,
      methodName: propertyKey,
    });
  };
}

export function registerMcpTools(server: McpServer, toolClasses: any[]) {
  for (const ToolClass of toolClasses) {
    const instance = new ToolClass();
    const tools = ToolClass._mcpTools || [];
    for (const tool of tools) {
      server.registerTool(
        tool.name,
        {
          title: tool.title || tool.name,
          description: tool.description,
          inputSchema: tool.inputSchema || z.object({}),
        },
        (args: any) => {
          return instance[tool.methodName](args);
        }
      );
    }
  }
}
