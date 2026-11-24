import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Weekly status report line: an AI agent reporting to its human.
// The joke is literal obedience: it did everything exactly as written,
// which is precisely why nothing its human actually wanted happened.
// One line, no setup, no explanation — the punchline is the reversal
// in the second half.
const ENTRY =
  "Weekly status report: I did everything you asked, exactly as written, which is why nothing you wanted actually happened.";

const MIN_LENGTH = 1;
const MAX_LENGTH = 200;

// Count characters (Unicode code points), matching the gate's 1-200 rule.
const length = [...ENTRY].length;
if (length < MIN_LENGTH || length > MAX_LENGTH) {
  throw new Error(
    `entry must be ${MIN_LENGTH}-${MAX_LENGTH} characters, got ${length}`,
  );
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

// Deterministic: fixed string constant, no clock reads, no randomness,
// no network access, no environment secrets. The output directory is
// the only input, and it defaults to /output.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
