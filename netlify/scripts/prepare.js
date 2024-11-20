import * as fsp from "node:fs/promises";

await fsp.rm(".netlify/v1", { recursive: true }).catch(() => {});

await fsp.cp("scripts/v1/", ".netlify/v1", {
  recursive: true,
});
// await fsp.cp("build/client/", ".vercel/output/static", { recursive: true });
await fsp.cp("build/server/", ".netlify/v1/edge-functions/app", {
  recursive: true,
});
