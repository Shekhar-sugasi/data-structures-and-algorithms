class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree([...new Set(array.sort((a, b) => a - b))]);
  }

  buildTree(array) {
    if (array.length === 0) return null;
    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);
    root.left = this.buildTree(array.slice(0, mid));
    root.right = this.buildTree(array.slice(mid + 1));
    return root;
  }

  insert(value, node = this.root) {
    if (node === null) return new Node(value);
    if (value < node.data) {
      node.left = this.insert(value, node.left);
    } else if (value > node.data) {
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  deleteItem(value, node = this.root) {
    if (node === null) return null;
    if (value < node.data) {
      node.left = this.deleteItem(value, node.left);
    } else if (value > node.data) {
      node.right = this.deleteItem(value, node.right);
    } else {
      if (node.left === null) return node.right;
      if (node.right === null) return node.left;

      let minNode = this.getMinNode(node.right);
      node.data = minNode.data;
      node.right = this.deleteItem(minNode.data, node.right);
    }
    return node;
  }

  getMinNode(node) {
    while (node.left !== null) node = node.left;
    return node;
  }

  find(value, node = this.root) {
    if (node === null || node.data === value) return node;
    if (value < node.data) {
      return this.find(value, node.left);
    } else {
      return this.find(value, node.right);
    }
  }

  levelOrder(callback) {
    if (!callback) throw new Error("A callback function is required");
    let queue = [this.root];

    while (queue.length > 0) {
      let current = queue.shift();
      callback(current);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
  }

  inOrder(callback = null, node = this.root, result = []) {
    if (node === null) return;
    this.inOrder(callback, node.left, result);

    if (callback) callback(node);
    else result.push(node.data);

    this.inOrder(callback, node.right, result);
    if (!callback) return result;
  }

  preOrder(callback, node = this.root) {
    if (!callback) throw new Error("A callback function is required.");
    if (node === null) return;

    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }

  postOrder(callback, node = this.root) {
    if (!callback) throw new Error("A callback function is required.");
    if (node === null) return;

    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }

  height(node) {
    if (node === null) return -1;
    return 1 + Math.max(this.height(node.left), this.height(node.right));
  }

  depth(node, current = this.root, depthValue = 0) {
    if (current === null || node === null) return -1;
    if (node.data === current.data) return depthValue;
    if (node.data < current.data) {
      return this.depth(node, current.left, depthValue + 1);
    } else {
      return this.depth(node, current.right, depthValue + 1);
    }
    return -1;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    let nodes = [];
    this.inOrder((node) => nodes.push(node.data));
    this.root = this.buildTree(nodes);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) return;
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 3, 5, 67, 324, 6345]);
console.log(tree.isBalanced());

tree.levelOrder((node) => console.log(node.data));
tree.inOrder((node) => console.log(node.data));
tree.preOrder((node) => console.log(node.data));
tree.postOrder((node) => console.log(node.data));

tree.insert(1000);
tree.insert(2000);
tree.insert(3000);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

console.log(tree);
prettyPrint(tree.root);
