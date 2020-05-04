//https://www.youtube.com/watch?v=aaSFzFfOQ0o&t=25s

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  
  
  var delNodes = function (root, to_delete) {
    let forest = [];
    let toDelHash = new Map();
  
    for (let node of to_delete) {
      toDelHash.set(node, node);
    }
  
    function remove(root, toDelHash, forest) {
      if (root == null) return null;
  
      root.left = remove(root.left, toDelHash, forest);
      root.right = remove(root.right, toDelHash, forest);
  
      if (toDelHash.has(root.value)) {
        if (root.left != null) forest.push([root.left.value]);
        if (root.right != null) forest.push([root.right.value]);
  
        return null;
      }
  
      return root;
    }
  
    remove(root, toDelHash, forest);
  
    //Ask if the topmost root value is in the todelete, if not add to forest
    if (!toDelHash.has(root.value)) forest.push([root]);
  
    return JSON.stringify(forest);
  };
  
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  
  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(7);
  
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  
  console.log(delNodes(root, [3, 5]));
  
  /*
  Input: root = [1,2,3,4,5,6,7], to_delete = [3,5]
  Output: [[1,2,null,4],[6],[7]]
   */
  