# MCP Server Template (Hono.js)

This is a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server template based on [Hono.js](https://hono.dev/). It provides a simple, type-safe way to build and deploy MCP tools.

## Features

- 🚀 **Hono.js Based**: Lightweight, high-performance Web framework.
- 🛠️ **Decorator Driven**: Easily define tools using the `@McpTool` decorator.
- 🔒 **Type Safe**: Define input schemas using [Zod](https://zod.dev/).
- ☁️ **Vercel Ready**: Pre-configured for Vercel deployment.

## Quick Start

### Local Development

```bash
pnpm install
pnpm vc dev
```

The server will start at `http://localhost:3000`.

### Deployment

```bash
pnpm install
pnpm vc deploy
```

## How to Add a New MCP Tool

This template uses a class and decorator pattern to define tools.

### 1. Create a Tool Class

Create a new file in the `src/tools/` directory (e.g., `src/tools/my-tool.ts`) and define a class.

### 2. Use the `@McpTool` Decorator

Use the `@McpTool` decorator on a class method to register it as an MCP tool. You need to provide the tool's name, description, and input Schema (using Zod).

```typescript
import { z } from "zod";
import { McpTool } from "../decorators.js";

export class MyTool {
  @McpTool({
    name: "greet",
    title: "Greeting Tool",
    description: "Greet a user by name",
    inputSchema: z.object({
      name: z.string().describe("The name of the user"),
    }),
  })
  greet({ name }: { name: string }) {
    return {
      content: [
        {
          type: "text",
          text: `Hello, ${name}!`,
        },
      ],
    };
  }
}
```

### 3. Register the Tool

Import your tool class in `src/tools/index.ts` and add it to the `tools` array.

```typescript
import { ArithmeticTool } from "./arthmetic.js";
import { MyTool } from "./my-tool.js"; // Import your tool

export const tools = [
  ArithmeticTool,
  MyTool, // Add to the list
];
```

That's it! Your new tool will be automatically registered and accessible via the MCP protocol.
