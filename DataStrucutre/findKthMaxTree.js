class Node {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  
  class BinarySearchTree {
    constructor() {
      this.root = null;
    }
  
    insert(val) {
      let newNode = new Node(val);
  
      if (this.root == null) {
        this.root = newNode;
        return;
      }
  
      let currentNode = this.root;
      let parent = null;
  
      while (currentNode != null) {
        parent = currentNode;
        if (val < currentNode.val) {
          currentNode = currentNode.left;
        }
        else {
          currentNode = currentNode.right;
        }
      }
  
      if (val < parent.val) {
        parent.left = newNode;
      }
      else {
        parent.right = newNode;
      }
    }
  
    findMin() {
      if (this.root == null || (this.root.left == null && this.root.right == null))
        return this.root.val;
  
      let currentNode = this.root;
      let parent = null;
      while (currentNode != null) {
        parent = currentNode;
        currentNode = currentNode.left;
      }
  
      return parent.val;
    }
  
    findKth(kth) {
      var counter = 0;
      if (this.root == null || (this.root.left == null && this.root.right)) {
        return this.root.val;
      }
      let currentNode = this.root;
  
      function findKthIteration(currentNode, kth){
       
       if (currentNode){
         let rightChild = findKthIteration(currentNode.right, kth);
  
         if (rightChild) {
           if (counter == kth) {
             return currentNode;
           }
         } else {
           counter = counter + 1;
           if (counter == kth) {
             return currentNode;
           }
         }
  
          return findKthIteration(currentNode.left, kth);
       }
      }
  
      return findKthIteration(currentNode.right, kth);
    }
  }
  //6,4,9,2,5,8,12,10,14
  let binarySearchTree = new BinarySearchTree();
  binarySearchTree.insert(6);
  binarySearchTree.insert(4);
  binarySearchTree.insert(9);
  binarySearchTree.insert(2);
  binarySearchTree.insert(5);
  binarySearchTree.insert(8);
  binarySearchTree.insert(12);
  binarySearchTree.insert(10);
  binarySearchTree.insert(14);
  //console.log(JSON.stringify(binarySearchTree,null,2));
  
  //console.log(binarySearchTree.findMin());
  
  console.log(binarySearchTree.findKth(3));
  
  
  
  
  
  
  
  