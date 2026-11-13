// =====================================================
// WEEK 1 - CONCEPT 2: INTERFACES (describing the shape of objects)
// Run it:  npx tsx src/week1/02-interfaces.ts
// =====================================================
export {};

// -----------------------------------------------------
// 1. WHAT IS AN INTERFACE?
// MEANING: A blueprint that says "an object of this kind MUST have
// these properties, with these types". It exists only at compile time
// and vanishes when compiled to JavaScript. It costs nothing at runtime.
// Convention: names start with a capital letter.
// -----------------------------------------------------
interface User {
  id: number;
  name: string;
  email: string;
}

// Now we use `User` as a type, just like `string` or `number`.
const user1: User = {
  id: 1,
  name: "Ada",
  email: "ada@example.com",
};
console.log(user1);

// ERRORS TypeScript will catch for you (uncomment one at a time):
// const bad1: User = { id: 1, name: "Ada" };                      // missing `email`
// const bad2: User = { id: "1", name: "Ada", email: "a@b.com" };  // id must be number
// const bad3: User = { id: 1, name: "Ada", email: "a@b.com", age: 3 }; // `age` isn't in User

// -----------------------------------------------------
// 2. OPTIONAL PROPERTIES  ( ? )
// MEANING: "? " means the property may be missing. Its type becomes
// `string | undefined`, so you must handle the missing case.
// -----------------------------------------------------
interface Product {
  id: number;
  title: string;
  description?: string; // optional
}

const p1: Product = { id: 1, title: "Laptop" }; // OK without description
const p2: Product = { id: 2, title: "Phone", description: "Smart" };
console.log(p1.description); // undefined
console.log(p2.description);

// -----------------------------------------------------
// 3. READONLY PROPERTIES
// MEANING: can be set when the object is created, but never changed after.
// Good for ids and created dates.
// -----------------------------------------------------
interface Order {
  readonly id: number;
  status: string;
}

const order: Order = { id: 100, status: "pending" };
order.status = "shipped"; // OK
// order.id = 999;        // ERROR: cannot assign to 'id' (readonly)
console.log(order);

// -----------------------------------------------------
// 4. NESTED OBJECTS AND ARRAYS INSIDE INTERFACES
// MEANING: An interface can use other interfaces as property types.
// -----------------------------------------------------
interface Address {
  street: string;
  city: string;
}

interface Customer {
  name: string;
  address: Address; // uses the Address interface
  orderIds: number[]; // array of numbers
}

const customer: Customer = {
  name: "Tunde",
  address: { street: "12 Allen Ave", city: "Lagos" },
  orderIds: [1, 2, 3],
};
console.log(customer.address.city);

// -----------------------------------------------------
// 5. METHODS IN AN INTERFACE
// MEANING: describe a function property: (parameters) => returnType
// -----------------------------------------------------
interface Greeter {
  name: string;
  greet(greeting: string): string;
}

const greeter: Greeter = {
  name: "Ada",
  greet(greeting) {
    // `greeting` is already known to be string from the interface
    return `${greeting}, I am ${this.name}`;
  },
};
console.log(greeter.greet("Hello"));

// -----------------------------------------------------
// 6. EXTENDING INTERFACES  ( extends )
// MEANING: build a new interface from an existing one, so you don't
// repeat yourself. Admin has everything User has, plus more.
// -----------------------------------------------------
interface Admin extends User {
  permissions: string[];
}

const admin: Admin = {
  id: 2,
  name: "Root",
  email: "root@example.com",
  permissions: ["delete", "ban"],
};
console.log(admin);

// =====================================================
// YOUR TURN:
//  1. Make an interface `Shipment` with: id (number), destination (string),
//     delivered (boolean), notes (optional string).
//  2. Create 2 shipment objects, one with `notes` and one without.
//  3. Make `id` readonly and try changing it. Read the error.
//  4. Make `ExpressShipment extends Shipment` with `deliveryDays: number`.
// =====================================================
