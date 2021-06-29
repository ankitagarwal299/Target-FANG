class TreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

/* Convert arr to binary tree */
function convertArrtoBinaryTree(arr) {
    if (!arr?.length) return 0;

    let root = new TreeNode(arr[0]);
    let queue = [root];

    for (let i = 1; i < arr.length; i += 2) {
        let currNode = queue.shift();
        if (arr[i]) {
            currNode.left = new TreeNode(arr[i]);
            queue.push(currNode.left);
        }
        if (arr[i + 1]) {
            currNode.right = new TreeNode(arr[i + 1])
            queue.push(currNode.right);
        }
    }
    return root;
}


/* Convert arr to binary tree */
function convertArrtoBinaryTree(arr) {
    if (!arr?.length) return 0;

    let root = new TreeNode(arr[0]);
    let queue = [root];
    arr.shift();

    while (queue.length > 0) {
        let currNode = queue.shift();
        let left = arr.shift();
        let right = arr.shift();

        if (left) {
            currNode.left = new TreeNode(left);
            queue.push(currNode.left);
        }
        if (right) {
            currNode.right = new TreeNode(right);
            queue.push(currNode.right);
        }
    }
    return root;
}
console.log(convertArrtoBinaryTree([3, 9, 20, null, null, 15, 7]));//3
//output {"value":3,"left":{"value":9,"left":null,"right":null},"right":{"value":20,"left":{"value":15,"left":null,"right":null},"right":{"value":7,"left":null,"right":null}}}



var levelOrder = function (root) {
    if (!root) return [];
    let result = [];

    let queue = [root]; //insert initial node into queue
    while (queue.length > 0) {
        let currLevelSize = queue.length;
        let currlvlNodes = [];
        for (let i = 0; i < currLevelSize; i++) {
            let currNode = queue.shift();
            currlvlNodes.push(currNode.val);

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }

        result.push(currlvlNodes);
    }
    return result;
};
//I/P - [3,9,20,null,null,15,7]
//O/P - [[3],[9,20],[15,7]]

/* Recursive Traversal Order */
var levelOrder = function (root) {
    if (!root) return [];
    let result = [];

    function traversal(node, depth) {
        if (!node) return;
        /* result.push([]);

        if (node.left) {
            traversal(node.left, depth + 1);
            result[depth].push(node.left)
        }
        if (node.right) {
            traversal(node.right, depth + 1);
            result[depth].push(node.right);
        } */

        if (!result[depth]) result[depth] = [node.value];//create subarray
        else result[depth].push(node.value);//push  to existing subarray

        traversal(node.left, depth + 1);
        traversal(node.right, depth + 1);
    }

    traversal(root, 0);

    return result;
};
//I/P - [3,9,20,null,null,15,7]
//O/P - [[3],[9,20],[15,7]]


/* 429. N-ary Tree Level Order Traversal */
var levelOrder = function (root) {
    if (!root) return []
    let queue = [root];
    let result = [];

    while (queue.length > 0) {
        let currlvlSize = queue.length;
        let currArr = [];

        for (let i = 0; i < currlvlSize; i++) {
            let currNode = queue.shift();
            currArr.push(currNode.val);
            for (let child of currNode.children) {
                queue.push(child);
            }
        }
        result.push(currArr);
    }
    return result;
};


var zigzagLevelOrder = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];
    let leftToRight = true;

    while (queue.length > 0) {
        let currLvlArr = [];
        let currlvlSize = queue.length;

        for (let i = 0; i < currlvlSize; i++) {
            let currNode = queue.shift();
            if (leftToRight) {
                currLvlArr.push(currNode.val);
            } else {
                currLvlArr.unshift(currNode.val);
            }

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
        result.push(currLvlArr);
        leftToRight = !leftToRight;
    }
    return result;
};
//I/P: [3,9,20,null,null,15,7]
//O/P: [[3],[20,9],[15,7]]


