import { LargeNumberLike } from "node:crypto";
import { format } from "node:path";

let username: string = 'Ada';//  this is saying it can only hold text
let age: number = 25;
let isActive: boolean = true;

console.log(username, age, isActive)


//Arrays 
//an array holds sevetal values in one variable 
let scores: number[] = [90, 85, 70]
let names: string[] = ['Bola', 'Tunde']
console.log(scores)
console.log(names)

scores.push(100)
console.log(scores)

console.log(names[1])

let cities: string[] = ['Lagos', 'portharcourt', 'calabar']

console.log(cities)

console.log(cities[2])

//we are working with type interference where typescript works out the type itself 

let city = 'Lagos'
let price = 19.99;
let isOpen = false


/* when to write  the type and wheen to skip it */

// skip it when you give the value on the same line as avove 
//write it when there is no value yet like let total: number or later or function parameters 

let productName = 'Laptop'
let stock = 15

console.log(productName, stock)

//tuples 
// A tuple is a fixed list where each variable has its own type 

let person: [string, number] = ['Ada', 25]

console.log(person);
console.log(person[0]);
console.log(person[1])

let setting: [string, boolean] = ['darkmode', false]

console.log(setting[0])
console.log(setting[1])

let coordinates: [number, number] = [6.5244, 3.3792]

console.log(coordinates[0])

let fixedlength: [number, boolean] = [80, true]


// so i will use a tuple when i have a small, fixed set of values where each positions means something specific 


// step 5 any vs unknown 

//sometimes you dont know what type a value will be, like data coming from a user or an api. Typescript gives you two ways to handle it

let anything: any = 'hello'
anything = 123;
anything = true;
console.log(anything);

// any means turn off tyrpe checking for this variable typescript can no longer protect you which defeats the reason to use it


//let thing:any = 42
// console.log(thing.toUpperCase())

//Part B


let mystery: unknown = 'I COULD BE ANYTHING'
if (typeof mystery === 'string') {
    console.log(mystery.toLowerCase())
}


let data: unknown = 100

if (typeof data === 'number') {
    console.log(data * 2)
}

// unknown is safeer thann any because  typescript can help you get erros before compile time since with unknown type checking is not disabled 

/* unknoown is safer than any because Typescript still checks it. i have to prove hat type it is (typeof) before i can use it so mistakes show up as red underlines instaed of crashes  */

//step6 null and undefined 

//the idea undefined means no value was given null means empty no purpose 
// typescript stops you by using an empty value by accident 

let nickname: string | undefined = 'Ada'
console.log(nickname)


if (nickname) {
    console.log(nickname.toUpperCase())
} else {
    console.log('no nickname set ')
}


function printNickName(nickname: string | undefined) {
    if (nickname) {
        console.log(nickname.toUpperCase());
    } else {
        console.log('No nickname yet ')
    }
}

printNickName('Ada')
printNickName(undefined)

function printMidddleName(middlename: string | null) {
    if (middlename) {
        console.log(middlename.toUpperCase())
    } else {
        console.log('no middle name yet ')
    }
}

printMidddleName('chidi')
printMidddleName(null)

//logistics example

/*function printDriverName(driverName:string | undefined){
    if(driverName){
        console.log(driverName.toUpperCase())
    }else{
        console.log('no driver name yet')
    }
}*/

// Step 7: void and never 
//The idea: a function can say what it gives back some functions give back nothing and a few never finish at all 

// void means return nothing

function logMessage(msg: string): void {
    console.log(msg)
}

logMessage('Package delivered');


function printStatus(orderId: number, status: string): void {
    console.log(`Order ${orderId} is ${status}`)
}

function addPrices(a: number, b: number): number {
    return a + b
}

printStatus(5, 'In transit')
console.log(addPrices(5, 6))

// the difference between returning void and number is a number is not assignable to any type void
// that means you cannot assign a number to void since void does not give anything back 

//Never

// it is a function that never finishes normally 

/*

Most functions either return a value (number, string) or return nothing void 
A never function is different it crashes on purpose by throwing an error  

it never reaches the end we use this is backend code for something like if we ever reach this point 
something went wrong stop everything and report it 



 */


function fail(msg: string): never {
    throw new Error(msg)
}


// console.log('This line never runs ')

// the main difference between void and never is void finishes and returns nothing  never does not finish at all it crashes before it can run anything 


//Interfaces 

//An interface describes the shape of an object 

interface User {
    id: number;
    name: string;
    email: string;
}


const user1: User = {
    id: 1,
    name: 'Ada',
    email: 'adaexample.com'
}

console.log(user1)


//step2: Optional properties

//sometimes propertied might not exist. not every user has a phone number. you mark those 
// with ? after the name.

interface Product {
    id: number;
    title: string;
    description?: string;
}

//whats this   description?:string; means is that this property may or may not be there 

// s leaving it out is allowed. Without ?, leaving it out is an error.
const p1: Product = { id: 1, title: 'laptop' }
const p2: Product = { id: 2, title: 'Phone', description: 'A smart phone ' }

console.log(p1.description)
console.log(p2.description)

interface Car {
    id: number;
    title: string;
    description?: string;
}


const c1: Car = { id: 1, title: 'toyota' }
const c2: Car = { id: 2, title: 'honda', description: 'End of discussion' }

console.log(c1.title)
console.log(c2.description)

//readonly properties 

// some values should never change after object is created
//an order id should  stay the same forever once the order exists  readonly stops anyone from changing it
//by accident 

