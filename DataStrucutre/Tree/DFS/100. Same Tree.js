class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var isSameTree = function (p, q) {
  if (p == null && q == null) {
    return true;
  } else if (p == null || q == null) {
    return false;
  } else if (p.value != q.value) {
    return false;
  } else   {
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
  }
  return false;
};

const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);

const tree2 = new TreeNode(1);
tree2.right = new TreeNode(2);

console.log(isSameTree(tree1, tree2));

//output same
const tree1 = new TreeNode(1);
tree1.left = new TreeNode(2);
tree1.right = new TreeNode(3);

const tree2 = new TreeNode(1);
tree2.left = new TreeNode(2);
tree2.right = new TreeNode(3);