/* iterative Max height  */
function maxDepthTree(root) {
    if (!root) return root;

    let queue = [root];
    let depth = 0;

    while (queue.length > 0) {
        depth += 1;
        /* Important: In levelOrder traversal, we want length of curr level , wrap below 3 lines in loop*/
        let currLevelLen = queue.length
        for (let i = 0; i < currLevelLen; i++) {
            let currNode = queue.shift();
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }
    return depth;
}

/* recusrive Max height  */
function maxDepthTree(root) {
    if (!root) return 0;
    let left = maxDepthTree(root.left);
    let right = maxDepthTree(root.right);

    return Math.max(left, right) + 1;
}

/* short one*/
/* recusrive Max height of tree */
function maxDepth(root) {
    if (!root) return 0;
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
}


//BFS
var minDepth = function (root) {
    if (!root) return 0;
    let depth = 0;

    let queue = [root];
    while (queue.length > 0) {
        depth += 1;
        let currLvlNodesLen = queue.length;

        for (let i = 0; i < currLvlNodesLen; i++) {
            let currNode = queue.shift();
            if (currNode.left == null && currNode.right == null) return depth;
            // 1. Here we dont need to check all branches, we are intersted where both child are null,  if not the above case then go down
            /* 2. Below cannot be done because traversal should reach leaf node where both children null then count depth
              if (currNode.left && currNode.right) {
                  queue.push(currNode.left);
                  queue.push(currNode.right);
              }
              */
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }

    return depth;
}

//DFS
/* Below is WRONG implementation in case of skew tree case */
function minDepth(root) {
    if (!root) return 0;

    let left = minDepth(root.left);
    let right = minDepth(root.right);
    return 1 + Math.min(left, right);
}

/* In case of skew tree right side --> Learn(not similar to MaxHeight/MaxDepth Code)*/
function minDepth(root) {
    if (!root) return 0;
    if (root.left == null && root.right == null) return 1;
    if (root.left == null) return 1 + minDepth(root.right);
    if (root.right == null) return 1 + minDepth(root.left);

    /* if all above condition doesnot met */
    return 1 + Math.min(minDepth(root.left, root.right));
}

//DFS
/* https://www.youtube.com/watch?v=JrrPcXix8zo*/
function minDepth(root) {
    if (!root) return 0;

    let minLeft = minDepth(root.left);
    let minRight = minDepth(root.right);

    if (minLeft == 0 || minRight == 0) {//skewed tree
        return 1 + Math.max(minLeft, minRight);
    }
    return 1 + Math.min(minLeft, minRight);
}



//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

/* Max Depth N-ary tree */
function Node(val, children) {
    this.val = val;
    this.children = children;
}

//Given a n - ary tree, find its maximum depth.
var maxDepthNArray = function (root) {
    if (!root) return 0;

    let queue = [root];
    let depth = 0;
    while (queue.length > 0) {
        depth += 1;
        let currLevelLen = queue.length;
        for (let i = 0; i < currLevelLen; i++) {
            let currnode = queue.shift();
            for (let child of currnode.children) {
                queue.push(child);
            }
        }
    }
    return depth;
};

//Given a n - ary tree, find its maximum depth.
var maxDepthNArray = function (root) {
    if (!root) return 0;
    let max = 0;
    for (let child of root.children) {
        max = Math.max(max, maxDepthNArray(child));
    }

    return max + 1;
};

//Given a n - ary tree, find its maximum depth.
var maxDepthNArray = function (root) {
    if (!root) return 0;

    let max = 0;
    function helper(node, depth) {
        max = Math.max(max, depth);

        for (let child of node.children) {
            helper(child, depth + 1);
        }
    }

    helper(root, 1);

    return max;
};


//Space expensive
var rightSideView = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;
        let stack = [];
        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
            stack.push(currNode.val);
        }
        result.push(stack.pop())
    }
    return result;
};

//Improvement on above right side view 
var rightSideView = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);

            //add to the result when last node of the level is travered
            if (i == currLvlSize - 1) result.push(currNode.val);
        }

    }
    return result;
};

//Improvement on above right side view 
var leftSideView = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);

            //add to the result when last node of the level is travered
            if (i == 0) result.push(currNode.val);
        }
    }
    return result;
};

