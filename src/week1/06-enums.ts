// =====================================================
// WEEK 1 - CONCEPT 6: ENUMS
// Run it:  npx tsx src/week1/06-enums.ts
// =====================================================
export {};

// MEANING: An enum is a named set of related constants. Instead of
// scattering magic strings like "admin" around, you define them once.

// -----------------------------------------------------
// 1. NUMERIC ENUM
// MEANING: members get numbers automatically, starting at 0.
// -----------------------------------------------------
enum Direction {
  Up, // 0
  Down, // 1
  Left, // 2
  Right, // 3
}
console.log(Direction.Up); // 0
console.log(Direction.Right); // 3
console.log(Direction[1]); // "Down"  (numeric enums can be looked up in reverse)

// You can set your own starting number:
enum StatusCode {
  Ok = 200,
  NotFound = 404,
  ServerError = 500,
}
console.log(StatusCode.NotFound); // 404

// -----------------------------------------------------
// 2. STRING ENUM  (most common in backend code)
// MEANING: each member has an explicit string value. Easy to read in
// logs and stored in databases.
// -----------------------------------------------------
enum Role {
  Admin = "ADMIN",
  User = "USER",
  Guest = "GUEST",
}

function canDelete(role: Role): boolean {
  return role === Role.Admin;
}
console.log(canDelete(Role.Admin)); // true
console.log(canDelete(Role.Guest)); // false
// canDelete("ADMIN"); // ERROR: a raw string isn't accepted. You must use Role.Admin

// -----------------------------------------------------
// 3. ENUM IN AN INTERFACE
// -----------------------------------------------------
enum OrderStatus {
  Pending = "PENDING",
  Shipped = "SHIPPED",
  Delivered = "DELIVERED",
}

interface Order {
  id: number;
  status: OrderStatus;
}
const order: Order = { id: 1, status: OrderStatus.Pending };
console.log(order);

// -----------------------------------------------------
// 4. ENUM vs LITERAL UNION: which one?
// A literal union type does the same job with less code and no runtime output:
// -----------------------------------------------------
type RoleUnion = "ADMIN" | "USER" | "GUEST";
const r: RoleUnion = "ADMIN"; // plain strings work directly
console.log(r);
//
// Enum:          real JS object at runtime, must use Role.Admin, can loop over values
// Literal union: zero runtime cost, plain strings, simpler.
// Many modern teams prefer literal unions. Enums are still everywhere
// in existing code, so you must understand them. Use whichever your project uses.

// -----------------------------------------------------
// 5. LOOPING OVER A STRING ENUM
// -----------------------------------------------------
console.log(Object.values(Role)); // ["ADMIN", "USER", "GUEST"]

// =====================================================
// YOUR TURN:
//  1. Create a string enum `PaymentMethod` with Card, Transfer, Cash.
//  2. Write `function describe(method: PaymentMethod): string` using a switch.
//  3. Create the same list as a literal union and compare how you use both.
// =====================================================
