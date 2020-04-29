var levelOrder = function (root) {
    //let result = [];
    if (root == null) return 0;
  
    let queue = [];
    queue.push(root);
    let maximumDepth = 0;
  
    while (queue.length > 0) {
      let currentLevelSize = queue.length;
      //let currentLevel = [];
       maximumDepth = maximumDepth + 1;
  
      for (let i = 0; i < currentLevelSize; i++) {
        let currentNode = queue.shift(); //pop first element in the queue
  
        /* if (currentNode.left == null && currentNode.right == null)
          return minimumDepth; */
  
          /* insert children of current node into queue */
        if (currentNode.left != null) queue.push(currentNode.left);
        if (currentNode.right != null) queue.push(currentNode.right);
        //currentLevel.push(currentNode.value);
  
        //result.push(currentNode.value);
      }
      //result.push(currentLevel);
    }
    return maximumDepth;
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
  
  