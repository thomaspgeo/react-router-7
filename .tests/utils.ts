import { execFile, type ChildProcess } from "node:child_process";
import * as path from "node:path";

const usedPorts = new Set<number>();
async function getPort() {
  while (true) {
    const port = Math.floor(Math.random() * 30000) + 30000;
    if (!usedPorts.has(port)) {
      usedPorts.add(port);
      return port;
    }
  }
}

export async function startCustom(cwd: string) {
  let cp: ChildProcess;

  cp = execFile("pnpm", ["dev"], {
    cwd: path.resolve(process.cwd(), cwd),
    env: {
      ...process.env,
      NO_COLOR: "true",
      PORT: String(await getPort()),
    },
  });
  if (!cp.stdout || !cp.stderr) {
    throw new Error("Failed to start the server.");
  }
  let buffer = "";
  let url: URL | undefined;
  for await (const chunk of cp.stdout) {
    buffer += chunk;
    if (buffer.includes("Server is running on ")) {
      const match = buffer.match(/http:\/\/\S+/);
      if (match?.[0]) {
        url = new URL(match[0]);
        break;
      }
    }
  }
  if (!url) {
    throw new Error("Failed to start the server.");
  }
  const baseURL = url.href;

  return {
    baseURL,
    cleanup() {
      cp.kill();
      return new Promise((resolve) => cp.on("exit", resolve));
    },
  };
}

export async function startDeno(cwd: string) {
  let cp: ChildProcess;

  cp = execFile("deno", ["install"], {
    cwd: path.resolve(process.cwd(), "deno-custom-server"),
  });
  await new Promise((resolve) => cp.on("exit", resolve));
  if (cp.exitCode !== 0) {
    throw new Error("Failed to run db:migrate");
  }

  cp = execFile("deno", ["task", "dev"], {
    cwd: path.resolve(process.cwd(), cwd),
    env: {
      ...process.env,
      NO_COLOR: "true",
      PORT: String(await getPort()),
    },
  });
  if (!cp.stdout || !cp.stderr) {
    throw new Error("Failed to start the server.");
  }
  let buffer = "";
  let url: URL | undefined;
  for await (const chunk of cp.stdout) {
    buffer += chunk;
    if (buffer.includes("Server is running on ")) {
      const match = buffer.match(/http:\/\/\S+/);
      if (match?.[0]) {
        url = new URL(match[0]);
        break;
      }
    }
  }
  if (!url) {
    throw new Error("Failed to start the server.");
  }
  const baseURL = url.href;

  return {
    baseURL,
    cleanup() {
      cp.kill();
      return new Promise((resolve) => cp.on("exit", resolve));
    },
  };
}

export async function startVite(cwd: string) {
  let cp: ChildProcess;

  cp = execFile("pnpm", ["dev", "--port", String(await getPort())], {
    cwd: path.resolve(process.cwd(), cwd),
    env: {
      ...process.env,
      NO_COLOR: "true",
    },
  });
  if (!cp.stdout || !cp.stderr) {
    throw new Error("Failed to start the server.");
  }
  let buffer = "";
  let url: URL | undefined;
  for await (const chunk of cp.stdout) {
    buffer += chunk;
    if (buffer.includes("Local:")) {
      const match = buffer.match(/http:\/\/\S+/);
      if (match?.[0]) {
        url = new URL(match[0]);
        break;
      }
    }
  }
  if (!url) {
    throw new Error("Failed to start the server.");
  }
  const baseURL = url.href;

  return {
    baseURL,
    cleanup() {
      cp.kill();
      return new Promise((resolve) => cp.on("exit", resolve));
    },
  };
}
