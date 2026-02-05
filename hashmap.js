import { LinkedList } from "./linkedList.js";

class Hashmap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this._loadFactor = loadFactor;
    this._capacity = capacity;
    this._hashMap = [];

    for (let i = 0; i < capacity; i++) {
      this._hashMap.push(new LinkedList());
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this._capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // Hash the key to get a number
    const hash = this.hash(key);
    // Go to the bucket with that number
    const linkedList = this._hashMap[hash];
    const object = { [key]: value };

    // Now check if the key exists
    // If the bucket is empty, put it inside
    if (linkedList.size() === 0) {
      linkedList.append(object);
    } else {
      // Traverse through the linked list
      // Start from the head
      let nextNode = linkedList.getHeadNode();
      while (true) {
        if (nextNode === null) {
          // This means we didn't find the key
          // So append the new object
          linkedList.append(object);
          break;
        } else if (key === Object.keys(nextNode.value)[0]) {
          // This means we found they key
          // Overwrite it
          nextNode.value = object;
          break;
        }
        // Move to the next node
        nextNode = nextNode.nextNode;
      }
    }
  }

  get(key) {
    const hash = this.hash(key); 
    const bucket = this._hashMap[hash]; 

    if (bucket.size() === 0) return null; 
    
    let nextNode = bucket.getHeadNode(); 
    
    while (true) {
      if (nextNode === null) return null; 
      if (key === Object.keys(nextNode.value)[0]) {
        return nextNode.value[key]; 
      }
      nextNode = nextNode.nextNode; 
    }
  }

  has(key) {
    const hash = this.hash(key); 
    const bucket = this._hashMap[hash]; 

    if (bucket.size() === 0) return false; 
    
    let nextNode = bucket.getHeadNode(); 
    
    while (true) {
      if (nextNode === null) return false; 
      if (key === Object.keys(nextNode.value)[0]) {
        return true; 
      }
      nextNode = nextNode.nextNode; 
    }
  }
}

const hashmap = new Hashmap();
console.log(hashmap.hash("Rama")); 
console.log(hashmap.hash("Sita")); 

hashmap.set("Rama", "Foo"); 
hashmap.set("Sita", "Bar"); 

console.log(hashmap); 
console.log(hashmap._hashMap[3].toString()); 

hashmap.set("Name", "Sucker"); 

console.log(hashmap.get("name")); 
console.log(hashmap.has("Name")); 
console.log(hashmap.has("alskjv")); 