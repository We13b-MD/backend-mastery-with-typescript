// ============================================================================
// WEEK 2 — SESSION 1: HOW THE INTERNET WORKS & HTTP DEEP DIVE
// Run it with: npx tsx src/week2/01-http-fundamentals.ts
// ============================================================================

export {};

// ----------------------------------------------------------------------------
// 1. THE BIG PICTURE: WHAT HAPPENS WHEN YOU TYPE A URL?
// ----------------------------------------------------------------------------
/*
  Scenario: You open Chrome and visit https://api.myshop.com/products

  Step 1: DNS Lookup (The "Phonebook" of the Internet)
    - Computers don't speak domain names ("api.myshop.com"). They speak IP addresses.
    - Your browser asks DNS: "What is the IP for api.myshop.com?"
    - DNS replies: "142.250.190.46" (IPv4) or "2607:f8b0:4005:808::200e" (IPv6).

  Step 2: TCP Handshake + TLS (The Secure Pipe)
    - Browser connects to IP 142.250.190.46 on PORT:
        * Port 80  = Standard HTTP (unencrypted)
        * Port 443 = HTTPS (encrypted with SSL/TLS)
        * Port 3000 / 5000 / 8080 = Typical local backend development ports
    - They perform a 3-way handshake (SYN, SYN-ACK, ACK) + TLS encryption.

  Step 3: The HTTP Request is Sent
    - Client sends raw plain text over this encrypted connection:
        GET /products HTTP/1.1
        Host: api.myshop.com
        Accept: application/json
        Authorization: Bearer my-secret-jwt-token

  Step 4: The Server Processes & Returns an HTTP Response
    - The server (e.g. Node.js / Express) parses the text, checks DB, builds response:
        HTTP/1.1 200 OK
        Content-Type: application/json
        Content-Length: 124

        [{"id": 1, "name": "Wireless Mouse", "price": 25.00}]
*/

console.log("=================================================");
console.log("🚀 WEEK 2: HTTP & NETWORKING FUNDAMENTALS");
console.log("=================================================\n");

// ----------------------------------------------------------------------------
// 2. HTTP METHODS & IDEMPOTENCY (INTERVIEW FAVORITE)
// ----------------------------------------------------------------------------
/*
  "Idempotent" means: Making the same request 1 time or 100 times results in
  the exact same state on the server.

  - GET     : Retrieve data. SAFE (doesn't modify data) & IDEMPOTENT.
  - POST    : Create a new resource. NOT IDEMPOTENT (calling 3 times creates 3 records).
  - PUT     : Replace an entire resource. IDEMPOTENT (replacing with X 10 times = X).
  - PATCH   : Partially update a resource. Usually NOT idempotent (e.g., {$inc: 1}).
  - DELETE  : Remove a resource. IDEMPOTENT (deleting id 5 leaves it deleted).
*/

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface EndpointSpec {
  method: HttpMethod;
  path: string;
  isIdempotent: boolean;
  description: string;
}

const apiEndpoints: EndpointSpec[] = [
  { method: "GET", path: "/api/users", isIdempotent: true, description: "Fetch all users" },
  { method: "POST", path: "/api/users", isIdempotent: false, description: "Create a user" },
  { method: "PUT", path: "/api/users/:id", isIdempotent: true, description: "Replace full user" },
  { method: "PATCH", path: "/api/users/:id", isIdempotent: false, description: "Update user fields" },
  { method: "DELETE", path: "/api/users/:id", isIdempotent: true, description: "Delete a user" },
];

console.log("📌 HTTP Methods & Idempotency Rules:");
console.table(apiEndpoints);

