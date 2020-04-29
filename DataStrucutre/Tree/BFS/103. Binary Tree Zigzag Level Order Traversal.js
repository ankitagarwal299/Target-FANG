var levelOrder = function (root) {
    let result = [];
    if (root == null) return result;
  
    let queue = [];
    queue.push(root);
    let leftToRight = true;
  
    while (queue.length > 0) {
      let currentLevelSize = queue.length;
      let currentLevel = [];
  
      for (let i = 0; i < currentLevelSize; i++) {
        let currentNode = queue.shift();
        if (currentNode.left != null) queue.push(currentNode.left);
        if (currentNode.right != null) queue.push(currentNode.right);

        if (leftToRight) currentLevel.push(currentNode.value);
        else currentLevel.unshift(currentNode.value);
  
        //result.push(currentNode.value);
      }
      result.push(currentLevel);
      leftToRight = !leftToRight;
    }
    return result;
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
  root.right.right = new TreeNode(7);
  
  console.log(levelOrder(root));
  
  /* OUTPUT EXPECTED [ [3], [9,20], [15,7] ] */
  