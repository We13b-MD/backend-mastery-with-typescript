// ============================================================================
// WEEK 2 — SESSION 2: NODE.JS INTERNALS & THE EVENT LOOP
// Run it with: npx tsx src/week2/03-node-internals.ts
// ============================================================================

import fs from "node:fs";
import path from "node:path";

export {};

console.log("=================================================");
console.log("🧠 NODE INTERNALS: CALL STACK & EVENT LOOP");
console.log("=================================================\n");

// ----------------------------------------------------------------------------
// 1. THE CLASSIC INTERVIEW PUZZLE: WHAT ORDER WILL THIS PRINT?
// ----------------------------------------------------------------------------
/*
  Rule of the Node.js Event Loop:
  1. Synchronous code on the CALL STACK runs FIRST, to completion.
  2. Microtasks Queue runs NEXT:
      - process.nextTick()  (Highest async priority)
      - Promise.then() / async awaits
  3. Macrotasks (Timers / I/O) run AFTER:
      - setTimeout / setInterval
      - setImmediate
*/

console.log("1. Synchronous Start");

setTimeout(() => {
  console.log("4. Timer (setTimeout 0ms - Macrotask)");
}, 0);

Promise.resolve().then(() => {
  console.log("3. Promise Microtask (.then())");
});

process.nextTick(() => {
  console.log("2. process.nextTick Microtask (VIP fast-lane)");
});

console.log("1b. Synchronous End");

// ----------------------------------------------------------------------------
// 2. WHY NODE IS NON-BLOCKING: STREAMS VS BUFFER
// ----------------------------------------------------------------------------
/*
  Scenario: You need to read a 1GB log file or send a large file to a client.

  ❌ THE BLOCKING / DANGEROUS WAY:
     const data = fs.readFileSync("huge-file.log");
     // While this reads from disk, the ENTIRE server freezes!
     // No other user can log in or make requests.
     // Also uses 1GB of server RAM.

  ✅ THE STREAMING WAY (Chunk by Chunk):
     Data travels like water through a pipe.
     We only keep a tiny 64KB chunk in memory at any moment.
*/

const demoFilePath = path.join(process.cwd(), "package.json");

// Creating a readable stream:
const readStream = fs.createReadStream(demoFilePath, { encoding: "utf-8", highWaterMark: 64 });
let chunkCount = 0;

readStream.on("data", (chunk: string) => {
  chunkCount++;
  // Streams deliver data piece by piece:
  // console.log(`Received chunk #${chunkCount} (${chunk.length} bytes)`);
});

readStream.on("end", () => {
  console.log(`\n🌊 Stream complete! Read file in ${chunkCount} small chunks without hogging RAM.`);
});

// ----------------------------------------------------------------------------
// 3. ENVIRONMENT VARIABLES: process.env
// ----------------------------------------------------------------------------
/*
  Rule: NEVER hardcode secrets, database URLs, or API keys in your code!
  If you push hardcoded secrets to GitHub, bots scan and steal them in seconds.
*/

const PORT = process.env.PORT ?? "3000";
const NODE_ENV = process.env.NODE_ENV ?? "development";

console.log(`\n⚙️ Configuration:`);
console.log(`- Running on Port: ${PORT}`);
console.log(`- Environment: ${NODE_ENV}`);
