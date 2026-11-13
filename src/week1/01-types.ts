// =====================================================
// WEEK 1 - CONCEPT 1: BASIC TYPES
// Run it:  npx tsx src/week1/01-types.ts
// =====================================================

// MEANING: This line makes the file a "module", so names in this file
// (like `age`) don't clash with the same names in other practice files.
// You'll put it at the top of every file for now.
export { };

// -----------------------------------------------------
// 1. TYPE ANNOTATION
// Syntax:  let name: type = value
// MEANING: ": string" tells TypeScript "this variable may ONLY ever hold
// a string". It's a promise the compiler checks for you.
// -----------------------------------------------------
let username: string = "Ada";
let age: number = 25; // number covers integers AND decimals (no separate int/float)
let isActive: boolean = true; // only true or false

console.log(username, age, isActive);

// Try this: uncomment the next line. Your editor shows a red error,
// because you broke the promise (a number is not a string).
// username = 42;

// -----------------------------------------------------
// 2. TYPE INFERENCE
// MEANING: If you assign a value right away, TypeScript figures out the
// type itself. You don't have to write it. Both lines below are
// exactly the same as writing `: string` and `: number`.
// -----------------------------------------------------
let city = "Lagos"; // inferred as string
let price = 19.99; // inferred as number

// Rule of thumb: let inference do the work for simple variables,
// and write types explicitly for function parameters (see concept 7).
console.log(city, price);

// -----------------------------------------------------
// 3. ARRAYS
// Syntax:  type[]
// MEANING: "a list where EVERY item is this type".
// -----------------------------------------------------
let scores: number[] = [90, 85, 70];
let names: string[] = ["Ada", "Tunde"];

scores.push(100); // OK, 100 is a number
// scores.push("A"); // ERROR: a string can't go in a number[]

console.log(scores, names);

// -----------------------------------------------------
// 4. TUPLES
// MEANING: An array with a FIXED length where each position has its own
// type. Use it when position matters, e.g. [name, age].
// -----------------------------------------------------
let person: [string, number] = ["Ada", 25];
console.log(person[0]); // "Ada"  (string)
console.log(person[1]); // 25     (number)
// let bad: [string, number] = [25, "Ada"]; // ERROR: wrong order

// -----------------------------------------------------
// 5. any  (AVOID IT)
// MEANING: "turn off type checking for this value". TypeScript stops
// protecting you. It defeats the point of using TypeScript.
// -----------------------------------------------------
let anything: any = "hello";
anything = 123; // allowed, but you lose all safety
anything = true;
console.log(anything);

// -----------------------------------------------------
// 6. unknown  (the SAFE alternative to any)
// MEANING: "I don't know the type yet". You can store anything in it,
// but you MUST check its type before using it (see concept 5: narrowing).
// You'll use this for data from outside your code, like request bodies.
// -----------------------------------------------------
let mystery: unknown = "I could be anything";
// console.log(mystery.toUpperCase()); // ERROR: not allowed until you check
if (typeof mystery === "string") {
  console.log(mystery.toUpperCase()); // OK: inside this `if`, TS knows it's a string
}

// -----------------------------------------------------
// 7. null and undefined
// MEANING: undefined = "no value was given", null = "intentionally empty".
// With strict mode on (your tsconfig), you can't put them into a
// `string` variable by accident. This prevents the famous
// "Cannot read properties of undefined" crash.
// -----------------------------------------------------
let nickname: string | undefined = undefined; // `|` means "or" (more in concept 4)
console.log(nickname);

// -----------------------------------------------------
// 8. void and never (used for functions)
// void  = function returns nothing.
// never = function never finishes (always throws an error).
// -----------------------------------------------------
function logMessage(msg: string): void {
  console.log(msg);
}
logMessage("void means no return value");

function fail(msg: string): never {
  throw new Error(msg);   
}
// fail("boom"); // uncomment to see it crash on purpose

// =====================================================
// YOUR TURN (write these below, then run the file):
//  1. Create a variable `productName` (string) and `stock` (number).
//  2. Create a `string[]` of 3 cities.
//  3. Create a tuple `[string, boolean]` like ["dark mode", true].
//  4. Break a type on purpose and read the error message.
// =====================================================



