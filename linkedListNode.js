class Node {
  constructor(value = null, nextNode = null) {
    this._value = value;
    this._nextNode = nextNode;
  }

  get value() {
    return this._value; 
  }

  get nextNode() {
    return this._nextNode; 
  }

  set value(newValue) {
    this._value = newValue;
  }

  set nextNode(newNode) {
    this._nextNode = newNode;
  }
}

export { Node };