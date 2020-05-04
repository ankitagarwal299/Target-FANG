class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var preorderTraversal = function (root) {
    if (root == null) return root;
    let preOrderPath = []
  
    let stack = [];
    stack.push(root);
  
    /* 
    print it 
    push right child
    push left child
     */
  
    while (stack.length > 0) {
      let currentNode = stack.pop();
      preOrderPath.push(currentNode.value);
      if (currentNode.right != null) stack.push(currentNode.right);
      if (currentNode.left != null) stack.push(currentNode.left);
  
    }
    
    return preOrderPath;
  }
  
  const root = new TreeNode(1);
  root.right = new TreeNode(2);
  root.right.left = new TreeNode(3);
  
  console.log(preorderTraversal(root));
  