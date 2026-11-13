// =====================================================
// WEEK 1 - CONCEPT 4: UNION TYPES
// Run it:  npx tsx src/week1/04-unions.ts
// =====================================================
export {};

// -----------------------------------------------------
// 1. BASIC UNION  ( | )
// MEANING: "|" reads as "OR". The value can be ANY ONE of the listed types.
// -----------------------------------------------------
let id: string | number;
id = "abc-1"; // OK
id = 42; // OK
// id = true; // ERROR: boolean is not in the union
console.log(id);

// -----------------------------------------------------
// 2. THE CATCH: you can only use what ALL members share
// MEANING: TypeScript doesn't know which one it is right now, so it
// only allows things that work on every member of the union.
// -----------------------------------------------------
function printId(id: string | number) {
  console.log(id.toString()); // OK: both string and number have toString()
  // console.log(id.toUpperCase()); // ERROR: numbers have no toUpperCase()
}
printId("abc");
printId(7);
// To use member-specific features, you "narrow" first (next file, concept 5).

// -----------------------------------------------------
// 3. LITERAL UNIONS
// MEANING: the "type" is a specific VALUE. Only those exact values are allowed.
// Great for statuses, roles, directions, HTTP methods.
// -----------------------------------------------------
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

function sendRequest(method: HttpMethod, url: string) {
  console.log(`${method} ${url}`);
}
sendRequest("GET", "/users"); // OK
// sendRequest("PATCH", "/users"); // ERROR: "PATCH" is not in the union
// sendRequest("get", "/users");   // ERROR: case matters

// -----------------------------------------------------
// 4. UNION WITH null / undefined
// MEANING: models "this might not exist". Very common with databases:
// find a user -> you get a User OR null if none found.
// -----------------------------------------------------
interface User {
  id: number;
  name: string;
}

function findUser(id: number): User | null {
  if (id === 1) return { id: 1, name: "Ada" };
  return null; // not found
}

const found = findUser(1);
// console.log(found.name); // ERROR: 'found' is possibly null. TS saved you from a crash.
console.log(found?.name); // `?.` = optional chaining: if found is null, gives undefined

// -----------------------------------------------------
// 5. UNIONS OF OBJECT TYPES
// MEANING: a value can be one of several different shapes.
// -----------------------------------------------------
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; size: number };
type Shape = Circle | Square;

const shape: Shape = { kind: "circle", radius: 5 };
console.log(shape);
// The `kind` field is a "tag". It lets TS tell the members apart.
// Next file shows how to use that. This is called a DISCRIMINATED UNION.

// =====================================================
// YOUR TURN:
//  1. Create `type OrderStatus = "pending" | "shipped" | "delivered"`.
//  2. Write `function updateStatus(id: number, status: OrderStatus)`
//     that logs a message. Call it with a bad status to see the error.
//  3. Write `function getDiscount(code: string): number | null`
//     returning 10 for "SAVE10" and null otherwise.
// =====================================================
