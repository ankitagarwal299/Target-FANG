class TreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}


function lowestCommonAncestor(root, a, b) {
}


// Driver Code
var root = new TreeNode(1);
root.children.push(new TreeNode(2));
root.children.push(new TreeNode(3));
root.children.push(new TreeNode(4));
root.children[0].children.push(new TreeNode(5));
root.children[0].children[0].children.push(new TreeNode(10));
root.children[0].children.push(new TreeNode(6));
root.children[0].children[1].children.push(new TreeNode(11));
root.children[0].children[1].children.push(new TreeNode(12));
root.children[0].children[1].children.push(new TreeNode(13));
root.children[2].children.push(new TreeNode(7));
root.children[2].children.push(new TreeNode(8));
root.children[2].children.push(new TreeNode(9));

var a = root.children[0].children[1].children[2];// a=13
var b = root.children[0].children[0].children[0];// b=10


var lCA = lowestCommonAncestor(root, a, b);
console.log("\"", lCA, "\"", "is the lowest common ancestor of the nodes", "\"", a.val, "\"", "and", "\"", b.val, "\"");

/*

                 1
        2        3         4
    5      6             7,8,9
10       11,12,13

*/