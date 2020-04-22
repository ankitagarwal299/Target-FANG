//https://www.youtube.com/watch?v=PoBGyrIWisE
//https://www.youtube.com/watch?v=GeltTz3Z1rw&t=449s
function TreeNode(val) {
  this.val = val;
  this.left = null;
  this.right = null;
}

function helper(preStart,inStart,inEnd, preorder,inorder){
    //boundary cases
    if (preStart >preorder.length-1 || inStart > inEnd) return null;

    let root = new TreeNode(preorder[preStart]);

    let inIndex =0;
    for (let i = inStart; i < inEnd; i++){
        if (root.val == inorder[i]){
            inIndex = i;
        }
    }

    root.left = helper(preStart+1, inStart , inIndex -1, preorder,inorder);
    root.right = helper(preStart+ inIndex -inStart +1,  inIndex + 1 , inEnd, preorder,inorder);


    return root;

}

var buildTree = function (preorder, inorder) {
 return helper(0,0,inorder.length-1, preorder,inorder);
};


console.log(buildTree([3,9,20,15,7],[9,3,15,20,7]));

/* 
Given preorder and inorder traversal of a tree, construct the binary tree.

Note:
You may assume that duplicates do not exist in the tree.

For example, given

preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
 */
