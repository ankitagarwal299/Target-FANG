class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var pathSum = function (root, sum) {
    let allPaths = [];
    findPaths(root, sum, [], allPaths);
  
    function findPaths(currentNode, sum, currentPath, allPaths) {
      if (currentNode == null) return;
  
      // add the current node to the path
      currentPath.push(currentNode.value);
      console.log(currentPath);
  
      // if the current node is a leaf and its value is equal to sum, save the current path
      if (currentNode.value == sum && currentNode.left == null && currentNode.right == null) {
        allPaths.push(currentPath);
        //console.log("Current", currentPath, allPaths)
        return; //there is no left and right child so no need to recurse
      }
  
      findPaths(currentNode.left, sum - currentNode.value, Array.from(currentPath), allPaths);//creates a new, shallow-copied Array instance
      findPaths(currentNode.right, sum - currentNode.value, Array.from(currentPath), allPaths);
  
    }
    /* Array.from(): //creates a new, shallow-copied Array instance
       [ 12, 7, 4, 1 ] this will not happen
       We want this [ 12, 1 ]
    
     */
  
  
    
    return allPaths;
  };
  
  const root = new TreeNode(12);
  root.left = new TreeNode(7);
  root.right = new TreeNode(1);
  root.left.left = new TreeNode(4);
  root.right.left = new TreeNode(10);
  root.right.right = new TreeNode(5);
  
  console.log(pathSum(root, 23));
  