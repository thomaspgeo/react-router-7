// @deno-types="npm:@types/compression"
import compression from "compression";
// @deno-types="npm:@types/express"
import express from "express";
// @deno-types="npm:@types/morgan"
import morgan from "morgan";

const DEVELOPMENT = Deno.env.get("NODE_ENV") === "development";
const PORT = Number.parseInt(Deno.env.get("PORT") || "3000");

const app = express();

app.use(compression());
app.disable("x-powered-by");

if (DEVELOPMENT) {
  console.log("Starting development server");
  const viteDevServer = await import("vite").then((vite) =>
    vite.createServer({
      server: { middlewareMode: true },
    })
  );
  app.use(viteDevServer.middlewares);
  app.use(async (req, res, next) => {
    try {
      const source = await viteDevServer.ssrLoadModule("./server/app.ts");
      return await source.app(req, res, next);
    } catch (error) {
      if (typeof error === "object" && error instanceof Error) {
        viteDevServer.ssrFixStacktrace(error);
      }
      next(error);
    }
  });
} else {
  console.log("Starting production server");
  app.use(
    "/assets",
    express.static("build/client/assets", { immutable: true, maxAge: "1y" })
  );
  app.use(express.static("build/client", { maxAge: "1h" }));
  app.use(await import("./build/server/index.js").then((mod) => mod.app));
}

app.use(morgan("tiny"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
