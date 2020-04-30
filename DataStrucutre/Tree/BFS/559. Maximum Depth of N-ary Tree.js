//https://www.youtube.com/watch?v=TtAflDtqwVg

var levelOrder = function (root) {
  if (root == null) return result;

  let depth = 0;
  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    let currentLevelSize = queue.length;
    depth = depth + 1;

    for (let i = 0; i < currentLevelSize; i++) {
      let currentNode = queue.shift();
      /*  if (currentNode.left != null) queue.push(currentNode.left);
        if (currentNode.right != null) queue.push(currentNode.right);
        currentLevel.push(currentNode.value); */
      for (let child of currentNode.children) {
        queue.push(child);
      }
    }
  }
  return depth;
};

class TreeNode {
  constructor(children) {
    this.value = value;
    this.children = children || [];
  }
}

const root = new TreeNode(3);
root.children = [new TreeNode(3), new TreeNode(2), new TreeNode(4)];
root.children[0].children = [new TreeNode(5), new TreeNode(6)];

console.log(levelOrder(root));




//MOST EFFICIENT SOLUTION , w/out Queue O(1)
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  var children = root.children || [];
  var max = 0;

  for (var i = 0; i < children.length; ++i) {
    max = Math.max(max, maxDepth(children[i]));
  }

  return 1 + max;
};

console.log(maxDepth(root));
