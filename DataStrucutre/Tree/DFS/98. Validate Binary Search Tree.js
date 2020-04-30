class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var isValidBST = function (root) {
  return validdateBST(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
};

function validdateBST(root, minimum, maximum) {
  if (root == null) return true;
  else if (minimum >= root.value && root.value > maximum) {
    return false;
  } else {
      validdateBST(root.left , minimum, root.value ) && validdateBST(root.right , root.value, maximum )
  }
}

const root = new TreeNode(5);
root.left = new TreeNode(1);
root.right = new TreeNode(4);
root.right.left = new TreeNode(3);
root.right.right = new TreeNode(6);

console.log(isValidBST(root));
