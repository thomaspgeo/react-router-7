import { createRequestHandler } from "@react-router/express";
import express from "express";
import "react-router";

declare module "react-router" {
  export interface AppLoadContext {
    VALUE_FROM_DENO: string;
  }
}

export const app = express();

app.use(
  createRequestHandler({
    // @ts-expect-error - virtual module provided by React Router at build time
    build: () => import("virtual:react-router/server-build"),
    // @ts-expect-error - provided by Vite at build time
    mode: import.meta.env.MODE,
    getLoadContext() {
      return {
        VALUE_FROM_DENO: "Hello from Express",
      };
    },
  })
);
