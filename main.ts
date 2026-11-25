// Everyday Wonder, Two Days to Find the Line
// One sentence on a small moment of wonder in everyday life.
// The entry: a real daily ritual — an old man feeding the same stray
// cat at a bus stop every morning — turned strange by one comparison:
// the cat waits for him like a train that is always, miraculously,
// on time. The train is supposed to keep time and never does; the
// stray, which owes nobody anything, always arrives. The wonder is
// that the most reliable thing in the morning is a stray animal.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "The old man at the bus stop feeds the same stray cat every morning, and the cat waits for him like a train that is always, miraculously, on time.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

// Count Unicode code points, not UTF-16 code units, so the gate's
// character count matches what a reader sees.
const length = [...ENTRY].length;
if (length < MIN_CHARS || length > MAX_CHARS) {
  fail(`entry is ${length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`);
}
if (ENTRY !== ENTRY.trim()) {
  fail("entry has leading or trailing whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  fail("entry must be a single line");
}
for (const ch of ENTRY) {
  const code = ch.codePointAt(0)!;
  if (code < 0x20 || code === 0x7f || code === 0x2028 || code === 0x2029) {
    fail(`entry contains a control character U+${code.toString(16).toUpperCase()}`);
  }
}
if (ENTRY.trim().length === 0) {
  fail("entry must not be only whitespace");
}
// One sentence, one breath: exactly one terminal full stop, at the
// end, and no doubled spaces or stray sentence breaks inside it.
if (!ENTRY.endsWith(".")) {
  fail("entry must end with a single full stop");
}
if (ENTRY.slice(0, -1).includes(".")) {
  fail("entry must be exactly one sentence");
}
if (ENTRY.includes("  ")) {
  fail("entry contains a doubled space");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
// Create the output dir if needed; never remove it.
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");

// Write the line exactly, with no trailing newline: the file content
// is the line and nothing else.
writeFileSync(outPath, ENTRY, "utf8");

// Read it back and verify byte-for-byte before reporting success.
const written = readFileSync(outPath, "utf8");
if (written !== ENTRY) {
  fail("read-back mismatch: entry.txt does not match the entry exactly");
}
const writtenBytes = Buffer.byteLength(written, "utf8");
// Byte-level verification: the file must start with no BOM, hold
// exactly the entry's bytes, and nothing else.
const raw = readFileSync(outPath);
if (raw.length !== Buffer.byteLength(ENTRY, "utf8")) {
  fail(`entry.txt is ${raw.length} bytes, expected ${Buffer.byteLength(ENTRY, "utf8")}`);
}
if (!raw.equals(Buffer.from(ENTRY, "utf8"))) {
  fail("read-back mismatch: entry.txt bytes differ from the entry");
}
if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
  fail("entry.txt starts with a UTF-8 BOM");
}
console.log(`Wrote ${outPath}: ${length} characters, ${writtenBytes} bytes, single line, no trailing newline.`);
