class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var treeToSumTree = function (root) {
    if (root == null) return null;
  
    function sumTree(root) {
      if (root == null) return 0;
      let oldValue = root.value;
      root.value = sumTree(root.left) + sumTree(root.right);
      return root.value + oldValue;
    }
      sumTree(root);
  
    return  JSON.stringify(root)
  };
  
  const root = new TreeNode(10);
  root.left = new TreeNode(-2);
  root.right = new TreeNode(6);
  
  root.left.left = new TreeNode(8);
  root.left.right = new TreeNode(-4);
  
  root.right.left = new TreeNode(7);
  root.right.right = new TreeNode(5);
  
  console.log(treeToSumTree(root));
  