var verticalTraversal = function (root) {
    const map = new Map();
    let queue = [[root, 0]];
    let result = []

    while (queue.length > 0) {
        let currLevelSize = queue.length;
        for (let i = 0; i < currLevelSize; i++) {

            let [node, x] = queue.shift();
            if (map.get(x)) {
                map.get(x).push(node.val);
            } else {
                map.set(x, [node.val]);
            }

            if (node.left) queue.push([node.left, x - 1]);
            if (node.right) queue.push([node.right, x + 1]);
        }
    }

    // sort with keys , left to right in vertical order
    let sortedMap = [...map.entries()].sort((a, b) => a[0] - b[0]);

    //push only values
    for (let [key, value] of sortedMap) {
        result.push(value);
        //result.push(value.sort((a,b)=>a-b));
    }

    return result;
};

//101. Symmetric Tree/Mirror from center
var isSymmetric = function (root) {
    if (!root) return true;

    function traverse(node1, node2) {
        if (node1 == null && node2 == null) return true;
        if (node1 != null && node2 == null) return false;
        if (node1 == null && node2 != null) return false;

        if (node1.value != node2.value) return false;

        return traverse(node1.left, node2.right) && traverse(node1.right, node2.left);
    }

    return traverse(root.left, root.right);
};

//BFS approach
var isSymmetric = function (root) {
    if (!root) return true;
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;
        let i = 0;
        let j = currLvlSize - 1;

        while (i < j) {
            if (!isEqual(queue[i], queue[j])) {
                return false;
            }
            i += 1;
            j -= 1;
        }

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (currNode) queue.push(currNode.left);
            if (currNode) queue.push(currNode.right);
        }
    }
    return true;
};

function isEqual(node1, node2) {
    if (node1 == null && node2 == null) return true;
    if (node1 == null && node2 != null) return false;
    if (node1 != null && node2 == null) return false;
    if (node1.val != node2.val) return false;

    return true;
}


//DFS
var isSameTree = function (p, q) {
    /*case1 - Both are null*/
    if (p == null && q == null) return true;

    /*case2 - Either are null*/
    if (p == null || q == null) return false;

    /*case3 - Val not equal*/
    if (p.val != q.val) return false;

    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

//BFS
var isSameTree = function (p, q) {
    /*case1 - Both are null*/
    if (!p && !q) return true;

    let queue = [[p, q]];
    while (queue.length > 0) {
        let [node1, node2] = queue.shift();

        /*case1 - Both are null, continue bcoz no children*/
        if (node1 == null && node2 == null) continue;

        /*case2 - Either are null*/
        if (node1 == null || node2 == null) return false;

        /*case3 - Val not equal*/
        if (node1.val != node2.val) return false;

        queue.push([node1.left, node2.left]);
        queue.push([node1.right, node2.right]);
    }

    return true;
};

//leetcode 1379
var getTargetCopy = function (original, cloned, target) {
    if (!original || !cloned || !target) return null;

    let queue = [[original, cloned]];

    while (queue.length > 0) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let [node1, node2] = queue.shift();

            if (node1 == target) return node2;
            /* The follow up asks for the problem to be solved if repeated values on the tree are allowed, this means that checking if the cloned.val === the target.val 
            is no longer sufficient. What I am doing here is navigating the original tree with a breadth first search in order to find the target node, and maintaining
            those same steps on the cloned tree. That way when we find the exact target node, we can return the current node of the cloned tree with confidence. */
            //https://leetcode.com/problems/find-a-corresponding-node-of-a-binary-tree-in-a-clone-of-that-tree/discuss/689078/Javascript-iterative-bfs-solution-with-followup
            if (node1.left && node2.left) queue.push([node1.left, node2.left]);

            if (node1.right && node2.right) queue.push([node1.right, node2.right]);
        }

    }

    return null
};

//BFE.dev 19 - HTML Element Collection, not binary treee(if duplicate values) --VIMP
const findCorrespondingNode = (rootA, rootB, target) => {
    const path = [];

    let curr = target
    while (curr.parentElement && curr !== rootA) {
        path.push(Array.from(curr.parentElement.children).indexOf(curr));
        curr = curr.parentElement;
    }

    curr = rootB;
    while (path.length) {
        const i = path.pop();
        curr = curr.children[i];
    }

    return curr;
}