interface Order {
    readonly id: number;
    status: string;
}

const order: Order = { id: 100, status: 'pending' }
console.log(order);

order.status = 'received'
console.log(order)

// step 4 extends, building one interface from another 
//sometimes two things share the same properties. A User and an admin both have id, name
// and email. instead of repeating those, aadmin can User and just add whats extra.

interface Admin extends User {
    permissions: string[];
}

const admin: Admin = {
    id: 2,
    name: 'Root',
    email: 'root@example.com',
    permissions: ['delete', 'ban', 'edit']
}
console.log(admin)


// step 5: Methods in interface

// the idea an interface can also describe functions that belong to an object 
//not just data properties 


interface Greeter {
    name: string;
    greet(greeting: string): string;
}

//greet is the function name
//(greeting: string) is what it takes in 
//:string at the end is what it gives back 

//createing an object that matches it 

const greeter: Greeter = {
    name: 'Ada',
    greet(greeting) {
        return `${greeting}, I am ${this.name}`;
    }
}

console.log(greeter.greet('Hello'))

interface priced {
    price: number;
    cost(pricing: number): number
}


const pricecalculation: priced = {
    price: 100,
    cost(pricing) {
        return (this.price - 50)
    }

}



console.log(pricecalculation.cost(500))


//step 6 nested interfaces and arrrays 
//idea in real backend apis data is almost never flat, a customer has an address 
//which has street, city, postal code asnd a list of order IDS 

//in tyepscript an interface can use another interface as a property type and can also hold arrays .



interface Address {
    street: string;
    city: string;
}

interface Customer {
    name: string;
    address: Address; //uses the array interface above
    orderIds: number[]; //Array of numbers 
}

const customer: Customer = {
    name: 'Tunde',
    address: {
        street: '12 Allen Ave',
        city: 'Lagos'
    },
    orderIds: [101, 102, 103]
};

console.log(customer.address.city)


interface Location {
    lat: string;
    long: string
}

interface mapArea {
    dropOff: string;
    pickup: string;
    location: Location;
    orderId: number[]
}

const driver: mapArea = {
    dropOff: 'no 8 okilane mende maryland',
    pickup: '102 st finbarrs college road akoka',
    location: {
        lat: '6.895',
        long: '4.5678'
    },
    orderId: [29, 32, 12]
}

//Mini challenege

interface Shipment {
    readonly id: number;
    destination: string;
    delivered: boolean;
    notes?: string
}

const s1: Shipment = {
    id: 23,
    destination: 'obalende cllose lagos island',
    delivered: true

}

const s2: Shipment = {
    id: 24,
    destination: 'no 12 maryland crescent',
    delivered: false,
    notes: 'very fragile'
}

interface ExpressShipment extends Shipment {
    deliveryDays: number;
}

const express1: ExpressShipment = {
    id: 50,
    destination: 'park view ikoyi',
    delivered: true,
    deliveryDays: 20,
}

console.log(express1)
console.log(s2)



//type vs interface

//for basic objects both do almost the ame thing. 

//Step1 What is s type 

//type is just giving a nickname(alias) to any shape or  value 

type UserType = {
    id: number;
    name: string;
}


interface UserInterface {
    id: number;
    name: string;
}

const u1: UserType = { id: 1, name: 'Ada' };
const u2: UserInterface = { id: 2, name: 'Tunde' };

console.log(u1, u2)
//Step2

//What type can do that interface cannot

//An interface can only describe the shape of an object. it cannot represent anything else.
//A type alias can give a name to anything in Typescript 


//1:union
type ID = string | number;


//2. A Tuple (fixed pair)

type Point = [number, number];

//3. String literal union (only these exact strings are alllowed)


type orderStatus = 'pending' | 'shipped' | 'delivered';

const userId: ID = 'abc-123';
const userId2: ID = 456;
const coords: Point = [6.5244, 3.3792] //lagos coordintes

const status1: orderStatus = 'shipped'

console.log(userId, userId2, coords, status1)


//const badstatus : orderStatus = 'cancelled'

//So the main difference interface cannot create unions or stringg literals types with interface
//that is a superpower unique to type.

// what interface can do that type cannot

// what interface has that type does not is Declaration merging
//if you declare an interface with the same name twice, typescript merges them together into one big interface
//if you try to do that with a type, Typescript gives an immediate error: Duplicate identifier  

//step3 Declaration merging 

interface Settings {
    theme: string;
}


interface Settings {
    language: string;
}


const settings: Settings = {
    theme: 'darkmoade',
    language: 'en'
}

console.log(settings)

//step4
//Extending vs Intersection (extends vs &)

//interface uses the keyword extend
//type uses the ampersand symbol

interface Animal {
    name: string;
}


interface Dog extends Animal {
    breed: string
}


//lets use type


type AnimalT = {
    name: string;
}

type DogT = AnimalT & {
    breed: string;
}

const dog1: Dog = { name: 'Rex', breed: 'German Sherpherd' }
const dog2: DogT = { name: 'Captain', breed: 'bull dog' }

console.log(dog1)
console.log(dog2)

interface Country {
    name: string;
}

interface Nigeria extends Country {
    continent: string
}

type CountryT = {
    name: string;
}

type NigeriaT = CountryT & {
    continent: string;
}

const country1: Nigeria = { name: 'Nigeria', continent: 'Africa' }
const country2: NigeriaT = { name: 'England', continent: 'Europe' }

console.log(country1)
console.log(country2)

//which to use

