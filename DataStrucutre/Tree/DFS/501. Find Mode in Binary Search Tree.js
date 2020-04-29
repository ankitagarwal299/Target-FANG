var findMode = function (root) {
  let modes = [];
  traverse(root, modes);

  let prev = null;
  let count = 1;
  let max = 0;

  function traverse(node, modes) {
    if (node == null) return null;

    traverse(node.left, modes);

    //find mode or same numbers
    if (prev!=null){
        if (prev.value== node.value){
            count++;
        }else{
            count =1;
        }
    }

    if (count > max) {
      //if we found any other mode based on count then this is the only mode , we will discard other mode
      modes = [];
      modes.push(node.value);

      //update max
      max = count;
    } else if (count == max) {
      // if we found 2 modes
      modes.push(node.value);
    }

    prev = node;

    traverse(node.right, modes);
  }

  return modes;
};

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(15);

console.log(findMode(root));

/* Excellent Explanation
https://www.youtube.com/watch?v=1FJDyBSfEbo
 */