const findCorrespondingNode = (rootA, rootB, target) => {
    if (!rootA || !rootB || !target) {
        return null;
    }
    const queue = [[rootA, rootB]];

    while (queue.length) {
        let currlvlSize = queue.length;


        for (let i = 0; i < currlvlSize; i++) {
            let [node1, node2] = queue.shift();
            if (target === node1) {
                return node2;
            }

            if (node1.children && node2.children) {
                for (let i = 0; i < node1.children.length; i++) {
                    queue.push([node1.children[i], node2.children[i]]);
                }
            }
        }

        return false;
    }

    return null;
}

//leetcode 572
var isSubtree = function (s, t) {
    /* Case1: Both are null, then they are subtree */
    if (!s && !t) return true;

    /* Case2: If main tree s==null */
    if (!s) {
        return false;
    } else if (isSameTree(s, t)) {
        return true;
    } else {
        return isSubtree(s.left, t) || isSubtree(s.right, t);//remember || condition, this level not same then go to next level.
    }
};

function isSameTree(s, t) {
    /* Case1: Both are null, then they are subtree */
    if (!s && !t) return true;

    /* Case2: Either are null, then they are not subtree */
    if (!s || !t) return false;

    /* Case3: If value doesnot match*/
    if (s.val != t.val) return false;

    return isSameTree(s.left, t.left) && isSameTree(s.right, t.right);//remember && condition, every node should be same.
}

/*
Time: O( n )

We will be touching the whole tree in the search, there are n nodes in the tree and we do O(1) work at each node. There are not exactly n calls though but I need to 
double check this...I need to solve the recurrence but oh well...we know it will stay linear in the asymptotic regard.

Space: O( h )

Stack usage at maximum will be the trees height. Worst case would be O(n) if our tree is skewed purely to the left or right and we need to find deep nodes. 
But n IS h in that case. But we say O( n ) in that case since it is more accurate to what is happening, the tree's size in nodes dominating the height. */
var lowestCommonAncestor = function (root, p, q) {
    if (root == null || root == p || root == q) return root;

    let left = lowestCommonAncestor(root.left, p, q);
    let right = lowestCommonAncestor(root.right, p, q);

    /*Case1: Both are not null , we found nodes */
    if (left != null && right != null) return root;//return current/parent node

    /*Case2: Both are  null  */
    if (left == null && right == null) return null;//return null to its parent node

    /*Case3: Either is null  */
    return left != null ? left : right; //return node whoch is not null to its parent
};

//https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/discuss/309491/Different-heavily-commented-JavaScript-Solution
var lowestCommonAncestor = function (root, p, q) {
    let pNode;
    let qNode;

    root.level = 0;
    let queue = [root];

    while (stack.length && !(pNode && qNode)) {
        let currNode = queue.shift();

        // check if we found the p node
        if (currNode.val == p) {
            pNode = currNode;
        }
        if (currNode.val == q) {
            qNode = currNode;
        }

        // consider the children. Set the level and set the node as parent
        if (currNode.left) {
            currNode.left.level = currNode.level + 1;
            currNode.left.parent = currNode;
            queue.push(currNode.left);
        }
        if (currNode.right) {
            currNode.right.level = currNode.level + 1;
            currNode.right.parent = currNode;
            queue.push(currNode.right);
        }
    }
    // Now, for both p and q nodes we know the parent chain,
    // we move up the chain until it's the same node. That is the LCA
    // To make sure we move up in the right order, we use the level property added during the dfs
    while (pNode.val != qNode.val) {
        if (pNode.level > qNode.level) {
            pNode = pNode.parent;
        } else if (pNode.level < qNode.level) {
            qNode = qNode.parent;
        } else {
            pNode = pNode.parent;
            qNode = qNode.parent;
        }
    }
    return pNode;
};

//BST not binary tree- Kevin
//https://www.youtube.com/watch?v=kulWKd3BUcI
var lowestCommonAncestor = function (root, p, q) {
    if (root.val > p.val && root.val > q.val) {
        return lowestCommonAncestor(root.left, p, q);
    } else if (root.val < p.val && root.val < q.val) {
        return lowestCommonAncestor(root.right, p, q);
    } else {
        return root;
    }
};

