class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var inorderTraversal = function (root) {
    if (root == null) return root;
  
    let inOrderPath = [];
    let stack = [];
  
    while (root || stack.length > 0) {
      if (root != null) {
        stack.push(root);
        root = root.left;
        
      } else {
        root = stack.pop();
        inOrderPath.push(root.value);
        root = root.right;
      }
    }
  
    return inOrderPath;
  };
  
  const root = new TreeNode(1);
  root.right = new TreeNode(2);
  root.right.left = new TreeNode(3);
  
  console.log(inorderTraversal(root));
  
  //Output: [1,3,2]
  