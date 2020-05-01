//https://www.youtube.com/watch?v=C6r1fDKAW_o

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var kthSmallest = function (root, k) {
  var counter = [0];

  function InOrder(root, k) {
    if (root == null) return;

    InOrder(root.left, k);
    if (++counter[0] == k) {
      counter[1] = root.value;
      return;
    }
    InOrder(root.right, k);
  }

  InOrder(root, k);

  return counter[1];
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

console.log(kthSmallest(root, 3));