//Objects shapes e.g Database model, Api requests/ resposnses, users. Order use intterfaces
// Unions (string |number, 'pending' | 'shipped) use type
//Tuples ([number, number]) use type;
//simple shortcuts/aliases ( type ID = string ) use Type

//An interface can use a type as one of its properties and a type can use an interface!

type Role = 'admin' | 'User' | 'guest';

interface Account {
    id: number;
    role: Role;
}

type Timestamps = { creaTedAt: string };


type AccountWithTime = Account & Timestamps

const acc: AccountWithTime = { id: 98766367, role: 'admin', creaTedAt: '2026-16-10' }
console.log(acc)

type Gender = 'male' | 'female' | 'transgender'

interface Student {
    id: number;
    gender: Gender
}

type Profile = {
    sector: string
}

type State = {
    state: string
}


type profilewithstate = Profile & State & Student

const citizen: profilewithstate = { id: 24, gender: 'male', sector: 'technology', state: 'delta' }
console.log(citizen)


//item 4 Unions Types(|)

//The Big idea 

// A union type says: This value can be any of these types 

//Step1 Basic union and the catch 

//Basic Union 

let trackingNumber: string | number
trackingNumber = 'TRK-9876';// ok it is a string
trackingNumber = 12345678;// ok it is a number

function printTracking(id: string | number) {
    //Both strings and numbers have .toString, so this is allowed:
    console.log('Tracking:', id.toString());
}

printTracking('AB12');
printTracking(999);

//step2 literal unions(e.g HTTP Methods) 

type HttpMethod = 'Get' | 'POST' | 'PUT' | 'Delete'

function handleRequest(method: HttpMethod, path: string) {
    console.log(`Handling ${method} request to path`)
}

handleRequest('Get', '/api/users');
handleRequest('POST', 'api/orders');

//step3

//Union with null the database pattern

//it is one of the most commonn patterns in backend apis 

/*interface UserProfile{
    id:number;
    username:string;
}

function findByid(id:number):  UserProfile | null{
    if(id === 1){
        return {id:1, username:'Ada'}
    }
    return null; //not found
}

const userA = findByid(1);
const userB = findByid(99);

console.log(userA?.username)
console.log(userB?.username)*/


interface UserDocument {
    id: number;
    proof: string
}

function finduserByproof(id: number): UserDocument | null {
    if (id === 1) {
        return { id: 1, proof: 'passport' }
    }
    return null;
}

const userA = finduserByproof(1)
const userB = finduserByproof(80)

console.log(userA?.proof)
console.log(userB?.proof)

//step4  Discriminated unions (Unions of different object shapes)


type CardPayment = {
    method: 'card'; //the common tag
    cardNumber: string;
    cvv: string;
};


type BankTransfer = {
    method: 'bank_transfer'; // the common tag
    accountNumber: string;
    bankName: string;
}



type cashDelivery = {
    method: 'cash'; //the common tag 
};


//payment is a union  of  all three shapes

type Payment = CardPayment | BankTransfer | cashDelivery;

const f1: Payment = {
    method: 'card',
    cardNumber: '5399-xxxx-xxxx-1234',
    cvv: '123'

}

const f2: Payment = {
    method: 'bank_transfer',
    accountNumber: '0123456789',
    bankName: 'GTBank'
}
const f3: Payment = {
    method: 'cash'
}


console.log(f1)
console.log(f2)












type debitTransanctions = {
    amount: number;
    debit: boolean
}

type CreditTransanctions = {
    amount: number;
    credit: boolean;
}


type BankTransanctions = debitTransanctions | CreditTransanctions

const b1: BankTransanctions = {
    amount: 100000,
    debit: true
}

const b2: CreditTransanctions = {
    amount: 500000,
    credit: false
}

console.log(b1, b2)

//Narrowing 

//item 5 Narrowing 

//The problem 

//remmber in unions when we had string | number and typescript  woudnt let you call .toUppercase()

function print(id: string | number) {
    id.toUppercase() //errror  numbers dont have toUppercase 
}


//The solution narrowing 


//Narrowing is what you telll typescript 
//Hey let me check what type this is right now using an if statement or switch.


//Step 1: typeof Narrowing (for primitives)

//1.  typeof Narrowing 

function formatValue(val: string | number): string {
    if (typeof val === 'string') {
        return val.toUpperCase()
    }
    return val.toFixed(2)
}


console.log(formatValue('Maryland crescent'))
console.log(formatValue(25.4567))


//step 2 Truthiness Narrowing (removing null or undefined)

//when an apiparameter migght be missing or null 

function greetUser(name: string | null | undefined) {
    if (name) {
        console.log(`welcome back ${name.toUpperCase()} !`)
    } else {
        console.log('welcome guest')
    }

}

greetUser('Ada')
greetUser(null)
greetUser(undefined)


//step 3 instanceof Narrowing (Crucial for backend try/catch)
// narrowing for classes dates and errors 


try {
    //simulating a failed dataabase connection 
    throw new Error('Database connection timed out');

} catch (err: unknown) {
    if (err instanceof Error) {
        // typescript now knows the err is definately an Error object, so .message exists!

        console.log('Caught anerror:', err.message);
    } else {
        console.log('An unexpected non-error was thrown')
    }
}

//step4 Narrowing checking if  a property exists 


type CarVehicle = { drive: () => void }
type BoatVehicle = { sail: () => void }


function operateVehicle(vehicle: CarVehicle | BoatVehicle) {
    if ('drive' in vehicle) {
        vehicle.drive()
    } else {
        vehicle.sail()
    }
}

