class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }


  var pathSum = function (root) {
  
    function findPaths(currentNode, totalPathSum) {
      if (currentNode == null) return 0;
    
      // calculate the path number of the current node
      totalPathSum = 2 * totalPathSum + currentNode.value;      

      if (currentNode.left == null && currentNode.right == null) {
        return totalPathSum;
      }
  
      return findPaths(currentNode.left, totalPathSum ) + findPaths(currentNode.right, totalPathSum );
    }
    
  
    return findPaths(root, 0);
  }
  const root = new TreeNode(1);

  root.left = new TreeNode(0);
  root.left.left = new TreeNode(0);
  root.left.right = new TreeNode(1);

  root.right = new TreeNode(1);
  root.right.right = new TreeNode(1);
  
  root.right.left = new TreeNode(0);
  


  console.log(pathSum(root));