// Time Complexity: O(N), we always visit all nodes
// Space Complexity: O(H) or O(N), height can be at most N (in case of a skewed tree)
var binaryTreePaths = function (root) {
    if (!root) return root;
    let result = [];

    function traverse(currNode, currArr) {
        if (!currNode) return currNode;

        currArr.push(currNode.val);

        /*if we reach leaf node*/
        if (currNode.left == null && currNode.right == null) {
            result.push(currArr.join('->'));
            return;
        }

        /*  traverse(currNode.left, currArr); 
         traverse(currNode.right, currArr); */
        /* 
        Issue: 
        1. val keeps adding into currArr and same is passed to the bottom level
        2. Val added into currArr at the bottom level is reflected at the top level Node.
        3. When return/backtrack currArr shows the values added at the bottom.
        4. We only want values added till that level into currArr
        Solution1: Above will not work - Array.from solves the issue, it passess new and shallow copy of array 
        */
        traverse(currNode.left, Array.from(currArr));
        traverse(currNode.right, Array.from(currArr));

    }

    traverse(root, []);

    return result;
    //or return result.map((item)=> item.join('->'));
};

//Tried 4 times and pointed out where i am going wrong
var pathSum = function (root, sum) {

    if (!root) return root; //return empty array for null i/p ..incorrect here
    let result = [];

    function traverse(currNode, currSum, currArr) {
        if (currNode === null || currNode.val + currSum > sum) {//[-2,null,-3] , -5 ---logic incorect for negative values
            return;
        }
        currArr.push(currNode.val);

        if (currNode.val + currSum == sum) {
            result.push(currArr);//[1,2],1 = incorrect for this input, question is asking all root to leaf nodes, it is adding node in between also to final o/p
            return;
        }

        traverse(currNode.left, currNode.val + currSum, Array.from(currArr))
        traverse(currNode.right, currNode.val + currSum, Array.from(currArr))

    }

    traverse(root, 0, []);

    return result;
};

//113. Path Sum II
//Correct Solution for above
var pathSum = function (root, sum) {


    if (!root) return [];
    let result = [];

    function traverse(currNode, currSum, currArr) {
        if (currNode === null) {
            return;
        }
        currArr.push(currNode.val);

        if (currNode.left == null && currNode.right == null) {
            if (currNode.val + currSum == sum) {
                result.push(currArr);
                return;
            }
        }

        traverse(currNode.left, currNode.val + currSum, Array.from(currArr))
        traverse(currNode.right, currNode.val + currSum, Array.from(currArr))

    }

    traverse(root, 0, []);

    return result;
};

//112. Path Sum
var hasPathSum = function (root, sum) {
    if (!root) return false;

    function traverse(currNode, currSum) {
        if (!currNode) return false;

        currSum += currNode.val;//this is necessary to add , should not 

        if (currNode.left == null && currNode.right == null) {
            return currSum === sum;
        }

        //return traverse(currNode.left, currSum +currNode.val) || traverse(currNode.right, currSum + currNode.val);//--this is wrong , add before and return
        return traverse(currNode.left, currSum) || traverse(currNode.right, currSum);

    }

    return traverse(root, 0);
};
//OR
var sumNumbers = function (root) {
    if (!root) return null;
    let sum = 0;

    function traverse(currNode, currSum) {
        if (!currNode) return null;

        currSum += currNode.val;
        if (currNode.left == null && currNode.right == null) {
            sum += +currSum;
        }

        traverse(currNode.left, currSum);
        traverse(currNode.right, currSum);
    }
    traverse(root, '');
    return sum;
};

