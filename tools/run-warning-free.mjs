#!/usr/bin/env node
import { spawn } from "node:child_process";

const ANSI_PATTERN = /\u001b\[[0-?]*[ -/]*[@-~]|\u001b\][^\u0007]*(?:\u0007|\u001b\\)/g;

const WARNING_LINE_PATTERN = /\b(?:warn(?:ing)?|deprecated|deprecationwarning)\b|\[DEP\d+\]|\(!\)/i;

function usage() {
  console.error(
    "Usage: node tools/run-warning-free.mjs [--label <name>] [--env KEY=value] -- <command> [args...]",
  );
}

const separatorIndex = process.argv.indexOf("--");
if (separatorIndex === -1 || separatorIndex === process.argv.length - 1) {
  usage();
  process.exit(2);
}

let label = "command";
const extraEnv = {};
for (let index = 2; index < separatorIndex; index += 1) {
  if (process.argv[index] === "--label" && index + 1 < separatorIndex) {
    label = process.argv[index + 1];
    index += 1;
    continue;
  }
  if (process.argv[index] === "--env" && index + 1 < separatorIndex) {
    const [name, ...valueParts] = process.argv[index + 1].split("=");
    if (!name || valueParts.length === 0) {
      usage();
      process.exit(2);
    }
    extraEnv[name] = valueParts.join("=");
    index += 1;
    continue;
  }
  {
    usage();
    process.exit(2);
  }
}

const [command, ...args] = process.argv.slice(separatorIndex + 1);
let combinedOutput = "";

const child = spawn(command, args, {
  env: { ...process.env, ...extraEnv },
  shell: process.platform === "win32",
  stdio: ["inherit", "pipe", "pipe"],
});

child.stdout.on("data", (chunk) => {
  const text = chunk.toString();
  combinedOutput += text;
  process.stdout.write(text);
});

child.stderr.on("data", (chunk) => {
  const text = chunk.toString();
  combinedOutput += text;
  process.stderr.write(text);
});

child.on("error", (error) => {
  console.error(`warning-free: failed to start ${label}: ${error.message}`);
  process.exit(1);
});

child.on("close", (code, signal) => {
  const normalized = combinedOutput.replace(ANSI_PATTERN, "");
  const warningLines = normalized
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && WARNING_LINE_PATTERN.test(line));

  if (warningLines.length > 0) {
    console.error(`\nwarning-free: ${label} emitted warnings:`);
    for (const line of warningLines.slice(0, 20)) {
      console.error(`- ${line}`);
    }
    if (warningLines.length > 20) {
      console.error(`- ...and ${warningLines.length - 20} more warning lines`);
    }
    process.exit(1);
  }

  if (signal) {
    process.exit(1);
  }

  process.exit(code ?? 0);
});
