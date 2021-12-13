//https://www.youtube.com/watch?v=13m9ZCB8gjw

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var lowestCommonAncestorBinaryTree = function (root, p, q) {
    if (root == null) return null;

    if (root.value == p || root.value == q) return root;

    let left = lowestCommonAncestorBinaryTree(root.left, p, q);
    let right = lowestCommonAncestorBinaryTree(root.right, p, q);

    if (left!=null && right!=null) return root.value;

    if (left==null && right==null) return null;
  
     return left!=null? left:right;
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
  
  console.log(lowestCommonAncestorBinaryTree(root,2,4));

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