operateVehicle({ drive: () => console.log('Driving on the third mainland bridge') })
operateVehicle({ sail: () => console.log('Sailing across the lagoon') })


//thats what narrowing does you inspect the object and typescript changes its mind about wht type vehicle is inside each block;


//Step 5 Discriminated Unions with switch 

type Card = { type: 'card'; cardNumber: string }
type Transfer = { type: 'transfer'; bankName: string; }
type Cash = { type: 'cash' };

type PaymentMethod = Card | Transfer | Cash;

function processPayment(payment: PaymentMethod): string {
    switch (payment.type) {
        case 'card':
            return `Changing card ending in ${payment.cardNumber.slice(-4)}`

        case 'transfer':
            return `waiting for  wire transfer to ${payment.bankName}`;

        case 'cash':
            return 'Collecting cash on deivery'
    }
}


/*type Card = { type: 'card', cardNumber: string }
type Transfer = { type: 'transfer', bankName: string }
type Cash = { type: 'cash' }

type PaymentMethod = Card | Transfer | Cash

function processPayment(payment: PaymentMethod): string {
    switch (payment.type) {
        case 'card':
            return `Changing card ending in ${payment.cardNumber.slice(-4)}`
        case 'transfer':
            return `waiting fro wire tranfer to ${payment.bankName}`
        case 'cash':
            return 'Collecting cash on delivery'
    }

}

console.log(processPayment({type:'card', cardNumber:'1234-5678-9012'}))
console.log(processPayment({type:'transfer', bankName:'Zenith Bank'}))
console.log(processPayment({type:'cash'}))*/


/*type Card = {
    type:'card',
    cardNumber:string
}

type Transfer = {
    type:'transfer',
    bankName:string
}

type Cash = {
    type:'cash'
}

type Processmethod = Card  | Transfer  | Cash 

function processTransanction(process:Processmethod): string{
    switch(process.type){
      case 'card':
        return `This is my atm no ${process.cardNumber}`
        case 'transfer':
            return `I went to check the  transfer if it was commpleted at ${process.bankName}`
            case'cash':
            return ' They are not giving cash'
    }
}

console.log(processTransanction({type:'card', cardNumber:'126678991'}))
console.log(processTransanction({type:'transfer', bankName:'Fidelity Bank'}))
console.log(processTransanction({type:'cash'}))*/

//Step6
//Custom Type Guard (value is string)


// lets say your check is complete and you want to extract it into its own helper function 



function isString(value: unknown): value is string {
    return typeof value === 'string'
}

const apiresponse: unknown = 'Success payload';

if (isString(apiresponse)) {
    console.log('Length of string:', apiresponse.length)
}



function double(x: string | number) {
    if (typeof x === 'number') {
        return x * 2
    } else if (typeof x === 'string') {
        return x + x
    }
}

console.log(double(10))
console.log(double('hi'))


type Success = { status: 'ok'; data: string; }
type failure = { status: 'error'; message: string; }

function handleapiResponse(res: Success | failure): void {
    switch (res.status) {
        case 'ok':
            console.log({ data: `${res.data}` })
            break
        case 'error':
            console.log({ Error: `${res.message}` })

    }
}


handleapiResponse({ status: 'ok', data: 'Users loaded successfully' })
handleapiResponse({ status: 'error', message: '404 not found' })


//item 6:Enums (Enumerations)
//instead of typing 'magic strings' like admin shipped or numbers like 404 throughout your codebase where a single mistake breaks your code base uou define them in one single place 


// Item 6: Enums (Enumeraions)

//The big idea

//An enum is named group of constant values 

//Numeric Enums  

enum Direction {
    Up,
    Down,
    Left,
    Right
}
enum priority {
    Low = 2,
    Medium,
    High
}

console.log(priority.Medium)

console.log(Direction.Up)
console.log(Direction.Right)


console.log(priority[2])

//String Enum


enum UserRole {
    Admin = 'Admin',
    User = 'USER',
    Guest = 'GUEST'
}
function checkAccess(role: UserRole): boolean {
    return role === UserRole.Guest
}

console.log(checkAccess(UserRole.Admin))




enum Gpa {
    firstclass = 'FIRSTCLASS',
    secondclass = 'SECONDCLASS',
    thirdclass = 'THIRDCLASS'
}

function checkCGPA(classofGpa: Gpa): boolean {
    return Gpa.secondclass === 'SECONDCLASS'
}

console.log(Gpa.secondclass)



//Step 4  Enums inside interfaces


/*enum Orderstatus {
    Pending = 'PENDING',
    Shipped = 'SHIPPED',
    Delivered = 'DELIVERED'
}



interface OrderRecord {
    id: number;
    status: Orderstatus;

}


const myorder: OrderRecord = {
    id: 101,
    status: Orderstatus.Shipped
}

console.log(myorder)*/

enum CarDirection {
    Forward = 'FORWARD',
    Backward = 'BACKWARD',
    middle = 'MIDDLE'
}

interface Vehicle {
    id: number;
    direction: CarDirection;
}

const Truck: Vehicle = {
    id: 24,
    direction: CarDirection.Forward
}

console.log(Truck)


//item 7 Typed functions

//in backend services almost every line of code you write lives inside a function route, handlers 
// service methods, database queries utility helpers 
//in typescript every function has two sides of the contract 



//1: Parameters what callers must you give;
//Return type what your function promises to give back.


//Step 1 Regular typed functions 

