import z from "zod";
import { McpTool } from "../decorators.js";

export class ArithmeticTool {
  @McpTool({
    name: "add",
    title: "Addition Tool",
    description: "Add two numbers",
    inputSchema: z.object({
      a: z.number().describe("The first number to add"),
      b: z.number().describe("The second number to add"),
    }),
  })
  add({ a, b }: { a: number; b: number }) {
    return { content: [{ type: "text", text: (a + b).toString() }] };
  }

  @McpTool({
    name: "sub",
    title: "Subtraction Tool",
    description: "Subtract two numbers",
    inputSchema: z.object({
      a: z.number().describe("The number to subtract from"),
      b: z.number().describe("The number to subtract"),
    }),
  })
  sub({ a, b }: { a: number; b: number }) {
    return { content: [{ type: "text", text: (a - b).toString() }] };
  }

  @McpTool({
    name: "mul",
    title: "Multiplication Tool",
    description: "Multiply two numbers",
    inputSchema: z.object({
      a: z.number().describe("The first number to multiply"),
      b: z.number().describe("The second number to multiply"),
    }),
  })
  mul({ a, b }: { a: number; b: number }) {
    return { content: [{ type: "text", text: (a * b).toString() }] };
  }

  @McpTool({
    name: "div",
    title: "Division Tool",
    description: "Divide two numbers",
    inputSchema: z.object({
      a: z.number().describe("The dividend"),
      b: z.number().describe("The divisor(cannot be zero)"),
    }),
  })
  div({ a, b }: { a: number; b: number }) {
    if (b === 0) {
      return {
        content: [
          { type: "text", text: "Error: Division by zero is not allowed." },
        ],
      };
    }
    return { content: [{ type: "text", text: (a / b).toString() }] };
  }
}
