class Node {
  constructor(value = null) {
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.headNode = null;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.headNode) {
      this.headNode = newNode;
      return;
    }
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = newNode;
  }

  prepend(value) {
    const newNode = new Node(value);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
  }

  size() {
    let count = 0;
    let current = this.headNode;
    while (current) {
      count++;
      current = current.nextNode;
    }
    return count;
  }

  head() {
    return this.headNode;
  }

  tail() {
    if (!this.headNode) return null;
    let current = this.headNode;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }

  at(index) {
    if (index < 0 || index >= this.size()) {
      console.error("Error: Index out of bounds");
      return null;
    }

    let count = 0;
    let current = this.headNode;
    while (current) {
      if (count === index) return current;
      count++;
      current = current.nextNode;
    }
    return null;
  }

  pop() {
    if (!this.headNode) return null;

    if (!this.headNode.nextNode) {
      this.headNode = null;
      return;
    }
    let current = this.headNode;
    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }
    current.nextNode = null;
  }

  contains(value) {
    let current = this.headNode;
    while (current) {
      if (current.value === value) return true;
      current = current.nextNode;
    }
    return false;
  }

  find(value) {
    let index = 0;
    let current = this.headNode;

    while (current) {
      if (current.value === value) return index;
      index++;
      current = current.nextNode;
    }
    return null;
  }

  toString() {
    let result = "";
    let current = this.headNode;
    while (current) {
      result += `(${current.value}) ->`;
      current = current.nextNode;
    }
    result += "null";
    return result;
  }

  insertAt(value, index) {
    if (index < 0 || index > this.size()) {
      console.error("Error: Index out of bounds");
      return;
    }

    if (index === 0) {
      this.prepend(value);
      return;
    }
    const newNode = new Node(value);
    let current = this.headNode;
    let count = 0;
    while (current) {
      if (count === index - 1) {
        newNode.nextNode = current.nextNode;
        current.nextNode = newNode;
        return;
      }
      count++;
      current = current.nextNode;
    }
  }

  removeAt(index) {
    if (index === 0) {
      this.headNode = this.headNode.nextNode;
      return;
    }
    let current = this.headNode;
    let count = 0;
    while (current) {
      if (count === index - 1 && current.nextNode) {
        current.nextNode = current.nextNode.nextNode;
        return;
      }
      count++;
      current = current.nextNode;
    }
  }
}

const list = new LinkedList();
list.append("Shekhar");
list.prepend("Mr");
console.log(list.size());
console.log(list.head());
console.log(list.tail());
console.log(list.at(1));
console.log(list.pop());
console.log(list.contains("Shekhar"));
console.log(list.find("Shekhar"));
console.log(list.toString());
list.insertAt("sugasi", 2);
list.removeAt(2);
console.log(list);
