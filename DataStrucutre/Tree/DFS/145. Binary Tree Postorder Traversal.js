class TreeNode {
    constructor(value) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }
var postorderTraversal = function(root) {
    if(root == null) return [];
    let curr = root;
    let stack = [];
    let result = [];
    while(curr || stack.length) {
        if(curr) {
            stack.push(curr);
            curr = curr.left;//reach leftmost node
        } else {
            curr = stack[stack.length - 1];  //peek for top
            if(curr.right) {
                curr = curr.right;
            }
            else { //right of top does not exist, so need to pop
                curr = stack.pop();
                result.push(curr.val);
                while(stack.length && curr == stack[stack.length -1].right) {  //while last popped el is top's right child, visit it
                    curr = stack.pop();
                    result.push(curr.val);
                }
                if(stack.length) { //end case, this cond will break is stack is empty
                    curr = stack[stack.length - 1].right; 
                } else {
                    curr = null;
                }
            }                

        }
    }
    return result;
};



const root = new TreeNode(1);
root.right = new TreeNode(2);
root.right.left = new TreeNode(3);


/*  Remember Steps- Tricky
//https://www.youtube.com/watch?v=xLQKdq0Ffjg&t=712s
 */
console.log(postorderTraversal(root));