/*leetcode 671 - Strategy-  Binary Tree 
a. minimum node is the root node given in the question
b. It can be solved using level Order traversal
*/
var findSecondMinimumValue = function (root) {
    if (!root) return -1;
    let min1 = root.val;//given in the question
    let secondMinVal = Infinity;

    let queue = [root];

    while (queue.length) {
        let currSize = queue.length;
        for (let i = 0; i < currSize; i++) {
            let currNode = queue.shift();

            if (currNode.val > min1 && currNode.val < secondMinVal) {
                secondMinVal = currNode.val;
                break;//optional
                //As it is level order traversal and special tree , root is always 
                //less than children then no need to traverse further.
            }

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }


    return secondMinVal != Infinity ? secondMinVal : -1;
}



//VVVVVIMP
//I will show you all how to tackle various tree questions using iterative inorder traversal. First one is the standard iterative inorder traversal using stack
/* In Order Traversal for BST - Iterative- BFS */
var inorderTraversal = function (root) {
    if (!root) return [];

    let result = [];
    let stack = [];

    while (root != null || stack.length) {
        /* Case1- push and Continue left */
        if (root != null) {
            stack.push(root.val);
            root = root.left;
        } else {
            /* Case2- pop, push and check right */
            //when there is no more left and null is assigned in root and now it is turn to go right
            root = stack.pop();
            result.push(root.val);
            root = root.right;
        }
    }

    return result;
}

var kthSmallest = function (root, k) {
    if (!root) return [];
    if (k > root.length) return []

    let result = [];
    let stack = [];

    while (root || stack.length) {
        if (root) {
            //traverse left
            stack.push(root);
            root = root.left;
        } else {
            //if left most is null or reached null in above if statement
            root = stack.pop();
            result.push(root.val);

            if (k == result.length) {
                return result[k - 1];
            }
            root = root.right;
        }
    }

    return result[result.length - 1];
};

var isValidBST = function (root) {
    if (!root) return [];
    let stack = [];

    while (root || stack.length) {
        let previous = null;
        if (!root) return true;

        let stack = [];

        while (root || stack.length) {
            if (root) {
                stack.push(root);
                root = root.left;
            } else {
                root = stack.pop();
                if (previous && root.val <= previous.val) return false;
                //<= because if duplicate VALUES then we want it on right side of node and not on left side
                previous = root;
                root = root.right;
            }
        }
    }
    return true;
};

var findMode = function (root) {
    if (!root) return [0];
    if (root.left == null && root.right == null) return [root.val];

    let previous = null;
    let modes = [];
    let count = 1;
    let maxCount = 0;

    let stack = [];
    while (root || stack.length) {
        if (root) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            if (previous && previous.val == root.val) {
                count += 1;
                if (count == maxCount) {
                    modes.push(root.val);
                } else if (count > maxCount) {
                    modes = [root.val]; //clear all and reassign 
                }
            } else {
                count = 1;//reset counter
            }
            previous = root;

            root = root.right;
        }
    }

    return modes;
};

/* Above logic is incorrect and below one is 100% correct and O(1) space */
var findMode = function (root) {
    if (!root) return [0];
    if (root.left == null && root.right == null) return [root.val];

    let previous = null;
    let modes = [];
    let count = 1;
    let maxCount = 0;

    let stack = [];
    while (root || stack.length) {
        if (root) {
            stack.push(root);
            root = root.left;
        } else {
            root = stack.pop();
            if (previous) {
                if (previous.val == root.val) {
                    count++;
                } else {
                    count = 1;
                }
            }
            if (count > maxCount) {
                modes = [root.val];
                maxCount = count;
            } else if (count == maxCount) {
                modes.push(root.val);
            }
            previous = root;
            root = root.right;
        }
    }
    return modes;
}

//NOT CONFIDENT - VISIT AGAIN
//https://www.youtube.com/watch?v=xLQKdq0Ffjg&t=712s
var postorderTraversal = function (root) {
    if (root == null) return [];
    let curr = root;
    let stack = [];
    let result = [];
    while (curr || stack.length) {
        if (curr) {
            stack.push(curr);
            curr = curr.left;//reach leftmost node
        } else {
            curr = stack[stack.length - 1];  //peek for top
            if (curr.right) {
                curr = curr.right;
            }
            else { //right of top does not exist, so need to pop
                curr = stack.pop();
                result.push(curr.val);
                while (stack.length && curr == stack[stack.length - 1].right) {  //while last popped el is  stack's top's right child, visit it
                    curr = stack.pop();
                    result.push(curr.val);
                }
                if (stack.length) { //end case, this cond will break is stack is empty
                    curr = stack[stack.length - 1].right;
                } else {
                    curr = null;
                }
            }

        }
    }
    return result;
};

//Very easy
var rangeSumBST = function (root, L, R) {
    if (!root) return 0;
    let sum = 0;

    let queue = [root];
    while (queue.length) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (currNode.val >= L && currNode.val <= R) sum += currNode.val;

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);

        }
    }

    return sum;
}

