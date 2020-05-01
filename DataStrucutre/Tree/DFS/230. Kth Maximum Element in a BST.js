//Educative

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var kthMaximum = function (root, k) {
  var counter = [0];

  function reverseInOrder(root, k) {
    if (root == null) return;

    reverseInOrder(root.right, k);
    if (++counter[0] == k) {
        counter[1] = root.value;
        return;
    }
    reverseInOrder(root.left, k);
  }

   reverseInOrder(root, k);

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

console.log(kthMaximum(root, 3));
