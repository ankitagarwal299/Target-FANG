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

    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();

        if (node == null) {
            result.push(null);
        } else {
            result.push(node.val);
            queue.push(node.left);
            queue.push(node.right);
        }
    }

    /* trim last nulls */
    let i = result.length - 1;
    while (result[i] == null) {
        i--;
    }
    result.splice(i + 1);

    return JSON.stringify(result);
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
    if (!data) return null;

    const arr = JSON.parse(data);
    if (arr || arr.length == 0 || arr[0] == null) return null;

    const completeTree = new TreeNode(arr[0]);

    const queue = [root];
    while (queue.length > 0) {
        const node = queue.shift();
        const leftVal = arr.shift();
        const rightVal = arr.shift();

        if (leftVal != null && leftVal != undefined) {
            node.left = new TreeNode(leftVal);
            queue.push(node.left);
        }

        if (rightVal != null && rightVal != undefined) {
            node.right = new TreeNode(rightVal);
            queue.push(node.right);
        }
    }


    return completeTree;
};

/* Above is recursive solution and tried in leetcode directly */
/* Below is attempting  */