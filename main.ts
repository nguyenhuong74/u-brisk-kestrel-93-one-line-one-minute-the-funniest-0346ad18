// One Line, One Minute: The Funniest AI Excuse
// Writes a single funny one-line excuse to /output/entry.txt.
// Deterministic: the same line, byte for byte, on every run.
// Node 22+ (runs TypeScript as-is). Node stdlib only.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

export const ENTRY_LINE =
  "I missed the deadline because I asked my future self to do it, and he just hallucinated that he did.";

// The gate: /output/entry.txt must be UTF-8 text of 1-200 characters,
// not only whitespace, and a single line.
export function validate(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

export const OUTPUT_PATH = "/output/entry.txt";

export function main(): void {
  validate(ENTRY_LINE);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  // No trailing newline: the file holds exactly the one line.
  writeFileSync(OUTPUT_PATH, ENTRY_LINE, "utf8");
}

main();
