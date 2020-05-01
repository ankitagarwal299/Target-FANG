//https://www.youtube.com/watch?v=kulWKd3BUcI

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var lowestCommonAncestor = function (root, p, q) {
    if (root == null) return;
  
      if (root.value > p && root.value > q) {
      return lowestCommonAncestor(root.left, p, q);
    } else if (root.value < p && root.value < q) {
      return lowestCommonAncestor(root.right, p, q);
    }else{
        return root.value;
    }
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
  
  console.log(lowestCommonAncestor(root,2,4));

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
