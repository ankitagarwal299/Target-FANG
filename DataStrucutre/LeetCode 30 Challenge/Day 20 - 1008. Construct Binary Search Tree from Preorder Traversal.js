//https://www.youtube.com/watch?v=9sw8RRsBw6s&t=603s


function TreeNode(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  
  function constructBST(preorder, pos, currNode, left, right) {
    //boundary case
    if (pos == preorder.length || preorder[pos] < left || preorder[pos] > right) return pos; //current elem not falling in the range of left-right
  
    //Insert in left-subtree
    if (preorder[pos] < currNode.val) {
      currNode.left = new TreeNode(preorder[pos]);
      pos = constructBST(preorder, pos + 1, currNode.left, left, currNode.val - 1);
    }
  
    //boundary case
    if (pos == preorder.length || preorder[pos] < left || preorder[pos] > right) return pos; //current elem not falling in the range of left-right
  
    //Insert in right-subtree
    //No need of condition
    //If elem falls in range and if it is not in leftsubtree then it falls in right subtree
    currNode.right = new TreeNode(preorder[pos]);
    pos = constructBST(preorder, pos + 1, currNode.right, currNode.val - 1, right);
    return pos;
  }
  
  function bstFromPreorder(preorder) {
    if (preorder == null || preorder.length == 0) return null;
  
    let root = new TreeNode(preorder[0]);
    if (preorder.length == 1) return root;
  
    constructBST(preorder, 1, root, -Infinity, Infinity);
  
    return JSON.stringify(root);
  }
  
  console.log(bstFromPreorder([8, 5, 1, 7, 10, 12]));
  
  /*
  Input: [8,5,1,7,10,12]
  Output: [8,5,10,1,7,null,12]
   */
  