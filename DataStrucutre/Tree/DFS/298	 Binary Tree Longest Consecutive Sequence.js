//https://www.youtube.com/watch?v=oSYGjIq6ZM4&t=74s


class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

var longestConsecutiveSequnce = function (root) {
  var result = [0];//very tricky....  //Note: array store in heap momory and is accessible. Recursive is not returning anything


  function findLongest(root, currentLength, expected, result) {
    if (root == null) return;

    if (root.value == expected) {
      currentLength = currentLength + 1;
    } else {
      currentLength = 1;
    }

    result[0] = Math.max(result[0], currentLength);

    findLongest(root.left, currentLength, root.value + 1, result);
    findLongest(root.right, currentLength, root.value + 1, result);
  }

  findLongest(root, 0, root.value, result);
  return result[0];
};

const root = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(2);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(5);

console.log(longestConsecutiveSequnce(root));
