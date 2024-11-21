import deno from "@deno/vite-plugin";
import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";

export default defineConfig(({ isSsrBuild, mode }) => ({
  build: {
    rollupOptions: isSsrBuild
      ? {
          input: "./server/app.ts",
        }
      : undefined,
  },
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  ssr: {
    // target: "webworker",
    // noExternal: true,
    // resolve: {
    //   conditions: ["deno", "worker"],
    // },
    optimizeDeps: {
      include: [
        "@react-router/express",
        "express",
        "react",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
        "react-dom",
        "react-dom/server",
        "react-router",
      ],
    },
  },
  plugins: [deno(), reactRouter()],
}));