function add(a: number, b: number): number {
    return a + b
}

//Arrow function 

const multiply = (a: number, b: number): number => a * b;


//step2 optional chaining


function greetPerson(name: string, greeting?: string): string {
    return `${greeting ?? 'Hello'}, ${name}`
}

function power(base: number, exponent: number = 2): number {
    return base ** exponent
}

console.log(greetPerson('Ada'));
console.log(greetPerson('Ada', 'Good day'))
console.log(power(3));
console.log(power(3, 3))

//step 3 rest parameters 

//collect all extra arguments into an array of numbers 

function summAll(...numbers: number[]): number {
    return numbers.reduce((total, n) => total + n, 0)
}

console.log(summAll(20, 40, 60, 80))

//functions returning a union and need narrowing  

//step 4

interface Item {
    id: number;
    name: string;

}


function findItem(items: Item[], targetId: number): Item | undefined {
    return items.find(item => item.id === targetId);
}

const inventory: Item[] = [
    { id: 1, name: 'MacBook' },
    { id: 2, name: 'Keychron Keyboard' }
];
const found = findItem(inventory, 2);
if (found) {
    //Narrowing  Typescript knows found is definely an item here:
    console.log('Found:', found.name);
} else {
    console.log('Item not found')
}

//step 5 Function Types (Typing a callback)


/*In backend development  you often pass a function as an argument into another function 
you can define a type for what a function must look like 


*/

type Operation = (a: number, b: number) => number

// substract gets its type automatically from operation 

const substract: Operation = (a, b) => a - b;
const multiple: Operation = (a, b) => a * b

function calculate(a: number, b: number, op: Operation): number {
    return op(a, b)
}

console.log(calculate(10, 4, substract))
console.log(calculate(20, 6, multiple))

type medium = (a: number, b: number) => number

const Add: medium = (x, y) => x + y
const Divide: medium = (x, y) => x / y

function determine(a: number, b: number, me: medium): number {
    return me(a, b)
}

console.log(determine(60, 12, Divide))
console.log(determine(30, 70, Add));



type userRole = 'admin' | 'user' | 'guest';

interface Account1 {
    id: number,
    email: string,
    userrole: userRole,
    age?: number;
}

function createAccount(id: number, email: string, userrole: userRole = 'user'): Account1 {
    return { id, email, userrole }

}


function isAdult(account: Account1): boolean {
    if (account.age !== undefined && account.age >= 18) {
        return true
    }

    return false// Age was missing or they are under 18 
}

const user5 = createAccount(1, 'ada@example.com')
user5.age = 22
const user6 = createAccount(2, 'bili@example.com')
user6.age = 15

console.log(isAdult(user5))
console.log(isAdult(user6))

const user3 = createAccount(30, 'hippi@gmail.com'); // no age 
user3.age = 45
console.log(isAdult(user5))
console.log(isAdult(user6))
console.log(isAdult(user3))

// Question C

function describeAccount(account: Account1): string {
    switch (account.userrole) {
        case 'admin':
            return `Administrator <${account.email}>`
        case 'user':
            return `User <${account.email}>`
        case 'guest':
            return 'Guest'

    }
}


type gender = 'male' | 'female'
interface School {
    id: number;
    email: string;
    studentclass: studentClass;
    gender?: gender;

}

type studentClass = 'first' | 'second' | 'third'


function createStudent(id: number, email: string, studentclass: studentClass = 'first'): School {
    return { id, email, studentclass }
}


const student1 = createStudent(2, 'michaelidundun3@gmail.com', 'second')


student1.gender = 'male'
//console.log(isMale(student1))

//note if a field has a fixed set of valid values (roles,statuses,gender, HTTP methods) use a lateral union not string



const isMale = (student: School) => student.gender === 'male'
console.log(isMale(student1))


function parseId(input: number | string): number {
    if (typeof input === 'number') {
        return input
    }

    return Number(input)
}


console.log(parseId(42))
console.log(parseId('42'))
console.log(parseId('abc'))

// find account bby email



function findAccountByemail(account: Account1[], email: string): Account1 | undefined {
    return account.find(acc => acc.email === email)
}




const allAccounts: Account1[] = [user5, user6, user3];

const found2 = findAccountByemail(allAccounts, 'damilaremichaels@gmail.com')

if (found2) {
    console.log('Account found:', found2.email)
} else {
    console.log('Account not found')
}




function findAccountById(accounts: Account1[], id: number): Account1 | undefined {
    return accounts.find(acc => acc.id === id)
}




const found3 = findAccountById(allAccounts, 1)

if (found3) {
    console.log('account found', found3)
} else {
    console.log('account not found')
}

const missing = findAccountByemail(allAccounts, 'unknown@example.com');
if (missing) {
    console.log('Account found:', missing.email)
} else {
    console.log('Account not found')
}



//concept1 Generics (<T>)
//Theory and why  it exists in plain english 

// without generics you would have to write 50 different result types 

//<T> is  a variable but for tyoes 

type Result<T> = { success: true, data: T } | { success: false, error: string }


//when you pass Task, T becomes Task!
//when you pass User, T becomes User!
//when you pass number, T becomes number!


function wrapInArray<T>(item: T): T[] {
    return [item]
}


const stringArr = wrapInArray('Ada');
const numArr = wrapInArray(100);
const objArr = wrapInArray({ id: 1, name: 'Tunde' })
console.log(stringArr)
console.log(numArr)
console.log(objArr)

//Generic interfaces 


