//Shorter version , no need to maintain currentSize array at each level

var levelOrder = function (root) {
    let maxSum = 0;
    if (root == null) return result;
  
    let queue = [];
    queue.push(root);
  
    while (queue.length > 0) {
      let sum = 0;
      let currentLevelSize = queue.length;
      for (let i = 0; i < currentLevelSize; i++) {
        let currentNode = queue.shift();
        sum += currentNode.value;
        if (i == currentLevelSize - 1) maxSum = Math.max(maxSum, sum);
  
        if (currentNode.left != null) queue.push(currentNode.left);
        if (currentNode.right != null) queue.push(currentNode.right);
  
  
      }
    }
    return maxSum;
  };
  
  class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  const root = new TreeNode(3);
  root.left = new TreeNode(9);
  root.right = new TreeNode(20);
  root.right.left = new TreeNode(15);
  root.right.right = new TreeNode(700);
  
  console.log(levelOrder(root));
  
  /* OUTPUT EXPECTED [ [3], [9,20], [15,7] ] */
  