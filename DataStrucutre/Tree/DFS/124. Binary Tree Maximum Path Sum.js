//https://www.youtube.com/watch?v=TO5zsKtc1Ic&list=PLEJXowNB4kPwCPVjDv6KsAsThtDOCQUok&index=30
//HARD- LEARN

//https://www.youtube.com/watch?v=p8P4Iv1rrtg

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var maxPathBinary = function (root) {
    var result = Number.MIN_SAFE_INTEGER;
  
    function pathSum(root) {
      if (root == null) return 0;
  
      let left = pathSum(root.left);
      let right = pathSum(root.right);
  
      let max_straight = Math.max(Math.max(left, right) + root.value, root.value); //CASE 1
      let max_caseValue = Math.max(max_straight, left + right + root.value); //CASE 2 and 1 compared
      result = Math.max(max_caseValue, result);
  
      return max_straight;
    }
  
    pathSum(root);
  
    return result;
  };
  
  const root = new TreeNode(-1);
  root.left = new TreeNode(1);
  root.right = new TreeNode(2);
  
  root.left.left = new TreeNode(4);
  root.left.right = new TreeNode(5);
  
  root.left.left.left = new TreeNode(8);
  root.left.left.right = new TreeNode(4);
  
  root.left.right.right = new TreeNode(-10);
  
  
  
  console.log(maxPathBinary(root));
  