// ----------------------------------------------------------------------------
// 3. HTTP STATUS CODES (WHAT EVERY BACKEND ENGINEER MUST KNOW BY HEART)
// ----------------------------------------------------------------------------
/*
  1xx = Informational (e.g. 101 Switching Protocols - WebSockets)
  2xx = Success
        200 OK: Standard success
        201 Created: New record successfully inserted (POST)
        204 No Content: Success, but response body is intentionally empty (often DELETE)
  3xx = Redirection
        301 Moved Permanently: URL changed permanently
        304 Not Modified: Cache validation (saves bandwidth)
  4xx = Client Error (The caller messed up)
        400 Bad Request: Malformed JSON or invalid schema
        401 Unauthorized: Who are you? Missing/invalid authentication token
        403 Forbidden: I know who you are, but you don't have permission (RBAC)
        404 Not Found: Resource doesn't exist
        409 Conflict: E.g., user email already registered
        429 Too Many Requests: Rate limit exceeded
  5xx = Server Error (You, the backend engineer, messed up or server crashed)
        500 Internal Server Error: Unhandled exception / bug in code
        502 Bad Gateway: Reverse proxy (Nginx) couldn't reach backend
        503 Service Unavailable: Server overloaded or undergoing maintenance
        504 Gateway Timeout: Upstream DB or microservice took too long to reply
*/

enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

console.log("\n📌 Sample Status Code Mapping:");
console.log(`201 = ${HttpStatus[201]} (Resource Created)`);
console.log(`401 = ${HttpStatus[401]} (Authentication Missing)`);
console.log(`403 = ${HttpStatus[403]} (Permission Denied)`);
console.log(`404 = ${HttpStatus[404]} (Not Found)`);

// ----------------------------------------------------------------------------
// 4. BIG-O FRIDAY CONCEPT: O(n) vs O(log n) (BINARY SEARCH)
// ----------------------------------------------------------------------------
/*
  In Week 1 you learned:
    - O(1): Instant, like index lookup `arr[3]` or object lookup `map["id"]`
    - O(n): Linear, scans through every item one by one (e.g. `arr.find(...)`)

  Now: O(log n) — Logarithmic Time!
  Imagine finding a word in a dictionary of 1,000,000 words.
  Do you read every page from page 1? NO (that is O(n) = 1,000,000 checks).
  You open in the middle. If target is earlier, discard the second half!
  Repeat cutting in half each step.

  Number of steps to search 1,000,000 items:
    - O(n) linear search: up to 1,000,000 comparisons
    - O(log2 n) binary search: at most 20 comparisons! (2^20 = 1,048,576)
  
  ⚠️ REQUIREMENT: Data MUST BE SORTED to use Binary Search.
  This is how Database B-Tree indexes work behind the scenes!
*/

function linearSearch(arr: number[], target: number): { index: number; steps: number } {
  let steps = 0;
  for (let i = 0; i < arr.length; i++) {
    steps++;
    if (arr[i] === target) return { index: i, steps };
  }
  return { index: -1, steps };
}

function binarySearch(sortedArr: number[], target: number): { index: number; steps: number } {
  let steps = 0;
  let low = 0;
  let high = sortedArr.length - 1;

  while (low <= high) {
    steps++;
    const mid = Math.floor((low + high) / 2);
    const guess = sortedArr[mid];

    if (guess === target) {
      return { index: mid, steps };
    }
    if (guess > target) {
      high = mid - 1; // Discard right half
    } else {
      low = mid + 1;  // Discard left half
    }
  }

  return { index: -1, steps };
}

// Demo with 100,000 sorted numbers:
const datasetSize = 100_000;
const testData = Array.from({ length: datasetSize }, (_, i) => i + 1); // 1, 2, ..., 100,000
const targetValue = 99_999; // Near the end

const linearResult = linearSearch(testData, targetValue);
const binaryResult = binarySearch(testData, targetValue);

console.log("\n📌 Big-O Comparison (Searching for 99,999 in 100,000 items):");
console.log(`🐢 Linear Search  O(n)    : took ${linearResult.steps.toLocaleString()} steps`);
console.log(`⚡ Binary Search  O(log n): took ${binaryResult.steps} steps!`);
console.log("=================================================\n");
