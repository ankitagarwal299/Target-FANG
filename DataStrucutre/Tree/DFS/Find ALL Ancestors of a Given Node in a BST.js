//Educative
class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var findAncestors = function (root, p) {
    let result = [];
  
    function findAncestorsRecursively(root, p, result) {
      if (root == null) {
        return false;
      } else if (root.value == p) {
        return true;
      } else if (findAncestorsRecursively(root.left, p, result) || findAncestorsRecursively(root.right, p, result)) {
        result.push(root.value);
        return true;
      }
  
      return false;
    }
  
    findAncestorsRecursively(root, p, result);
  
    return result;
  };
  
  
  const root = new TreeNode(6);
  root.left = new TreeNode(2);
  root.right = new TreeNode(8);
  
  root.left.left = new TreeNode(0);
  root.left.right = new TreeNode(4);
  
  root.left.right.left = new TreeNode(3);
  root.left.right.right = new TreeNode(5);
  
  root.right.left = new TreeNode(7);
  root.right.right = new TreeNode(9);
  
  console.log(findAncestors(root, 5));
  
  /*
  Example 1:
  
  Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
  Output: 6
  Explanation: The LCA of nodes 2 and 8 is 6.
  Example 2:
  
  Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
  Output: 2
  Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.
   */
  