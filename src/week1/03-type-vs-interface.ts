// =====================================================
// WEEK 1 - CONCEPT 3: type vs interface
// Run it:  npx tsx src/week1/03-type-vs-interface.ts
// =====================================================
export {};

// -----------------------------------------------------
// 1. TYPE ALIAS
// MEANING: `type` gives a NAME to any type. It's a nickname.
// For object shapes it looks almost identical to an interface.
// -----------------------------------------------------
type UserType = {
  id: number;
  name: string;
};

interface UserInterface {
  id: number;
  name: string;
}

const a: UserType = { id: 1, name: "Ada" };
const b: UserInterface = { id: 2, name: "Tunde" };
console.log(a, b); // both work the same here

// -----------------------------------------------------
// 2. WHAT `type` CAN DO THAT `interface` CAN'T
// A type alias can name ANYTHING, not only objects.
// -----------------------------------------------------
type ID = string | number; // a union (concept 4)
type Point = [number, number]; // a tuple
type Status = "pending" | "shipped" | "delivered"; // exact allowed strings (literal union)

const userId: ID = "abc-123"; // OK
const userId2: ID = 456; // OK
const coords: Point = [10, 20];
const status: Status = "shipped";
// const bad: Status = "lost"; // ERROR: not one of the 3 allowed strings
console.log(userId, userId2, coords, status);

// -----------------------------------------------------
// 3. WHAT `interface` CAN DO THAT `type` CAN'T: DECLARATION MERGING
// Declaring the same interface name twice MERGES them into one.
// A type alias would give a "duplicate identifier" error instead.
// -----------------------------------------------------
interface Settings {
  theme: string;
}
interface Settings {
  language: string;
}
// Settings now has BOTH theme and language:
const settings: Settings = { theme: "dark", language: "en" };
console.log(settings);

// -----------------------------------------------------
// 4. EXTENDING: `extends` vs `&` (intersection)
// Both achieve "combine shapes", with different syntax.
// -----------------------------------------------------
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

type AnimalT = { name: string };
type DogT = AnimalT & { breed: string }; // `&` means "AND": must have both

const dog1: Dog = { name: "Rex", breed: "Lab" };
const dog2: DogT = { name: "Max", breed: "Pug" };
console.log(dog1, dog2);

// -----------------------------------------------------
// 5. SO WHICH DO I USE?  (simple rules for you)
//  - Describing an object / class shape  -> interface
//  - Unions, tuples, literals, shortcuts  -> type
//  - On a team: follow whatever the project already uses.
//  - Don't agonize. Both are fine for objects.
// =====================================================
// YOUR TURN:
//  1. Create `type Role = "admin" | "user" | "guest"`.
//  2. Create an interface `Account` with `role: Role`.
//  3. Try assigning role: "superadmin" and read the error.
//  4. Create `type Timestamps = { createdAt: Date }` and combine it with
//     Account using `&` into `type AccountWithTime`.
// =====================================================
