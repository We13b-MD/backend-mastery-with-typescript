// ============================================================================
// WEEK 2 — SESSION 1 & 2: BARE-METAL NODE.JS HTTP SERVER
// (No Express yet! See how raw HTTP works under the hood)
// Run it with: npx tsx src/week2/02-node-http-server.ts
// ============================================================================

import http, { IncomingMessage, ServerResponse } from "node:http";

export {};

interface User {
  id: number;
  name: string;
  role: "admin" | "user";
}

// In-memory data store for Week 2
const users: User[] = [
  { id: 1, name: "Ada Lovelace", role: "admin" },
  { id: 2, name: "Tunde Bakare", role: "user" },
  { id: 3, name: "Emeka Okonkwo", role: "user" },
];

// Helper: send JSON responses cleanly
function sendJson(res: ServerResponse, statusCode: number, data: unknown): void {
  const json = JSON.stringify(data, null, 2);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Content-Length": Buffer.byteLength(json),
  });
  res.end(json);
}

// Helper: parse incoming request body (streams & chunks)
function parseJsonBody<T>(req: IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let body = "";

    // Node streams data in small chunks (buffers)
    req.on("data", (chunk: Buffer) => {
      body += chunk.toString();
    });

    // When the stream finishes:
    req.on("end", () => {
      try {
        if (!body) {
          resolve({} as T);
        } else {
          resolve(JSON.parse(body) as T);
        }
      } catch (err) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", (err: Error) => reject(err));
  });
}

// Create the native HTTP server
const server = http.createServer(async (req: IncomingMessage, res: ServerResponse) => {
  const method = req.method ?? "GET";
  const url = req.url ?? "/";

  console.log(`📡 [${new Date().toLocaleTimeString()}] ${method} ${url}`);

  // Route 1: Health check
  if (url === "/health" && method === "GET") {
    return sendJson(res, 200, {
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }

  // Route 2: GET /api/users
  if (url === "/api/users" && method === "GET") {
    return sendJson(res, 200, { success: true, count: users.length, data: users });
  }

  // Route 3: POST /api/users
  if (url === "/api/users" && method === "POST") {
    try {
      const body = await parseJsonBody<{ name?: string; role?: "admin" | "user" }>(req);

      if (!body.name || !body.role) {
        return sendJson(res, 400, {
          success: false,
          error: "Validation failed: 'name' and 'role' are required fields.",
        });
      }

      const newUser: User = {
        id: users.length + 1,
        name: body.name,
        role: body.role,
      };

      users.push(newUser);

      // 201 Created status!
      return sendJson(res, 201, { success: true, data: newUser });
    } catch (err) {
      return sendJson(res, 400, { success: false, error: "Malformed JSON payload" });
    }
  }

  // 404 Fallback
  return sendJson(res, 404, {
    success: false,
    error: `Route ${method} ${url} does not exist.`,
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ Bare-metal HTTP server listening on http://localhost:${PORT}`);
  console.log("Try testing these endpoints in another terminal or browser:");
  console.log(`  1. GET  http://localhost:${PORT}/health`);
  console.log(`  2. GET  http://localhost:${PORT}/api/users`);
  console.log(`  3. POST http://localhost:${PORT}/api/users (with JSON { "name": "Bola", "role": "user" })`);
});
