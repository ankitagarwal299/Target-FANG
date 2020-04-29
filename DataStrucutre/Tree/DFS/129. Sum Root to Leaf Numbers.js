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
      totalPathSum = 10 * totalPathSum + currentNode.value;      

      if (currentNode.left == null && currentNode.right == null) {
        return totalPathSum;
      }
  
      return findPaths(currentNode.left, totalPathSum ) + findPaths(currentNode.right, totalPathSum );
    }
    
  
    return findPaths(root, 0);
  }
  const root = new TreeNode(12);
  root.left = new TreeNode(7);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(4);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(5);


  console.log(pathSum(root));








  //Sum of each path and each node eg. 12+7+4, 12+1+10, 12+1+5
  
  var pathSum = function (root) {
    let totalSum = 0;
  
    function findPaths(currentNode, sum) {
      if (currentNode == null) return 0;
    
      console.log(currentNode.value , sum)
      sum += currentNode.value;
      
      if (currentNode.left == null && currentNode.right == null) {
        totalSum += sum;
        console.log("totalSum" , totalSum)
        return;
      }
  
      findPaths(currentNode.left, sum );
      findPaths(currentNode.right, sum );
    }
    findPaths(root, 0, []);
  
    return totalSum;
  }
  
  const root = new TreeNode(12);
  root.left = new TreeNode(7);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(4);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(5);
  
  console.log(pathSum(root));
  