interface ApiResponse<T> {
    status: number;
    message: string;
    data: T
}



const userResponse: ApiResponse<Account1> = {
    status: 200,
    message: 'User found',
    data: user5,
}


const stringResponse: ApiResponse<string> = {
    status: 200,
    message: 'Health check is ok',
    data: 'Server running smoothly'
}


const listResponse: ApiResponse<number[]> = {
    status: 200,
    message: 'Scores loaded',
    data: [95, 88, 100]
}


console.log(listResponse)
console.log(stringResponse)
console.log(userResponse)

type Solution<S> = { question1: string, answer: S } | { question1: number, question2: number }

function Getsolution<S>(solute: S): S[] {
    return [solute]
}


const numberSolute = Getsolution([4, 5])
const stringSolute = Getsolution(['bode'])
console.log(stringSolute)
//console.log(numberSolute)

//step3 generic constraints

//with T it can literally be anything a number, a boolean, a string null and array



// id  complains because T could be number and numbers dont have id

//solution 

//I want T to be generic, but it must have at least an id: number property 

// you do that with the keyword extends 
// create the interface first 

interface HasId {
    id: number;
}

function printId<T extends HasId>(item: T): number {
    return item.id;
}

const mydata = printId({ id: 101, name: 'Ada' })
console.log(mydata)

interface identifiable {
    id: number;
}

function findByid<T extends identifiable>(items: T[], id: number): T | undefined {
    return items.find(item => item.id === id)
}

const item = findByid(inventory, 2)
console.log('Found item:', item);

const account = findByid([user5, user6], 1)
console.log('found account', account)

//Concept 2 Utility types Partial, pick omit and record 

interface Userprofile {
    id: number;
    email: string;
    username: string;
    avatarUrl: string;
    createdAt: Date;
}

// why we use utility types 

//Updating a user patch : 

/*
 when a user updates their profile they dont send every field .  Thye might only want to chnage their username
 without utility types you might want to write a second interface with ?. waste of time and duplicates code 


 2: Creating a new user:  when a user registers their profile email, username and password 
  but they do not provide the id because the db generates it  Omit<UserProfile, 'id' | 'createdAt'> automatically takes UserProfile and d
  rops id and createdAt!

  3: Showing a public profile:  you only want to expose username and avatarUrl to other users
hiding email and internal fields, Solution: Pick<UserProfile, 'username' | 'avatarUrl'> picks only the fields you specify!

 4: Scenario key value: look up dictionary :  you need a look up map of roles too permissions

 e.g 'admin', 'member', 'guest' Solution RecordRole, string[]> defines an object where the keys must be valid roles 
*/




// Partial


interface Userprofile1 {
    id: number;
    email: string;
    username: string;
    age: number;
}


function updateProfile(current: Userprofile1, updates: Partial<Userprofile1>): Userprofile1 {
    return { ...current, ...updates }

}


const userProfile1: Userprofile1 = {
    id: 1,
    email: 'ada@example.com',
    username: 'ada_lovelace',
    age: 25,
}


const updated = updateProfile(userProfile1, { username: 'ada_the_coder' })

interface UserInformation {
    id: number;
    email: string;
    passportnumber: number;
}


function updateInformtion(current: UserInformation, updates: Partial<UserInformation>): UserInformation {
    return { ...current, ...updates }
}

const userInformation1: UserInformation = {
    id: 45,
    email: 'michaelidundun3@gmail.com',
    passportnumber: 56
}


const updateInformation1 = updateInformtion(userInformation1, { id: 50 })
console.log(updateInformation1)


//omit type 

/*
omit takes an exixting type and completely removes the properties you specify 
unlike parrtial that makes field optional omit deletes the types 

so the user cannot provide them at all 

*/


type RegisterInput = Omit<Userprofile, 'id' | 'createdAt'>

function registerUser(input: RegisterInput): Userprofile {
    return {
        ...input,
        id: Math.floor(Math.random() * 1000), //simulating DB auto- increment
        createdAt: new Date(),
    }
}

const createUser = registerUser({ email: 'idundunmd13@gmail.com', username: 'mikibanks', avatarUrl: 'mikibanks13@gmail.com', })
console.log(createUser)


// why it is important in backend security

/*
in backend enginerring if your Api blindly accepts whatever JSON the client sends 
the attacker could send 
{
  "email": "hacker@evil.com",
  "username": "hacker",
  "id": 1,            // <-- Overwrites admin user with ID 1!
  "role": "admin"     // <-- Grants themselves admin rights!
}

by using omit typescript makes it impossible at compile time for
anyone using your funcion layer to accidentally forward forbidden fields  like id from the caller 
*/




//pick and omit 


/*

omit/pride

omit You want almoast all fields dropping 1/2 e.g createdAt

give me only specific fields ignore everything else 
*/


//Real world scenario :Public Profile and data privacy 

type PublicProfile = Pick<Userprofile, 'username' | 'avatarUrl'>

function getPublicProfile(user: Userprofile): PublicProfile {
    return {
        username: user.username,
        avatarUrl: user.avatarUrl,
    }
}

const publicView = getPublicProfile(createUser);
console.log('Public profile:', publicView)

//Record <keys> defines a typed key value dictionary 

//Real world scenarios role based access control(RBAC)



// in almost every backend api different user roles have different permissions 

type userPermission = 'admin' | 'member' | 'guest'


//create the permission lookup map using permit 

const rolePermissions: Record<userPermission, string[]> = {
    admin: ['create', 'read', 'update', 'delete'],
    member: ['read', 'update'],
    guest: ['read']
}


