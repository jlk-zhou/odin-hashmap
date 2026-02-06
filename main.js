import { Hashmap } from "./hashmap.js";

const test = new Hashmap(); 

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')

// Change some existing keys
test.set("kite", "purple"); 
test.set("ice cream", "pink"); 
test.set("apple", "green"); 

// Add one more key to trigger expansion
test.set('sun', 'shiny'); 
test.set("moon", "silver"); 

// Overwrite some existing keys again
test.set("apple", "yellow"); 
test.set("lion", "black"); 
test.set("dog", "dotted"); 

// Check other functionalities
console.log(test.get("dog")); 
console.log(test.has("sun")); 
console.log(test.get("moon")); 
console.log(test.get("jupiter")); 
console.log(test.has("mars")); 

console.log(test.keys()); 
console.log(test.values())
console.log(test.entries()); 

console.log(test.length); 

test.remove("dog"); 
test.remove("carrot"); 
test.remove("lion"); 

console.log(test.length); 
console.log(test.has("dog")); 
console.log(test.has("lion")); 

test.clear(); 
console.log(test.entries()); 
console.log(test.length); 