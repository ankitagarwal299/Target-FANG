//Educative

class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
  
  var binaryTreePaths = function (root,sequence) {
    if (root == null) return false;
    
    function findSequence(currentNode, sequence, sequenceIndex) {
      if (currentNode == null) return;

      if (sequenceIndex>= sequence.length  || currentNode.value != sequence[sequenceIndex]) return false;

      // if the current node is a leaf, add it is the end of the sequence, we have found a path!
      if (currentNode.left==null  && currentNode.right==null && sequenceIndex== sequence.length-1  ) return true;
      
      return findSequence(currentNode.left, sequence, sequenceIndex+1) || findSequence(currentNode.right, sequence, sequenceIndex+1);
    }
  
    return findSequence(root, sequence, 0);
  };
  
  const root = new TreeNode(1);
  root.left = new TreeNode(0);
  root.left.left  = new TreeNode(1);

  root.right.left = new TreeNode(6);
  root.right.right = new TreeNode(5);
  
  
  
  
  
  console.log(binaryTreePaths(root,[1, 0, 7]));
  console.log(binaryTreePaths(root,[1, 1, 6]));

  