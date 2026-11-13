// =====================================================
// WEEK 1 - MINI TASK: TYPED FUNCTIONS
// Run it:  npx tsx src/week1/07-mini-task-typed-functions.ts
// Do this LAST, after concepts 1-6, because it uses all of them.
// =====================================================
export {};

// -----------------------------------------------------
// 1. TYPING A FUNCTION
// Syntax: function name(param: Type): ReturnType { ... }
// MEANING: the parameter types are what callers MUST pass in;
// the return type is what the function PROMISES to give back.
// -----------------------------------------------------
function add(a: number, b: number): number {
  return a + b;
}
console.log(add(2, 3)); // 5
// add("2", 3);   // ERROR: argument must be a number
// add(2);        // ERROR: expected 2 arguments

// ARROW FUNCTION version (same typing rules):
const multiply = (a: number, b: number): number => a * b;
console.log(multiply(4, 5));

// -----------------------------------------------------
// 2. OPTIONAL AND DEFAULT PARAMETERS
// ?  = caller may skip it (value is then undefined)
// =  = default value used when skipped
// -----------------------------------------------------
function greet(name: string, greeting?: string): string {
  return `${greeting ?? "Hello"}, ${name}`; // ?? = use right side if left is null/undefined
}
console.log(greet("Ada")); // Hello, Ada
console.log(greet("Ada", "Hi")); // Hi, Ada

function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}
console.log(power(3)); // 9
console.log(power(3, 3)); // 27

// -----------------------------------------------------
// 3. REST PARAMETERS  ( ... )
// MEANING: collects any number of arguments into an array.
// -----------------------------------------------------
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// -----------------------------------------------------
// 4. FUNCTIONS WITH OBJECTS AND INTERFACES
// -----------------------------------------------------
interface Product {
  id: number;
  name: string;
  price: number;
  inStock: boolean;
}

function formatPrice(product: Product): string {
  return `${product.name}: $${product.price.toFixed(2)}`;
}
console.log(formatPrice({ id: 1, name: "Laptop", price: 999.5, inStock: true }));

// -----------------------------------------------------
// 5. FUNCTIONS THAT RETURN A UNION (and need narrowing)
// -----------------------------------------------------
function findProduct(products: Product[], id: number): Product | undefined {
  return products.find((p) => p.id === id); // find returns undefined if none matches
}

const catalog: Product[] = [
  { id: 1, name: "Laptop", price: 999.5, inStock: true },
  { id: 2, name: "Phone", price: 499, inStock: false },
];

const result = findProduct(catalog, 2);
if (result) {
  // narrowing! Now TS knows result is a Product
  console.log(result.name);
} else {
  console.log("Not found");
}

// -----------------------------------------------------
// 6. FUNCTION TYPES (typing a function as a value / callback)
// Syntax: (param: Type) => ReturnType
// -----------------------------------------------------
type Operation = (a: number, b: number) => number;

const subtract: Operation = (a, b) => a - b; // param types come from Operation
function calculate(a: number, b: number, op: Operation): number {
  return op(a, b);
}
console.log(calculate(10, 4, subtract)); // 6
console.log(calculate(10, 4, (x, y) => x * y)); // 40

// -----------------------------------------------------
// 7. MINI TASK: build these yourself (delete nothing above, add below)
// -----------------------------------------------------
// Define:
//   type Role = "admin" | "user" | "guest";
//   interface Account { id: number; email: string; role: Role; age?: number }
//
// Write these typed functions:
//   a) createAccount(id: number, email: string, role: Role = "user"): Account
//   b) isAdult(account: Account): boolean       // age >= 18, false if age missing
//   c) describeAccount(account: Account): string
//        // "admin" -> "Administrator <email>", "user" -> "User <email>",
//        // "guest" -> "Guest"   (use a switch on role)
//   d) parseId(input: string | number): number
//        // if string, convert with Number(input); if number, return it
//   e) findAccountByEmail(accounts: Account[], email: string): Account | undefined
//
// Then call each one with console.log and test a wrong type to see TS stop you.
// Checklist: every parameter typed, every return type typed, no `any`.
