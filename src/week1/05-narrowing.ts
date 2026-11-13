// =====================================================
// WEEK 1 - CONCEPT 5: TYPE NARROWING
// Run it:  npx tsx src/week1/05-narrowing.ts
// =====================================================
export {};

// MEANING OF NARROWING: A union says "could be A or B". Narrowing is
// checking inside your code (with if/switch) so TypeScript can say
// "in THIS block, it's definitely A". Then you can use A's features.

// -----------------------------------------------------
// 1. typeof NARROWING  (for primitives: string, number, boolean...)
// -----------------------------------------------------
function format(value: string | number): string {
  if (typeof value === "string") {
    // Inside here TS knows: value is string
    return value.toUpperCase();
  }
  // Here TS knows it's what's left: number
  return value.toFixed(2);
}
console.log(format("hello")); // HELLO
console.log(format(3.14159)); // 3.14

// -----------------------------------------------------
// 2. TRUTHINESS NARROWING (removes null / undefined)
// -----------------------------------------------------
function greet(name: string | null | undefined) {
  if (name) {
    // name is a non-empty string here
    console.log(`Hello ${name}`);
  } else {
    console.log("Hello stranger");
  }
}
greet("Ada");
greet(null);

// -----------------------------------------------------
// 3. EQUALITY NARROWING
// -----------------------------------------------------
function compare(a: string | number, b: string | boolean) {
  if (a === b) {
    // They can only be equal if they share a type: the only overlap is string
    console.log(a.toUpperCase());
  }
}
compare("x", "x");

// -----------------------------------------------------
// 4. `in` NARROWING (checks if a property exists on an object)
// -----------------------------------------------------
type Bird = { fly: () => void };
type Fish = { swim: () => void };

function move(animal: Bird | Fish) {
  if ("fly" in animal) {
    animal.fly(); // TS knows: Bird
  } else {
    animal.swim(); // TS knows: Fish
  }
}
move({ fly: () => console.log("flying") });
move({ swim: () => console.log("swimming") });

// -----------------------------------------------------
// 5. instanceof NARROWING (for classes, Date, Error)
// -----------------------------------------------------
function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toISOString());
  } else {
    console.log(x.toUpperCase());
  }
}
logValue(new Date());
logValue("text");

// You'll use this ALL the time in try/catch blocks:
try {
  throw new Error("something broke");
} catch (err) {
  // `err` is `unknown`, so we must narrow before using .message
  if (err instanceof Error) {
    console.log(err.message);
  }
}

// -----------------------------------------------------
// 6. DISCRIMINATED UNIONS (the most useful pattern)
// MEANING: every member has a shared "tag" property with a literal
// value (here: kind). Checking the tag narrows the whole object.
// -----------------------------------------------------
type Circle = { kind: "circle"; radius: number };
type Square = { kind: "square"; size: number };
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2; // TS knows: Circle (radius exists)
    case "square":
      return shape.size ** 2; // TS knows: Square (size exists)
  }
}
console.log(area({ kind: "circle", radius: 2 }));
console.log(area({ kind: "square", size: 3 }));

// -----------------------------------------------------
// 7. CUSTOM TYPE GUARD  ( x is Type )
// MEANING: your own check function. The return type `value is string`
// tells TypeScript "if this returns true, treat value as a string".
// -----------------------------------------------------
function isString(value: unknown): value is string {
  return typeof value === "string";
}

const input: unknown = "from the outside world";
if (isString(input)) {
  console.log(input.length); // OK: TS now knows it's a string
}

// =====================================================
// YOUR TURN:
//  1. Write `function double(x: string | number)`: if number return x * 2,
//     if string return x repeated twice (x + x).
//  2. Make `type Success = { status: "ok"; data: string }` and
//     `type Failure = { status: "error"; message: string }`.
//     Write `function handle(r: Success | Failure)` that logs data or message
//     using a switch on `status`.
// =====================================================