//write a helper function to check permission 

function hasPermission(role: userPermission, permission: string): boolean {
    return rolePermissions[role].includes(permission)
}

console.log('Can guest delete?', hasPermission('guest', 'delete'))
console.log('can admin delete?', hasPermission('admin', 'delete'))


//Type classes and modifiers 

//why classes in backend ?

/*
In javascript any piece of code cn mutate or tamper with an objects 

properties  from anywhere 

in Typescript access modifiers can let you lock down data so that sensitive information

like passwords, balances, or databases cannot be messed up directly



*/


//The typescript shortcut parameter properties 

class User3 {
    constructor(
        public readonly id: number,
        public email: string,
        private passwordHash: string
    ) { }
}

//in typescript you can put the acess modifier directly insiade the constructor arguments

//Theory : Class Methods and typing 


//A method is a function that belongs to a classs in typescript;
// methods require two things 

// Typed parameters (what the method accepts )
//Typed return value(what the method gives back or :void if it returns nothing)
//Access modifiers (public,private and protected)


class BankAccount {
    constructor(
        public readonly accountNumber: string,
        private balance: number
    ) { }

    public deposit(amount: number): void {
        if (amount <= 0) {
            throw new Error('Deposit must be positive')
        }
        this.balance += amount
    }

    public getBalance(): number {
        return this.balance;
    }

    private logTransanction(type: string, amount: number): void {
        console.log(`[TX] ${type}: $${amount}`)
    }

}


/*
"Why make class methods or properties private when TypeScript compiles down to regular JavaScript which doesn't enforce private by default?"
Answer: TypeScript's access modifiers (private, protected) provide compile-time safety. 
They prevent other developers and parts of the codebase from creating bugs or breaking domain rules before the code ever deploys.
 (Note: modern JS also has #privateField, but TS modifiers
 are standard for contract design).

*/

//public method anyone cancall this 


//Theory Getters and Setters    (get / set)

//Getters and setters lets a method look and behave like a regular property from the outside but run code under the hood

//get: Computes or reads a value from the fly without allowing direct writes 
//set: intercepts writes to a property so you can validatee data before updating  

class ProductionItem {
    constructor(
        public name: string,
        private _price: number
    ) { }

    get price(): number {
        return this._price;
    }

    //setter: called when doing item.price = 200

    set price(newPrice: number) {
        if (newPrice < 0) {
            throw new Error('Price cannot be negative')
        }
        this._price = newPrice
    }
}


const item2 = new ProductionItem('Laptop', 1000)
console.log(item2.price)
console.log(item2.name)

//setter : Called when  doing the price  = 200

class FurnitureItem {
    constructor(
        public name: string,
        private _price: number

    ) { }

    get price(): number {
        return this._price

    }
    set price(newPrice: number) {
        if (newPrice < 0) {
            throw new Error('Price cannnot be negative')
        }
        this._price = newPrice
    }

}


const item5 = new FurnitureItem('table', 5000)
item5.price = 3500

console.log(item5.price)

//Async and  await typing 



function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function fetchUserById(id: number): Promise<Userprofile1 | null> {
    await delay(500)
    if (id === 1) {
        return userProfile1
    }
    return null
}

async function runAsyncDemo(): Promise<void> {
    const user10 = await fetchUserById(1)
    const user11 = await fetchUserById(999)
    console.log(user10)
    console.log(user11)
}


runAsyncDemo()

/*
In backend engineering almost every critical operation involves waiting
 Querying a database (Postgres, MongoDB)
Calling an external service (Stripe, Paystack, SendGrid)
Reading or writing files on disk
Reading data from a redis cache

Because node.js is single threaded, it cannot stop the entire server while waiting for the 
database to answer. Instead it uses Promises.


what is a promise<T>?



A promise is a placeholder for a value that does not exists yet, but will exist in the future.
Promise<string> promises to deliver a string later
Promise<Userprofile> promises to deliver a Userprofile1 later.
Promise<void> promises to complete an action without returning any date (e.g sending an email or saving a log) 
The Golden rule for async functions any function marked with the async keyword always returns a promise.


interviewer : If a function is marked async and does not return anything, 
what is its return type: void or Promise<void>?

Answer: It is Promise<void>. An async function always returns a Promise, even if it returns
nothing inside, Returning void would mean it returns synchronously 


*/

//Step 2 Async error handling and the unknown catch variable 

/*
In backend development, async operations can fail (database goes down network timeout and invalid token)
common  mistake 

try{
await fetchUserById(1)

}catch(error){
console.log(error.message) // in strict typescript 
Object is of type unknown 
}


throw new Error ("DB Connection failed")


Step 3 Concurrency with Promise.all (A key backend pattern)




*/

//imagine you need to fetch 3 independent pieces of data


/*
this is slow
const user12 = await fetchUser();
const posts  = await fetchPosts()
const notifications = await fetchNotifications();
*/

//this is fast 

//all three run in parallel 

/*const [user,posts,notifications] = await Promise.all([
    fetchUser(),
    fetchPosts(),
    fetchNotifications()
])*/


async function fetchUserOnThrow(id: number): Promise<Userprofile1> {
    await delay(300)
    if (id === 1) {
        return userProfile1
    }
    throw new Error("User with ID " + id + "not found")
}

async function testErrorHandling(): Promise<void> {
    try {
        await fetchUserOnThrow(999)
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.log("Caught expected error:", err.message)
        } else {
            console.log("An unexpected error was thrown")
        }
    }
}

