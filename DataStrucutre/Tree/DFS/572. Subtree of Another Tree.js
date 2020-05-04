//https://www.youtube.com/watch?v=HdMs2Fl_I-Q

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  function isSameTree(s, t) {
    if (s == null || t == null) {
      return s == null && t == null;
    } else if (s.value == t.value) {
      return isSameTree(s.left, t.left) && isSameTree(s.right, t.right);
    }
  }
  
  var isSubtree = function (s, t) {
    //if (s==null) {return false}
     if (isSameTree(s, t)) {
      return true;
    } else {
      return isSubtree(s.left, t) || isSubtree(s.right, t);
    }
  }
  
  const tree1 = new TreeNode(3);
  tree1.left = new TreeNode(4);
  tree1.right = new TreeNode(5);
  
  tree1.left.left = new TreeNode(1);
  tree1.left.right = new TreeNode(2);
  
  const tree2 = new TreeNode(4);
  tree2.left = new TreeNode(1);
  tree2.right = new TreeNode(2);
  
  console.log(isSubtree(tree1, tree2));
  