class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var sortedArrayToBST = function (nums) {
  if (nums == null || nums.length == 0) return null;

  function constructBST(nums, left, right) {
    if (left > right) return null;

    let mid = left + Math.floor(right - left) / 2;
    let root = new TreeNode(nums[mid]);

    root.left = constructBST(nums, left, mid - 1);
    root.right = constructBST(nums, mid + 1, right);

    return root;
  }

  return constructBST(nums, 0, nums.length - 1);
};

console.log(sortedArrayToBST([-10, -3, 0, 5, 9]));