testErrorHandling();

//Promise.all - run multiple async calls in PARALLEL(fast)

async function runParallel(): Promise<void> {
    const [user1, user2] = await Promise.all([
        fetchUserById(1),
        fetchUserById(999)
    ])
    console.log('Parallel results:', user1, user2)
}

runParallel();

//real explanation 

//Class Inheritance

class Animal {
    constructor(public name: string) { }
    speak(): string {
        return `${this.name} makes a sound`
    }
}


class Dog extends Animal {
    constructor(name: string, public breed: string) {
        super(name) // sets up the parent first
    }
    speak(): string {
        return `${this.name} barks`// overides parents  
    }
}

const dog = new Dog('Rex', 'German Shepherd')
console.log(dog.speak());
console.log(dog.breed)

//Implements - a class must match an interface contract 

interface Printable {
    print(): void;
}



class Invoice implements Printable {
    constructor(public id: number, public amount: number) { }
    print(): void {
        console.log(`Invoice #${this.id}: ${this.amount} `)
    }
}

class Receipt implements Printable {
    constructor(public id: number, public amount: number) { }
    print(): void {
        console.log(`Receipt #${this.id}: ${this.amount} `)
    }
}

const inv = new Invoice(101, 5000)
const rep = new Receipt(500, 3000)
inv.print();
rep.print();


//step2 Big 0 intro (last thing on week 1 timetable)

//Big-O answers one question only

//As my data  gets bigger how much slower does my code get 

//O(1) constant time 

//it always takes the same time no matter how much data you leave 

//0(1) looking up by index or key 
//it always take the same time no matter how much you  have

const users = ['ada', 'Tunde', 'Bola', 'Emeka'];

//goes directly to position 2 - instant no searching 
const user = users[2]
console.log(user)


//looking up in ann object by key - also 0(1)

const points: Record<string, number> = {
    Ada: 95,
    Tunde: 88,
    Bola: 72,
}

const adaPoint = points['Ada']
console.log(adaPoint)

//0(n)  Linear Time 

// the bigger the data the longer it takes 

const biscuit = ['Fab', 'MunchSkin', 'Digestive', 'wafers']

//Finding  by value means checking one by one 

function findBiscuit(list: string[], target: string): string | undefined {
    for (const name of list) {
        if (name === target) return name;
    }
    return undefined
}

console.log(findBiscuit(biscuit, 'Digestive'))

const products = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Phone' },
    { id: 3, name: 'Tablet' }

]

// O(n) -  looping through everythig to find by id

function findByIdSlow(id: number) {
    return products.find(p => p.id === id)
}
// this is wrong 

// O(1) if you use a lookup object (like a dictionary)

const productMap: Record<number, { id: number; name: string }> = {
    1: { id: 1, name: 'Laptop' },
    2: { id: 2, name: 'Phone' },
    3: { id: 3, name: 'Tablet' }
}

function findByIdFast(id: number) {
    return productMap[id];
}

console.log(findByIdSlow(3))  //O(n) goes directly - no loop
console.log(findByIdFast(3))   //O(n) goes staright to key 3


//how does the internet actually work
//what happens when your app calls fetch

//Step1 DNS lookup (what is the ip address of api.myapp.com)

//DNS Server returns IP: 142.250.190.46

//step 2:Connect to Ip on PORT 443(HTTPS)via TCP 3 -way Handshake + TLS

//Backend server

// client needs raw texts http requests

// step 4: Server processes and responds (Http response)

//the 3 networking concepts

//Ip addess (The building address):

/*
Every machine connected to the internet has one (e.g 142.250.190.46). it tells packets wich physical
server to reach


Port: The room number: One server can run multiple services at the same time.
Ports tell the computer which program runs the traffic

Port 80:Standard HTTP(unencrypted)
Port 443: HTTPS (encrypted with SSL/TLS)
Port 5432: PostgreSQL database
Port 3000/8000:Typical local Node/Express development servers 

DNS (The phone book):

Humans remember google.com, computers only understand numbers like 142.250.190.46. DNS translates names to numbers.


2: Anatomy of an HTTP  Request and Response 
Http is plain text sent over a TCP socket 


//Interview questions 

what is idempotency and which methods are idempotent 

idempotent means making the same request 1 time or 100times leaves the server in the exact same state 

status codes to know by heart 

2xx(success)
200 ok - standard success
201 created - Resource created 
204 No Content - Success with empty body (often delete)

3xx(Redirect):

301 moved permanently
304 not modified caching 

4xx client error( the caller made a mistake)

400 Bad request - Invalid json or validation failed 
401 Unauthorized: missing or invalid authentivation 
403 Forbidden
404: Not found 
429: too many requests

5xx (server error)

500 Internal server error - Bug/unhandled exception in backend 
502:bad gateway 
503: service unavailable 

 why is POST not idempotent, but PUT is idempotent

 put is idempotent because it just says updates this resource at that exact state it targets a url 
 so repeating it just overwrites the same thing with the same data

 Post is not idempotenet because it says process this and create something new ,
 the server decides what to do each time so this can cause repeating it
 example post orders 
 send this 3 items and you get 3 orders :POST /orders
{ "item": "shoes", "qty": 1 }
for number 2 the staus code to return is 401 unauthorized 
*/

/*

Node.js Internals and the event loop 

Javascript is single threaded it  only has one call stack and does one thing at a time 
How can a Node.js backend serve 10,000 active users at the same time without freezing?


*/







































