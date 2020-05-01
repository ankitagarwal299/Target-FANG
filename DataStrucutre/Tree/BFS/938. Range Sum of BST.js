//https://www.youtube.com/watch?v=SIdrJwWp3H0

var rangeSumBST = function (root, L, R) {
  let sum = 0;
  if (root == null) return result;

  let queue = [];
  queue.push(root);

  while (queue.length > 0) {
    if (L <= root.value && root.value <= R) {
      sum += root.value;
    }
    if (root.left != null && root.left > L) {
      queue.push(root.value);
    }
    if (root.right != null && root.right < R) {
      queue.push(root.value);
    }
  }

  return sum;
};

const root = new TreeNode(12);
root.left = new TreeNode(7);
root.right = new TreeNode(1);
root.left.left = new TreeNode(4);
root.right.left = new TreeNode(10);
root.right.right = new TreeNode(5);

console.log(rangeSumBST(root, 7, 15));
