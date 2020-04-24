class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

var binaryTreePaths = function (root) {
  if (root == null) return null;

  let allPaths = [];

  function paths(currentNode, currentPath) {
    if (currentNode == null) return;

    currentPath.push(currentNode.value);

    if (currentNode.left == null && currentNode.right == null) {
      allPaths.push(currentPath);
      return;
    }

    paths(currentNode.left, Array.from(currentPath));
    paths(currentNode.right, Array.from(currentPath));
  }

  paths(root, []);

  return allPaths;
};

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

console.log(binaryTreePaths(root));

/* 
Given a binary tree, return all root-to-leaf paths.

Note: A leaf is a node with no children.
Output: ["1->2->5", "1->3"]

Explanation: All root-to-leaf paths are: 1->2->5, 1->3
 */
