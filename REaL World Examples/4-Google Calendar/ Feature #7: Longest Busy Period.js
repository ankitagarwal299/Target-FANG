//128. Longest Consecutive Sequence - Very Easy
var longestConsecutive = function (nums) {
    let set = new Set();
    let max_seqLen = 0;

    for (const item of nums) {
        set.add(item);
    }

    for (const item of nums) {
        let currItemLength = 1;
        let currItem = item;

        if (!set.has(currItem - 1)) {

            while (set.has(currItem + 1)) {
                currItem = currItem + 1;
                currItemLength++;
            }
            max_seqLen = Math.max(max_seqLen, currItemLength);
        }
    }
    return max_seqLen;
};
//https://www.youtube.com/watch?v=YWXbu5uyGXs
//https://www.youtube.com/watch?v=sHrb6phW3IA&t=495s



//https://www.youtube.com/watch?v=oSYGjIq6ZM4&t=74s




//	298	Binary Tree Longest Consecutive Sequence -- Very Easy/Good 
var longestConsecutiveSequnce = function (root) {
    let max_seqLen = 0;

    traverse(root, 0, 0, max_seqLen);//pass root , initial count
    return max_seqLen;
};

function traverse(node, count, target, max_seqLen) {
    if (node == null) {
        return;
    }
    else if (node.value == target) {
        count += 1;
    } else {
        count = 1;// reset count
    }
    max_seqLen = Math.max(max_seqLen, count)

    traverse(node.left, count, target, max_seqLen);
    traverse(node.right, count, target, max_seqLen);
}

const root = new TreeNode(1);
root.right = new TreeNode(3);
root.right.left = new TreeNode(2);
root.right.right = new TreeNode(4);
root.right.right.right = new TreeNode(5);



console.log(longestConsecutiveSequnce(root));

class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

