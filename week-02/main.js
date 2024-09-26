// TODO 以 Module 的方式匯入，例如:
import Stack from './stack.js';

let stack = new Stack();
console.log("init stack:")
stack.print();

let number = 1;
let str = "string";
let bool = true;
let nu = null
let und = undefined
let sampleObj = {
    sample: "sample"
}

// 1. Try to push and peek primitive type and object
console.log("\n1. push element:")

stack.push(number);
console.log("Peek:", stack.peek());

stack.push(str);
console.log("Peek:", stack.peek());

stack.push(bool);
console.log("Peek:", stack.peek());

stack.push(nu);
console.log("Peek:", stack.peek());

stack.push(und);
console.log("Peek:", stack.peek());

stack.push(sampleObj);
console.log("Peek:", stack.peek());

console.log("stack:")
stack.print();
console.log("stack size:", stack.size())

// 2. Try to pop all element

console.log("\n2. pop elemrnt one by one:")

let size = stack.size()
for (let i=0; i<size; i++) {
    stack.pop();
    stack.print();
}

// 3. pop when stack is empty
console.log("\n3. peek and pop when stack is null:")

console.log(stack.peek());
console.log(stack.pop());
stack.print();

// 4. Test isEmpty and clear
console.log("\n4. Test isEmpty and clear:")
stack.push(number);
stack.push(str);
stack.push(bool);
stack.push(nu);
stack.push(und);
stack.push(sampleObj);

console.log("stack before clear:")
stack.print()

stack.clear()

console.log("stack after clear:")
stack.print()