//leetcode 404 - remember trick
var sumOfLeftLeaves = function (root) {
    if (!root) return 0;

    //special case only for this question
    //if only root node present then dont treat it as left node

    let sum = 0;
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            // if(currNode.left) queue.push(currNode.left);--Here is the trick
            if (currNode.left) {
                if (currNode.left.left == null && currNode.left.right == null) {
                    sum += currNode.left.val;
                } else {
                    queue.push(currNode.left);
                }
            }
            if (currNode.right) queue.push(currNode.right);

        }
    }
    return sum;
};

//Easy
var searchBST = function (root, val) {
    if (!root) return null;

    let currNode = root;
    while (currNode) {
        if (val == currNode.val) return currNode;
        else if (val < currNode.val) {
            currNode = currNode.left;
        } else {
            currNode = currNode.right;
        }
    }
    return null
};

//more consice
var searchBST = function (root, val) {
    if (!root) return null;
    while (root && root.val != val) {
        root = val < root.val ? root.left : root.right;
    }
    return root;
};


//leetcode 108 VVVVIMP - good question
//https://www.youtube.com/watch?v=VCTP81Ij-EM
var sortedArrayToBST = function (nums) {
    if (!nums || !nums.length) return null;

    /*Height Balanced tree = the depth of every node in the subtree should not be greater than 1*/

    function constructTree(left, right) {
        /*base condition*/
        if (left > right) return null;

        let mid = left + Math.floor((right - left) / 2);


        let current = new TreeNode(nums[mid]);

        current.left = constructTree(left, mid - 1);
        current.right = constructTree(mid + 1, right);

        return current;
    }
    return constructTree(0, nums.length - 1);
};

//109. Convert Sorted List to Binary Search Tree
var sortedListToBST = function (head) {

};

//1254
function TreeDiameter() {

}

//1302. Deepest Leaves Sum
var deepestLeavesSum = function (root) {
    let maxDepth = findMaxDepth(root);

    let queue = [root];
    let depth = 0;
    let sum = 0;
    while (queue.length) {
        depth += 1;
        let currLevel = queue.length;
        for (let i = 0; i < currLevel; i++) {
            let currNode = queue.shift();
            if (maxDepth == depth) sum += currNode.val;
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }
    return sum;


    function findMaxDepth(root) {
        if (!root) return 0;

        let depth = 0;
        let queue = [root];

        while (queue.length) {
            depth += 1;
            let currLevel = queue.length;
            for (let i = 0; i < currLevel; i++) {
                let currNode = queue.shift();
                if (currNode.left) queue.push(currNode.left);
                if (currNode.right) queue.push(currNode.right);
            }
        }
        return depth;
    }
};






/* Sample code */

// DO NOT EDIT
// Node class for a binary tree node
class TreeNode {
    constructor(value) {
        this.val = value;
        this.left = null;
        this.right = null;
    }
}


// DO NOT EDIT
/* Convert arr to binary tree */
function deSerialize(arr) {
    //if (!arr?.length) return 0;

    let root = new TreeNode(arr[0]);
    let queue = [root];
    arr.shift();

    while (queue.length > 0) {
        let currNode = queue.shift();
        let left = arr.shift();
        let right = arr.shift();

        if (left) {
            currNode.left = new TreeNode(left);
            queue.push(currNode.left);
        }
        if (right) {
            currNode.right = new TreeNode(right);
            queue.push(currNode.right);
        }
    }
    return root;
}


let root = deSerialize([1, 2, 3]);

console.log(getTargetCopy(root));


//337. House Robber III --- Very easy
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

class HousePair {
    withRobbery = 0;
    withoutRobbery = 0;
}
var rob = function (root) {

    if (root == null) return 0;


    function dfs(root) {
        if (root == null) return new HousePair();
        let left = dfs(root.left);
        let right = dfs(root.right);

        let answerPair = new HousePair();
        answerPair.withRobbery = left.withoutRobbery + root.val + right.withoutRobbery;

        answerPair.withoutRobbery = Math.max(left.withRobbery, left.withoutRobbery) + Math.max(right.withRobbery, right.withoutRobbery)
        return answerPair;
    }

    let finalResult = dfs(root);

    return Math.max(finalResult.withRobbery, finalResult.withoutRobbery);
};
//https://www.youtube.com/watch?v=kTL5LhCTL1c
console.log(robIII([3, 2, 3, null, 3, null, 1]));