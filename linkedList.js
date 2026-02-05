import { Node } from "./linkedListNode.js";

class LinkedList {
  constructor(head = undefined, size = 0) {
    this._head = head;
    this._size = size;
  }

  set head(newHead) {
    this._head = newHead;
  }

  getHeadNode() {
    return this._head;
  }

  getTailNode() {
    let nextNode = this.getHeadNode();
    if (nextNode === undefined) return;

    while (true) {
      if (nextNode.nextNode === null) {
        return nextNode;
      } else {
        nextNode = nextNode.nextNode;
      }
    }
  }

  append(newValue) {
    // Create the new node
    const newNode = new Node();
    newNode.value = newValue;

    // Traverse through the list
    const tailNode = this.getTailNode();

    // If the list is empty, this new node is the new head
    if (tailNode === undefined) {
      this._head = newNode;
    } else {
      // Stick the new node at the end
      tailNode.nextNode = newNode;
    }
    this._size += 1;
  }

  prepend(newValue) {
    const newNode = new Node();
    newNode.value = newValue;

    const headNode = this.getHeadNode();
    if (headNode !== undefined) {
      newNode.nextNode = headNode;
    }

    this._head = newNode;

    this._size += 1;
  }

  size() {
    return this._size;
  }

  head() {
    const headNode = this.getHeadNode();
    if (headNode === undefined) return;
    return headNode.value;
  }

  tail() {
    const tailNode = this.getTailNode();
    if (tailNode === undefined) return;
    return tailNode.value;
  }

  at(index) {
    if (index < 0) return;
    if (index === 0) return this.head();

    let nextNode = this.getHeadNode();

    for (let i = 1; i <= index; i++) {
      nextNode = nextNode.nextNode;
      if (nextNode === null) return;
    }

    return nextNode.value;
  }

  pop() {
    const headNode = this.getHeadNode();
    const nextNode = headNode.nextNode;
    this._head = nextNode;

    this._size -= 1;

    return headNode.value;
  }

  contains(value) {
    if (this.size() === 0) return false;

    let nextNode = this.getHeadNode();

    while (true) {
      if (!nextNode) {
        return false;
      } else if (value === nextNode.value) {
        return true;
      }
      nextNode = nextNode.nextNode;
    }
  }

  findIndex(value) {
    if (this.size() === 0) return -1;

    let nextNode = this.getHeadNode();
    let index = 0; 

    while (true) {
      if (!nextNode) {
        return -1;
      } else if (value === nextNode.value) {
        return index;
      }
      nextNode = nextNode.nextNode;
      index += 1; 
    }
  }

  toString() {
    let string = "";
    let nextNode = this.getHeadNode();
    if (!nextNode) return string;

    while (true) {
      let text; 

      if (typeof nextNode.value === "object") {
        text = JSON.stringify(nextNode.value); 
      } else {
        text = nextNode.value; 
      }

      string = string + `( ${text} ) -> `;
      nextNode = nextNode.nextNode;
      if (nextNode === null) {
        string = string + "null";
        return string;
      }
    }
  }
}

export { LinkedList };
