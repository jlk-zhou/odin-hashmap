import { LinkedList } from "./linkedList.js";

class Hashmap {
  constructor({ loadFactor = 0.75, capacity = 16, length = 0 } = {}) {
    this._loadFactor = loadFactor;
    this._capacity = capacity;
    this._hashMap = [];
    this._length = length;

    for (let i = 0; i < capacity; i++) {
      this._hashMap.push(new LinkedList());
    }
  }

  get length() {
    return this._length;
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
      this._length += 1;
    } else {
      // Traverse through the linked list
      // Start from the head
      let nextNode = linkedList.getHeadNode();
      while (true) {
        if (nextNode === null) {
          // This means we didn't find the key
          // So append the new object
          linkedList.append(object);
          this._length += 1;
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

    if (this._length / this._capacity > this._loadFactor) {
      this._expand();
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

  remove(key) {
    const hash = this.hash(key);
    const bucket = this._hashMap[hash];

    if (bucket.size() === 0) return false;

    let thisNode = bucket.getHeadNode();

    if (key === Object.keys(thisNode.value)[0]) {
      // We found the key at index 0
      // Otherwise make the next node the head node
      // This works even if there's no next node (since it's null)
      const nextNode = thisNode.nextNode;
      // Ew! For some reason I couldn't set head without using private var
      bucket._head = nextNode;
      bucket.sizeDown();
      this._length -= 1;
      return true;
    }

    while (true) {
      if (thisNode.nextNode === null) return false;
      if (key === Object.keys(thisNode.nextNode.value)[0]) {
        // We found the key in the next node after index 0
        // So remove this node from the bucket
        const oldNextNode = thisNode.nextNode;
        const newNextNode = oldNextNode.nextNode;

        thisNode.nextNode = newNextNode;
        oldNextNode.nextNode = null;

        bucket.sizeDown();
        this._length -= 1;

        return true;
      }
      thisNode = thisNode.nextNode;
    }
  }

  clear() {
    this._hashMap = [];
    this._length = 0;

    for (let i = 0; i < this._capacity; i++) {
      this._hashMap.push(new LinkedList());
    }
  }

  keys() {
    const keys = [];
    this._hashMap.forEach((bucket) => {
      let thisNode = bucket.getHeadNode();
      if (!thisNode) return;

      while (true) {
        keys.push(Object.keys(thisNode.value)[0]);
        thisNode = thisNode.nextNode;
        if (!thisNode) return;
      }
    });

    return keys;
  }

  values() {
    const values = [];
    this._hashMap.forEach((bucket) => {
      let thisNode = bucket.getHeadNode();
      if (!thisNode) return;

      while (true) {
        values.push(Object.values(thisNode.value)[0]);
        thisNode = thisNode.nextNode;
        if (!thisNode) return;
      }
    });

    return values;
  }

  entries() {
    const entries = [];
    this._hashMap.forEach((bucket) => {
      let thisNode = bucket.getHeadNode();
      if (!thisNode) return;

      while (true) {
        entries.push(JSON.stringify(thisNode.value));
        thisNode = thisNode.nextNode;
        if (!thisNode) return;
      }
    });

    return entries;
  }

  _expand() {
    const config = {
      capacity: (this._capacity *= 2),
    };
    const newHashMap = new Hashmap(config);

    const entries = this.entries();
    entries.forEach((entry) => {
      const object = JSON.parse(entry);
      newHashMap.set(Object.keys(object)[0], Object.values(object)[0]);
    });

    this._hashMap = newHashMap._hashMap;
  }
}

export { Hashmap };
