/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
    const result = [];

    if (!root) return "null";

    function traverse(node) {
        //result.push(node? node.val: null);
        if (node == null) {
            result.push(null);
            return;//imp to return
        } else {
            result.push(node.val);
        }

        traverse(node.left);//cannot read null
        traverse(node.right);
    }
    traverse(root);

    return JSON.stringify(result);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    //if(data == null) return null;

    const arr = JSON.parse(data);
    if (arr == null || arr.length == 0 || arr[0] == null) {
        return null;
    }

    function buildTree() {
        const item = arr.shift();
        if (item == null) {
            return null;
        }
        const node = new TreeNode(item);

        node.left = buildTree();
        node.right = buildTree();
        return node;//finaly to build tree at the end
    }
    const completeTree = buildTree();


    return completeTree;
};

/* Above is recursive solution and tried in leetcode directly */
/* Below is attempting  */