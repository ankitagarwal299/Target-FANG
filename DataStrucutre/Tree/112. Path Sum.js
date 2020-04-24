class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var pathSum = function (root, sum) {
     function findPaths(currentNode, sum, currentPath) {
      if (currentNode == null) return;
      currentPath.push(currentNode.value);
      if (currentNode.value == sum && currentNode.left == null && currentNode.right == null)  return currentPath; 
      
       return findPaths(currentNode.left, sum - currentNode.value, Array.from(currentPath)) || findPaths(currentNode.right, sum - currentNode.value, Array.from(currentPath)) ;
    }
    
    return findPaths(root, sum, []);
  
  };
  
  const root = new TreeNode(12);
  root.left = new TreeNode(7);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(4);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(5);
  
  console.log(pathSum(root, 23));
  