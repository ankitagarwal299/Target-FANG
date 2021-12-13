//102. Binary Tree Level Order Traversal - Using shifts/unshift and not usiing 2 Queues
var levelOrder = function (root) {
    if (root == null) return [];

    let res = [];

    let queue = [root];

    while (queue.length > 0) {
        let currLevel = queue.length;//// Get the length prior to dequeueing, maniipulatiing same array and iterating gives weird results
        let thislevelNodes = [];


        for (let i = 0; i < currLevel; i++) {
            let currNode = queue.shift();
            thislevelNodes.push(currNode.val);

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
        res.push(thislevelNodes);
    }

    return res;
};

////102. Binary Tree Level Order Traversal - Using 2 Queues and not usiing shifts/unshift
var levelOrder = function (root) {
    if (root == null) return [];

    let res = [];

    let queue = [root];

    while (queue.length > 0) {
        let currLevel = queue.length;
        let thislevelNodes = [];
        let childQueue = []


        for (let i = 0; i < currLevel; i++) {
            let currNode = queue.shift();
            thislevelNodes.push(currNode.val);

            if (currNode.left) childQueue.push(currNode.left);
            if (currNode.right) childQueue.push(currNode.right);
        }
        queue = childQueue;
        res.push(thislevelNodes);
    }

    return res;
};
//------------------------------------------------Binary Tree Zigzag Level Order Traversal || 3 approaches----------------------------------------
//103. Binary Tree Zigzag Level Order Traversal - Using shift/Unshift (UNshift is costly and requies moore memory)
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


//103. Binary Tree Zigzag Level Order Traversal - Using 2 STACKS (intutive) --IMPOORTANT LEARN | T- ON, S- ON
//https://www.youtube.com/watch?v=eDdPZ05y4Os

var zigzagLevelOrder = function (root) {
    if (root == null) return [];

    let res = [];

    let leftToRight = true;

    let stack = [root];
    let childStack = [];

    while (stack.length > 0) {
        let currLevlLength = stack.length;//Get the length before pop
        let currLevlNodeArr = [];
        childStack = [];


        for (let i = 0; i < currLevlLength; i++) {
            let currNode = stack.pop();//important to pop
            currLevlNodeArr.push(currNode.val)

            if (leftToRight) {//if gooiing left to right , then add children left to right
                if (currNode.left) childStack.push(currNode.left);
                if (currNode.right) childStack.push(currNode.right);

            } else {//if gooiing left to right , then add children right to left
                if (currNode.right) childStack.push(currNode.right);
                if (currNode.left) childStack.push(currNode.left);

            }
        }

        leftToRight = !leftToRight;
        stack = childStack;
        res.push(currLevlNodeArr);
    }
    return res;
};
//---------------------------------------------------------------------------------------------------------------------------
//reverse | same as above , just reverse in the end
//107. Binary Tree Level Order Traversal II


//But if we only need to print values than reversing will not work?
//[3,9,20,null,null,15,7] ->  [ 3, 9, 20, 15, 7 ] - > then reversing [7 , 15 , 20 , 9 ,3] //all right to left
//So to print Binary tree in rever level order then here is the trick (insert right child first then left child)
var levelOrderBottom = function (root) {
    if (!root) return [];

    let queue = [root];
    let result = [];

    while (queue.length > 0) {
        let currLevelSize = queue.length;
        //let currLvlArr = [];

        for (let i = 0; i < currLevelSize; i++) {
            let currNode = queue.shift();
            // currLvlArr.push(currNode.val);
            result.push(currNode.val);
            if (currNode.right) queue.push(currNode.right);//right child before
            if (currNode.left) queue.push(currNode.left);

        }
        //result.push(currLvlArr);
    }
    console.log(result); //--> [3, 20, 9, 7, 15]

    let reverse = [];
    while (result.length > 0) {
        reverse.push(result.pop());
    }
    return reverse;//--> [3, 20, 9, 7, 15] - [15, 7,  9, 20, 3];

};

//----------------------------------------------------------------------N-ary Tree Level Order Traversal
//429. N-ary Tree Level Order Traversal
var levelOrder = function (root) {
    if (root == null) return [];

    let res = []

    let queue = [root];
    while (queue.length > 0) {
        let currLevlLen = queue.length;
        let currlevlNode = [];

        for (let i = 0; i < currLevlLen; i++) {
            let currNode = queue.shift();
            currlevlNode.push(currNode.val);

            for (let i = 0; i < currNode.children.length; i++) {
                if (currNode.children[i]) queue.push(currNode.children[i])
            }

            /* for (let child of currNode.children) {
                queue.push(child);
            } */
        }

        res.push(currlevlNode)
    }
    return res;
};

//----------------------------------------------------------------------Maximum Depth of Binary Tree
//104. Maximum Depth of Binary Tree - Easy
var maxDepth = function (root) {
    if (!root) return 0;

    let left = maxDepth(root.left);
    let right = maxDepth(root.right);

    return Math.max(left, right) + 1;
};

//iterative - Simple Level Order Traversal count levels
var maxDepth = function (root) {
    if (!root) return 0;

    let level = 0;
    let queue = [root];
    while (queue.length > 0) {
        let currLevlLen = queue.length;
        level++;

        for (let i = 0; i < currLevlLen; i++) {
            let currNode = queue.shift();

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
    }
    return level;
};
//-----------------------------------------------------------------------Maximum Depth of N-ary Tree - Take a look

//559. Maximum Depth of N-ary Tree - Easy
//Oterative
var maxDepth = function (root) {
    if (root == null) return 0;
    let level = 0;

    let queue = [root]
    while (queue.length > 0) {
        let currLevlen = queue.length;

        level++;

        for (let i = 0; i < currLevlen; i++) {
            let currNode = queue.shift();
            for (let i = 0; i < currNode.children.length; i++) {
                if (currNode.children[i]) queue.push(currNode.children[i]);
            }
        }

    }
    return level;
};

//recursive
var maxDepth = function (root) {
    if (root == null) return 0;

    let max = 0;
    for (let i = 0; i < root.children.length; i++) {
        max = Math.max(max, maxDepth(root.children[i]));
    }
    return max + 1;
};

//------------------------------------------------------------------------1161. Maximum Level Sum of a Binary Tree - Easy (Take 2 counters)

var maxLevelSum = function (root) {
    if (root == null) return 0;

    let maxSum = -Infinity;
    let smallestlevel = 0;
    let level = 0;

    let queue = [root];
    while (queue.length > 0) {
        level++;

        let currlevlLen = queue.length;
        let sum = 0;


        for (let i = 0; i < currlevlLen; i++) {
            let currNode = queue.shift();
            sum += currNode.val;
            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
        if (sum > maxSum) {
            maxSum = sum;
            smallestlevel = level;
        }
    }
    return smallestlevel;//smallest level with maximim sum
};
//------------------------------------------------------------------------637. Average of Levels in Binary Tree - Very Easy (same as above)
var averageOfLevels = function (root) {
    if (root == null) return 0;

    let res = [];

    let queue = [root];
    while (queue.length > 0) {
        let currLevlen = queue.length;
        let currNodeArr = [];
        let avgCurrLevel = 0;

        for (let i = 0; i < currLevlen; i++) {
            let currNode = queue.shift();
            avgCurrLevel += currNode.val;

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);
        }
        res.push(avgCurrLevel / currLevlen);

    }
    return res;
}


//------------------------------------------------------------------------938. Range Sum of BST -  (Binary Search tree) 
//DFS
var rangeSumBST = function (root, L, R) {
    if (!root) return 0;
    let sum = 0;

    function dfs(node) {
        if (node == null) return 0;
        if (node.val >= L && node.val <= R) sum += node.val;


        if (node.val >= L) dfs(node.left)
        if (node.val <= R) dfs(node.right)
        return;
    }
    dfs(root, 0);

    return sum;
}
//Iterative
var rangeSumBST = function (root, L, R) {
    if (!root) return 0;
    let sum = 0;

    let queue = [root];
    while (queue.length > 0) {
        let currLevllen = queue.length;
        for (let i = 0; i < currLevllen; i++) {
            let currNode = queue.shift();
            if (currNode.val >= L && currNode.val <= R) sum += currNode.val;

            if (currNode.left && currNode.val >= L) queue.push(currNode.left);
            if (currNode.right && currNode.val <= R) queue.push(currNode.right);
        }
    }

    return sum;
}
//------------------------------------------------------------------

//----------------------------------------199. Binary Tree Right Side View -------- Iterative
var rightSideView = function (root) {
    if (!root) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let currLvlSize = queue.length;

        for (let i = 0; i < currLvlSize; i++) {
            let currNode = queue.shift();
            if (i == currLvlSize - 1) {//only this logic
                result.push(currNode.val);
            }

            if (currNode.left) queue.push(currNode.left);
            if (currNode.right) queue.push(currNode.right);

        }
    }
    return result;
};

//----------------------------------------199. Binary Tree Right Side View -------- Recursive

var rightSideView = function (root) {
    if (root == null) return [];

    let result = []

    let maxLevelVisited = 0;

    function DFS(node, level) {
        if (node == null) return;

        if (level > maxLevelVisited) {
            result.push(node.val);
            maxLevelVisited = level;
        }

        if (node.right) DFS(node.right, level + 1);
        if (node.left) DFS(node.left, level + 1);

    }

    DFS(root, 1)
    return result;
};

//----------------------------------------------------------545. Boundary of Binary Tree | clockwise , Anti clockwise, Only Boundary(no leaf nodes) | Perfect
var clockWiseBoundary = function (root) {
    if (!root) return [];

    let result = []

    function leftView(node) {
        if (node == null) return;

        if (node.left) {//Left is priority therefore it is 1st
            leftView(node.left);//here imp (going first deep)
            result.push(node.val);

        } else if (node.right) {//Here else statement is important

            leftView(node.right);
            result.push(node.val);
        }

    }


    function rightView(node) {
        if (node == null) return;

        if (node.right) {//Right is priority therefore it is 1st
            result.push(node.val);//Here first print and then go
            rightView(node.right);

        } else if (node.left) {
            result.push(node.val);
            rightView(node.left);

        }
    }

    function LeafNodes(node) {
        if (node == null) return;

        if (node.right == null && node.left == null) {
            result.push(node.val);
            return;
        }
        LeafNodes(node.right);//clockwise therefore right is 1st
        LeafNodes(node.left);
    }




    /* Clockwise */
    result.push(root.val);//1
    rightView(root.right);//2
    LeafNodes(root);//3
    leftView(root.left);//4




    console.log(result); //[1,2,3,null,5,null,4] ----> [ 1, 3, 4, 5, 2 ]

};


var AnticlockWiseBoundary = function (root) {
    if (!root) return [];

    let result = []

    function leftView(node) {
        if (node == null) return;

        if (node.left) {
            result.push(node.val);//Here first print and then go
            leftView(node.left);

        } else if (node.right) {//Here else statement is important
            result.push(node.val);
            leftView(node.right);
        }

    }


    function rightView(node) {
        if (node == null) return;

        if (node.right) {
            rightView(node.right);//here imp going first deep
            result.push(node.val);

        } else if (node.left) {//Here else if statement is important
            rightView(node.left);
            result.push(node.val);
        }
    }

    function LeafNodes(node) {
        if (node == null) return;

        if (node.right == null && node.left == null) {
            result.push(node.val);
            return;
        }

        LeafNodes(node.left);
        LeafNodes(node.right);
    }

    /* Anti Clockwise */
    result.push(root.val);//1
    leftView(root.left);//2
    LeafNodes(root);//3
    rightView(root.right);//4

    console.log(result); //[ 1, 2, 5, 4, 3 ]
};

//ONly Boundary (Left and Right View) and not bottom
var Boundary = function (root) {
    if (!root) return [];



    function leftView(node) {
        if (node == null) return;

        if (node.left) {
            leftView(node.left);
            result.push(node.val);//Here first print and then go

        } else if (node.right) {//Here else statement is important

            leftView(node.right);
            result.push(node.val);
        }

    }


    function rightView(node) {
        if (node == null) return;

        if (node.right) {
            result.push(node.val);
            rightView(node.right);//here imp going first deep


        } else if (node.left) {//Here else if statement is important
            result.push(node.val);
            rightView(node.left);
        }
    }

    function LeafNodes(node) {
        if (node == null) return;

        if (node.right == null && node.left == null) {
            boundary.push(node.val);
            return;
        }

        LeafNodes(node.left);
        LeafNodes(node.right);
    }

    let result = []

    let boundary = [];

    LeafNodes(root);//1
    result.push(boundary[0]);//2

    leftView(root.left);//3
    result.push(root.val);//4
    rightView(root.right);//5
    result.push(boundary.pop());//6

    console.log(result); //[ 5, 2, 1, 3, 4 ]
};
//------------------------------------------------------------------------------------------------------------------------

//------------------------------------------------------------297. Serialize and Deserialize Binary Tree--------------------
//Convert Binary tree to array using PRE ORDER TRAVERSAL
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

    return JSON.stringify(result); //  [1, 2, null, null,3, 4, null, null,5, null, null]

};

//Convert Array in Pre order traversal back to Binary Tree
var deserialize = function (data) {
    //if(data == null) return null;

    const arr = JSON.parse(data);
    if (arr == null || arr.length == 0 || arr[0] == null) {
        return null;
    }

    function buildTree() {
        const item = arr.shift();

        if (item == null) return null;

        const node = new TreeNode(item);

        node.left = buildTree();
        node.right = buildTree();
        return node;//finaly to build tree at the end
    }
    const completeTree = buildTree();


    return completeTree;
};
//PRE ORder traversal to form Queue, and then PRE ORder traversal to build Tree
console.log(serialize([1, 2, 3, null, null, 4, 5]));//tree is given return "[1, 2, null, null,3, 4, null, null,5, null, null]""


console.log(deserialize("[1, 2, null, null,3, 4, null, null,5, null, null]"));//STRING is given return [1, 2, 3, null, null, 4, 5] in tree format



//--------------------------------------------------------------449. Serialize and Deserialize BST - Different Strategy in Biinary Search Tree (Easy)
//https://www.youtube.com/watch?v=9sw8RRsBw6s&t=603s

//Convert Binary Search tree to array using PRE ORDER TRAVERSAL (Do not include null in the leaf nodes)
var serialize = function (root) {
    let result = [];
    if (root == null) return "[null]";

    function preOrderTraversal(node) {
        if (node == null) {
            //result.push(null);//In this case commented, DONT push (imp)
            return;
        }
        result.push(node.val);
        preOrderTraversal(node.left);
        preOrderTraversal(node.right);

    }
    preOrderTraversal(root)

    console.log(result)
    return JSON.stringify(result);
};

//Convert Array in Pre order traversal back to Binary Search Tree 
var deserialize = function (data) {
    let queue = JSON.parse(data);

    console.log(queue)
    if (queue == null || queue.length == 0 || queue[0] == null) return null;

    function buildTree(lower, upper) {
        if (queue.length == 0) return null;

        if (lower > queue[0] || queue[0] > upper) return null;//  lower > queue[0] > upper //  lower < queue[0] < upper

        let node = new TreeNode(queue.shift());
        node.left = buildTree(lower, node.val);//in case of left lower bound in the minimum
        node.right = buildTree(node.val, upper);//in case of right Upper bound in the Maximum
        return node;
    }
    return buildTree(-Infinity, Infinity);
};


//--------------------------------------------------------------1008. Construct Binary Search Tree from Preorder Traversal- Different Strategy in Binary Search Tree (Easy)
//https://www.youtube.com/watch?v=9sw8RRsBw6s&t=603s
//Compact way to serialize as we are ot including null

var bstFromPreorder = function (preorder) {
    let queue = preorder;//array of integers preorder,

    if (queue == null || queue.length == 0 || queue[0] == null) return [];

    function buildTree(lower, upper) {
        if (queue.length == 0) return null;

        if (lower > queue[0] || queue[0] > upper) return null;// (used for right branch) lower > queue[0] > upper (used to return fromo left branch)

        let node = new TreeNode(queue.shift());

        node.left = buildTree(lower, node.val);
        node.right = buildTree(node.val, upper);
        return node;//important to build
    }
    return buildTree(-Infinity, Infinity)
};

//--------------------------------------------------------------98. Validate Binary Search Tree ||  Refer above 2
var isValidBST = function (root) {
    if (root == null) return true;

    function validate(lower, upper, node) {
        if (node == null) return true;

        if (lower >= node.val || node.val >= upper) {////[2,2,2,], [1, null,1] striclty less, refer above question
            console.log(lower, node.val, upper);
            return false;
        }

        return validate(lower, node.val, node.left) && validate(node.val, upper, node.right);
    }
    return validate(-Infinity, Infinity, root);
};
//---------------------------------------------------------108. Convert Sorted Array to Binary Search Tree || IMp (esy)
//Inorder Traversal to Binary Search Tree
var sortedArrayToBST = function (nums) {
    if (nums == null || nums.length == 0) return [];

    if (nums.length == 1) return new TreeNode(nums[0]);


    function constructBST(left, right) {
        if (left > right) return null;

        let mid = left + Math.floor((right - left) / 2);

        let node = new TreeNode(nums[mid]);

        node.left = constructBST(left, mid - 1);
        node.right = constructBST(mid + 1, right);
        return node;
    }

    return constructBST(0, nums.length - 1);
};

//--------------------------------------------------------------------------------257. Binary Tree Paths-------------

//Using ARRAYS
var binaryTreePaths = function (root) {
    if (root == null) return root;

    let result = [];

    function dfs(node, currPathArr) {
        if (node == null) return;

        if (node.left == null && node.right == null) {
            result.push([...currPathArr, node.val]);
            return;
        }

        dfs(node.left, [...currPathArr, node.val]);
        dfs(node.right, [...currPathArr, node.val]);//new array is important either by Array.from or slice() or spread operator

    }
    dfs(root, []);

    return result.map(row => row.join('->'));
};

//Using STRINGS
var binaryTreePaths = function (root) {
    if (root == null) return root;

    let result = [];

    function dfs(node, currPathString) {
        if (node == null) return;

        if (node.left == null && node.right == null) {
            result.push(currPathString + node.val);
            return;
        }

        dfs(node.left, currPathString + node.val + "->");
        dfs(node.right, currPathString + node.val + "->");

    }
    dfs(root, "");

    return result;
};

//----------------------------------------------------------112. Path Sum-------------------------------------------------------------------
var hasPathSum = function (root, sum) {
    if (root == null) return false;

    function dfs(node, currsum) {
        if (node == null) return false;

        //root to leaf,check only at leaf nodes
        if (node.left == null && node.right == null) {
            currsum = currsum + node.val;
            if (currsum == sum) return true;
            return false;
        }

        return dfs(node.left, currsum + node.val) || dfs(node.right, currsum + node.val);
    }
    return dfs(root, 0)
};

//----------------------------------------------------------113. Path Sum II-------------------------------------------------------------------
var pathSum = function (root, sum) {
    if (root == null) return [];
    let result = [];

    function dfs(node, currSum, currArr) {
        if (node == null) return;

        //root to leaf,check only at leaf nodes
        if (node.left == null && node.right == null) {
            currSum = currSum + node.val;
            if (currSum == sum) {
                result.push([...currArr, node.val]);
            }
            return;
        }

        dfs(node.left, currSum + node.val, [...currArr, node.val]);
        dfs(node.right, currSum + node.val, [...currArr, node.val]);
    }
    dfs(root, 0, []);

    return result;
};

//----------------------------------------------------------129. Sum Root to Leaf Numbers-------------------------------------------------------------------
var sumNumbers = function (root) {
    if (root == null) return 0;

    let result = 0;

    function dfs(node, currpathString) {
        if (node == null) return;

        if (node.left == null && node.right == null) {
            currpathString += node.val;
            result = result + Number(currpathString)
            return;
        }

        dfs(node.left, currpathString + node.val);
        dfs(node.right, currpathString + node.val);

    }

    dfs(root, "");

    return result;
};

//--------------------------------------------------------988. Smallest String Starting From Leaf || Very good question----------------

//1. Input integer but assume alphabet
//2. Traverse root to leaf but consider opposite leaf to root
//3. compare 2 strings for smallest
var smallestFromLeaf = function (root) {
    if (root == null) return 0;

    let prevSmallest = "";
    let alphabhets = 'abcdefghijklmnopqrstuvwxyz';

    function dfs(node, currpath) {
        if (node == null) return;

        //root to leaf,check only at leaf nodes
        if (node.left == null && node.right == null) {
            currpath = alphabhets.charAt(node.val) + currpath
            if (prevSmallest.length == 0 || prevSmallest > currpath) prevSmallest = currpath;
            return;
        }

        dfs(node.left, alphabhets.charAt(node.val) + currpath);
        dfs(node.right, alphabhets.charAt(node.val) + currpath);
        return;
    }
    dfs(root, "")
    return prevSmallest;
};
/*
Input: root = [0, 1, 2, 3, 4, 3, 4]
Output: "dba"

Input: root = [25, 1, 3, 1, 3, 0, 2]
Output: "adz"

Input: root = [2, 2, 1, null, 1, 0, null, 0]
Output: "abc"
*/

//---------------------------------------------------------------------------------124. Binary Tree Maximum Path Sums || HARD- LEARN(Very good question)---------------------
//https://www.youtube.com/watch?v=TO5zsKtc1Ic&list=PLEJXowNB4kPwCPVjDv6KsAsThtDOCQUok&index=30
//HARD- LEARN
//https://www.youtube.com/watch?v=p8P4Iv1rrtg

var maxPathSum = function (root) {
    if (root == null) return 0;

    let result = -Infinity;


    /* Post Order Traversal*/
    function dfs(node) {
        if (node == null) return 0;

        let left = dfs(node.left)
        let right = dfs(node.right)

        let maximumSatrtight = Math.max(Math.max(left, right) + node.val, node.val);// curr node is in the path either left or right
        let maximumCurrNodeRoot = Math.max(maximumSatrtight, left + node.val + right);//current node is root
        result = Math.max(result, maximumCurrNodeRoot);//curr node is not in path of max sum

        return maximumSatrtight;//only startight path will go further
    }


    dfs(root);

    return result;

};


//--------------------------------------------------------------------1022. Sum of Root To Leaf Binary Numbers | parseInt (binary,2) converts binary to decimal
var sumRootToLeaf = function (root) {
    if (root == null) return 0;

    let result = 0;

    function dfs(node, currpath) {
        if (node == null) return 0;

        if (node.left == null && node.right == null) {
            currpath = currpath + node.val;
            result = result + parseInt(currpath, 2); //parseInt converts binary parseInt(currpath, which format currpath provided)
            return;
        }

        dfs(node.left, currpath + node.val);
        dfs(node.right, currpath + node.val);
    }

    dfs(root, "");

    return result;
};


//-----------------------------------------------------------------100. Same Tree|| Easy-------------
var isSameTree = function (p, q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    if (p.val != q.val) return false;


    /*Copy/paste same 3 conditions */
    function isCompare(p, q) {
        if (p == null && q == null) return true;
        if (p == null || q == null) return false;
        if (p.val != q.val) return false;

        return isCompare(p.left, q.left) && isCompare(p.right, q.right);
    }


    return isCompare(p.left, q.left) && isCompare(p.right, q.right);

};

//--------------------------------------------------------------------------------226. Invert Binary Tree | Easy
var invertTree = function (root) {
    if (root == null) return root;
    function dfs(node) {
        if (node == null) return null;

        /*Post Order Traversal RLRooot*/
        dfs(node.right);
        dfs(node.left);

        /* Just swap right Arm to left Arm - Inplace so not return  */
        let temp = node.left;
        node.left = node.right;
        node.right = temp;
    }
    dfs(root);//start

    return root
};
//--------------------------------------------------------------------------------572. Subtree of Another Tree | Trickyc-Imp
var isSubtree = function (s, t) {
    if (s == null && t == null) return true;
    if (s == null || t == null) return false;

    function isSameDfs(s, t) {
        if (s == null && t == null) return true;
        if (s == null || t == null) return false;

        if (s.val != t.val) return false;

        return isSameDfs(s.left, t.left) && isSameDfs(s.right, t.right);

    }

    return isSameDfs(s, t) || isSubtree(s.left, t) || isSubtree(s.right, t); //(All 3 calls are different)
};

//---------------------------------------230. Kth Smallest/Largest Element in a BST ||  Inorder Traversal-Iterative Approach
//refer: https://leetcode.com/problems/kth-smallest-element-in-a-bst/discuss/642338/JavaScript-Solution-Inorder-Recursive-Iterative-and-Morris-Approach

//Inorder Traversal-Iterative Approach
var kthSmallest = function (root, k) {
    if (root == null) return null;

    let stack = [];
    let curr = root;

    while (stack.length > 0 || curr != null) {

        while (curr != null) {
            stack.push(curr);
            curr = curr.left;//keep pushing left nodes
        }

        if (stack.length > 0) {
            let topMost = stack.pop();//leftmost node

            k--;
            if (k == 0) return topMost.val;//smallest k

            curr = topMost.right;
        }
    }

};


//----------------------------------------------------InOrder Recursive Approach
var kthSmallest = function (root, k) {
    if (root == null) return null;

    let result = null;

    function inorderDfs(node) {
        if (node == null) return null;

        inorderDfs(node.left);
        k--;

        if (k == 0) {
            result = node.val;
            return;
        }
        inorderDfs(node.right);
    }
    inorderDfs(root);

    return result;
};
//https://www.youtube.com/watch?v=DfIoVCQ2Lvg&t=48s
var kthLargest = function (root, k) {
    if (root == null) return null;

    let result = null;

    function reverseInorderDfs(node) {
        if (node == null) return null;

        reverseInorderDfs(node.right);//
        k--;

        if (k == 0) {
            result = node.val;
            return;
        }
        reverseInorderDfs(node.left);

    }
    reverseInorderDfs(root);

    return result;
};






//------------------------------------------------94. Binary Tree Inorder Traversal-Iterative Approach | Easy
var inorderTraversal = function (root) {
    if (root == null) return [];

    let result = [];

    let stack = [];
    let curr = root;
    while (stack.length > 0 || curr != null) {

        while (curr != null) {//Step1 : get all left and push to stack
            stack.push(curr);
            curr = curr.left;
        }

        if (stack.length > 0) {
            let topMost = stack.pop();//Step2 :pop stack and search right
            result.push(topMost.val);//this is ouor buddy
            curr = topMost.right;
        }
    }
    return result;
};

//------------------------------------------------144. Binary Tree Preorder Traversal-Iterative Approach | Easy
var preorderTraversal = function (root) {
    if (root == null) return [];

    let preOrderpath = [];

    let stack = [root];

    while (stack.length > 0) {
        let curr = stack.pop();
        preOrderpath.push(curr.val);

        if (curr.right != null) stack.push(curr.right);//Here to note: first insert right node then left
        if (curr.left != null) stack.push(curr.left);
    }

    return preOrderpath
};




//-------------------------------------------------285. Inorder Successor in BST (Successor and Predecessor) || Excellent (locked)
//Because it is BST we used IN-order to find out (Successor and Predecessor) 
//https://www.youtube.com/watch?v=lXL9xs0G8Uo Sumit Sir
var sucessor = function (root, k) {
    if (root == null) return null;

    let predecessor = null;
    let sucessor = null;

    let state = 0;//it will be in stack memory and data members in heap memory
    function inorderDfs(node) {
        if (node == null) return null;

        inorderDfs(node.left);

        if (state == 0) {
            if (node.val == k) {
                predecessor = node.val;
                state = 1;
            }
        } else if (state == 1) {
            sucessor = node.val;
            return;//break we got what we required
        }


        inorderDfs(node.right);
    }
    inorderDfs(node)

    return [predecessor, sucessor];
};



//----------------------Because it is Binary Tree we used PRE-order to find out (Successor and Predecessor)  - N-ary tree
//https://www.youtube.com/watch?v=lXL9xs0G8Uo
var sucessor = function (root, k) {
    if (root == null) return null;

    let predecessor = null;
    let sucessor = null;

    let state = 0;//it will be in stack memory and data members in heap memory


    function preorder(node) {
        if (node == null) return;

        if (state == 0) {
            if (node.val == k) {
                predecessor = node.val;
                state = 1;
            }
        } else if (state == 1) {
            sucessor = node.val;
            return;//break we got what we required
        }

        for (let i = 0; i < node.children.length; i++) {
            preorder(node.children[i]);
        }

    }
    preorder(root);

    return [predecessor, sucessor];
};


//-------------------------------------------------501. Find Mode in Binary Search Tree || Beed Practise 10 times | 4 hours spent
var findMode = function (root) {
    if (root == null) return [];

    let modes = [];
    let prev = null;
    let MaxCount = 0;
    let currCount = 0;

    function inOrderTraversal(node) {
        if (node == null) return;
        inOrderTraversal(node.left);


        if (prev == node.val) {
            currCount++;
        } else {
            prev = node.val;
            currCount = 0;
        }

        if (MaxCount < currCount) {
            MaxCount = currCount;
            modes = [node.val];//overwrite

        } else if (MaxCount == currCount) {
            modes.push(node.val);
        }

        inOrderTraversal(node.right);

    }
    inOrderTraversal(root);

    return modes;
}


//-------------------------------------------------701. Insert into a Binary Search Tree || Easy | Do it again
var insertIntoBST = function (root, val) {
    if (root == null) return new TreeNode(val);

    function dfs(node) {
        if (node == null);

        if (val < node.val) {
            if (node.left == null) {
                node.left = new TreeNode(val);
                return;
            }
            dfs(node.left);
        } else {
            if (node.right == null) {
                node.right = new TreeNode(val);
                return;
            }
            dfs(node.right);
        }

    }
    dfs(root)
    return root;
};

//-------------------------------------------------114. Flatten Binary Tree to Linked List || Easy | Do it 10 times | VVGood Question
//https://leetcode.com/problems/flatten-binary-tree-to-linked-list/discuss/953667/Two-JS-Solutions
var flatten = function (root) {
    if (root == null) return [];


    function findRightMost(node) {
        let curr = node;
        while (curr.right != null) {
            curr = curr.right;
        }
        return curr;
    }

    let curr = root;
    while (curr != null) {
        if (curr.left != null) {
            let rightMost = findRightMost(curr.left);
            rightMost.right = curr.right;
            curr.right = curr.left;
            curr.left = null;
        }
        curr = curr.right;
    }

    return root;
};

//-------------------------------1038. Binary Search Tree to Greater Sum Tree +++  || Reverse InOrder
//--------------------------------- 538. Convert BST to Greater Tree || (2 questions  same to same)
var convertBST = function (root) {
    if (root == null) return root;

    let sum = 0;

    /*Reverse in Oredr Traversal*/
    function reverseInOrder(node) {
        if (node == null) return;

        reverseInOrder(node.right);
        sum = sum + node.val;
        node.val = sum;
        reverseInOrder(node.left);

    }

    reverseInOrder(root);

    return root;
};

//----------------Print BST in decreasing order | My thought after working so many problems || Reverse InOrder
var convertBST = function (root) {
    if (root == null) return root;

    let decreasingOrder = []

    /*Reverse in Oredr Traversal*/
    function reverseInOrder(node) {
        if (node == null) return;

        reverseInOrder(node.right);
        decreasingOrder.push(node.val);
        reverseInOrder(node.left);

    }

    reverseInOrder(root);

    return decreasingOrder;
};


//-----------------------------298. BINARY TREE LONGEST CONSECUTIVE SEQUENCE | (Locked) | (Same)501. Find Mode in Binary Search Tree | Try to print Sequence(I was not able to)
//https://www.youtube.com/watch?v=oSYGjIq6ZM4

var longestConsecutiveSequnce = function (root) {
    if (root == null) return 0;


    let maxSeq = -Infinity;
    let count = 0;

    function dfs(node, nextSeq) {
        if (node == null) return;

        if (node.value == nextSeq) {
            count++;
            maxSeq = Math.max(maxSeq, count);

        } else {
            count = 1;

        }

        dfs(node.left, node.value + 1);
        dfs(node.right, node.value + 1);

    }
    console.log(result)
    dfs(root, root.value);

    return maxSeq
};


//-------------------------------------------------------Root to leaf - Path With Given Sequence- Binary Tree.js | Validate tree path with array | Educative and Tech Dose
//https://www.youtube.com/watch?v=Mu4b6dLfCks&t=2s

var binaryTreePaths = function (root, sequence) {
    if (root == null) return false;

    function findSequence(node, index) {
        if (node == null) return;

        if (index >= sequence.length && node.val != sequence[index]) return false;//Step1 index should not be equal to arr length || val not matching in seq

        if (index == sequence.length - 1 && node.left == null && node.right == null) return true;//leaf node and reached last index

        findSequence(node.left, index + 1) || findSequence(node.right, index + 1);//Or condition try either left path or right path

    }

    return findSequence(root, 0);
};

console.log(binaryTreePaths(root, [1, 0, 7]));//Watch Vedio , do we have root to leaf
console.log(binaryTreePaths(root, [1, 1, 6]));

//---------------------------------------------------------Node to Root Path OR Find ALL Ancestors of a Given Node in a Binary tree | Easy Very Good
//https://www.youtube.com/watch?v=1Kyc-zQS7eQ&list=PL-Jc9J83PIiHYxUk8dSu2_G7MR1PaGXN4&index=20

var findNodeToRootAncestors = function (root, p) {
    let result = [];

    function preOrder(node) {
        if (node == null) return false;

        if (node.val == p) {
            result.push(node.val);// Find all ancestors iis same just dont add that value
            return true;
        }

        if (preOrder(node.left) == true) {
            result.push(node.val);
            return true;
        }
        if (preOrder(node.right) == true) {
            result.push(node.val);
            return true;
        }

        return false
    }

    preOrder(root);

    return result;
};


//-------------------------------------------------------Find ALL Ancestors of a Given Node in a Binary tree  Binary Search Treee | sme as above but strategy changed
var findNodeToRootAncestors = function (root, p) {
    let result = [];

    function dfs(node) {
        if (node == null) return false;

        if (node.val == p) return true;

        if (p < node.val) {
            if (dfs(node.left) == true) {
                result.push(node.val);
                return true;
            }
        } else {
            if (dfs(node.right) == true) {
                result.push(node.val);
                return true;
            }
        }

        return false;
    }
    dfs(node);

    return result;
};

//-------------------------------------------------------------------------------543. Diameter of Binary Tree || Refer Max depth question ||Very Trciky | Do it 10 times

//104. Maximum Depth of Binary Tree - Easy
var maxDepth = function (root) {
    if (!root) return 0;

    let left = maxDepth(root.left);
    let right = maxDepth(root.right);

    return Math.max(left, right) + 1;
};

//https://www.youtube.com/watch?v=P_BpORBQHE0
var diameterOfBinaryTree = function (root) {
    if (root == null) return 0;

    let treeDiameter = 0;
    let maxLef = 0;
    let maxRight = 0;

    function preOrderDfsLeft(node) {
        if (node == null) return 0;
        let left = preOrderDfsLeft(node.left);
        let right = preOrderDfsLeft(node.right);

        maxLef = Math.max(maxLef, left + right);//store max till , then check max we found already?

        return Math.max(left, right) + 1;//forward the longest one
    }

    function preOrderDfsRight(node) {
        if (node == null) return 0;

        let left = preOrderDfsRight(node.left);
        let right = preOrderDfsRight(node.right);

        maxRight = Math.max(maxRight, left + right)

        return Math.max(left, right) + 1;//forward the longest one
    }

    let left = preOrderDfsLeft(root.left);
    let right = preOrderDfsRight(root.right)

    let maxOfSubtree = Math.max(maxLef, maxRight);//(node itself)

    return Math.max(maxOfSubtree, left + right);
};


//-----------------------------------------------------------------------------333. Largest BST Subtree || VVVVVVVVIMP in Tree || (Locked)
//https://www.youtube.com/watch?v=4fiDs7CCxkc (Tushar Roy)
//https://www.youtube.com/watch?v=6nJ_fUcCTNU
function largestBST(root) {
    if (root == null) return 0;

    function postOrderTraversal(node) {
        if (node == null) return [true, 0, Infinity, -Infinity];//null node = //[BST, size , maximum , miniimum]- special case

        if (node.left == null && node.right == null) return [true, 1, node.val, node.val];//leaf node

        let left = postOrderTraversal(node.left);
        let right = postOrderTraversal(node.right);

        if (left[0] == true && right[0] == true) {//if left and right are BST then it is possibility that this node can be BST
            if (left[3] < node.val && node.val < right[2]) {
                //okay so it is BST

                let min = left[3];
                let max = right[2];

                if (min == Infinity) min = node.val;
                if (max == -Infinity) max = node.val;

                return [true, left[1] + right[1] + 1, min, max];////[BST, size , minimum , maximum]
            }
        }
        return [false, Math.max(left[1], right[1]), 0, 0];////[BST, size , minimum , maximum]
    }

    let arr = postOrderTraversal(root);

    return arr[1];//[BST, size , minimum , maximum]

}
console.log(largestBST(root));


//------------------------------------------------------101. Symmetric Tree || Mirror | Very Easy both solutions
//recursive
var isSymmetric = function (root) {
    if (root == null) return true;

    function dfs(node1, node2) {
        if (node1 == null || node2 == null) return node1 == node2;

        if (node1.val != node2.val) return false

        return dfs(node1.left, node2.right) && dfs(node1.right, node2.left);
    }

    return dfs(root.left, root.right);
};

//iterative - very easy
var isSymmetric = function (root) {
    if (!root) return true;
    let queue = [root];


    function isEqual(node1, node2) {
        if (node1 == null || node2 == null) return node1 == node2;//Important

        if (node1.val != node2.val) return false

        return true;
    }


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

//---------------------------------------------------314. Binary Tree Vertical Order Traversal /987. Vertical Order Traversal of a Binary Tree || Very Easy
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
    let sortedMap = [...map.entries()].sort((a, b) => a[0] - b[0]);////[ [ -2, [ 0 ] ], [ -1, [ 1 ] ], [ 0, [ 3, 2, 2 ] ], [ 1, [ 4 ] ] ]

    //push only values-- [[0], [1], [3, 2, 2], [4]]
    for (let [key, value] of sortedMap.entries()) {
        result.push(value);
    }



    return result;
};
//https://www.youtube.com/watch?v=LscPXvD1N1A
console.log(verticalTraversal([1, 2, 3, 4, 5, 6, 7]));//


//------------------------------------------------------Amazon Interview Question - Evaluation of Expression Tree || postfix
//https://www.geeksforgeeks.org/evaluation-of-expression-tree/?ref=lbp
//https://www.youtube.com/watch?v=_P9AdNsZgI4
function evaluateExpression(root) {

    function postorder(node) {
        if (node == null) return 0;
        let left = postorder(node.left);
        let right = postorder(node.right);

        switch (node.val) {
            case '+':
                return left + right;
            case '*':
                return left * right;
            case '-':
                return left - right;
            case '/':
                return left / right;
            default:
                return Number(node.val)
        }
    }
    return postorder(root);

}
console.log(evaluateExpression(root));//Here we are given tree , so we can easily Evaluate values using Post Order Traversal


// --------------------------------------------Convert Postfix expression to Binary Tree
//1. Postfix exprssion to Tree is easy
//2. If Infix expression is given how we write in actual then convert it to Postfix expression
//3. infix expression = a + b - e * f * g -> convert Infix to Post fix to evaluate the expressioon

//https://www.youtube.com/watch?v=WHs-wSo33MM
//https://www.geeksforgeeks.org/expression-tree/
function expressionToTree(str) {
    if (str == null || str.length < 2) return new TreeNode(str[0]);

    let stack = [];


    function isOperator(char) {
        if (char == '+' || char == '+' || char == '+' || char == '+') return true;
        return false;
    }


    for (let i = 0; i < str.length; i++) {
        if (!isOperator(str.charAt(i))) {
            let curr = new TreeNode(str.charAt(i));//if number
            stack.push(curr);
        } else {
            let curr = new TreeNode(str.charAt(i));//if signs

            let right = stack.pop();
            let left = stack.pop();

            curr.right = right;
            curr.left = left;


            stack.push(curr);
        }
    }
    return stack.pop()
}
console.log(expressionToTree("ab+ef*g*-"));//postfix = "ab+ef*g*-";




//-----------------------------------------------606. Construct/Convert String from Binary Tree | Tricky Easy   || VV IIMP (Facebook)
//https://www.youtube.com/watch?v=ymIgl_tFAwQ

var tree2str = function (root) {
    if (root == null) return "";

    let str = "";

    function preDfs(node) {
        if (node == null) return;

        str = str + node.val;

        if (node.left == null && node.right == null) return;

        //left process
        str = str + '(';
        preDfs(node.left);
        str = str + ')';

        //right process - check to avoiid extra paranthese
        if (node.right != null) {
            str = str + '(';
            preDfs(node.right);
            str = str + ')';
        }


    }
    preDfs(root);

    return str
}

//------------------------------------------------536. Construct Binary Tree from String || Tricky Easy || VV IIMP (Facebook) (Locked) 
//https://www.youtube.com/watch?v=ye4b7nH0Hx8
var str2tree = function (str) {
    if (str == null || str.length == 0) return [];

    if (str.length == 1) return new TreeNode(str[0]);

    function isDigit(char) {
        let charCodeAtZero = "0".charCodeAt(0);
        let charCodeNine = "9".charCodeAt(0);

        if (charCodeAtZero >= char.charCodeAt(0) && char.charCodeAt(0) <= charCodeNine) return true;
        return false;
    }

    let stack = [];
    let i = 0;

    while (i < str.length) {

        let char = str.charAt(i);

        if (isDigit(char) || char == '-') {

            let numStartIdx = index; //Code to Extract Number either -4 or 1234------------Start
            let numEndIdx = index;
            while (numStartIdx < str.length && isDigit(numStartIdx)) numEndIdx++;

            let nodeVal = parseInt(str.substring(numStartIdx, numEndIdx));
            let node = new TreeNode(nodeVal);//Code to Extract Number either -4 or 1234------------End



            if (stack.length > 0) {
                let root = stack[0];
                if (root.left == null) root.left = node;
                else root.right = node;
            }
            stack.push(node);//Important to push
            index = numEndIdx;

        } else if (char == ')') {
            stack.pop();
            index++;//Case3 : None of these(digit, -, ')') then iincrement
        }
    }

    return stack.pop();
}

console.log(str2tree("-4(2(3)(1))(6(5)(7))"));


//------------------------------------------------------------105. Construct Binary Tree from Preorder and Inorder Traversal ||  || Tricky Easy  (Facebook)
//https://www.youtube.com/watch?v=ziZP_a3133I
var buildTree = function (preorder, inorder) {
    if (preorder == null || inorder == null || preorder.length == 0 || inorder.length == 0) return [];

    let map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    let preIndex = 0;
    function builder(inStart, inEnd) {
        if (inStart > inEnd) {
            return null;
        } else if (inStart == inEnd) {
            let node = new TreeNode(preorder[preIndex]);
            preIndex++

            return node;
        }

        let nodeVal = preorder[preIndex];
        let nodeIndex = map.get(nodeVal);
        preIndex++;

        let node = new TreeNode(nodeVal);
        node.left = builder(inStart, nodeIndex - 1);
        node.right = builder(nodeIndex + 1, inEnd);

        return node;
    }

    return builder(0, inorder.length - 1);
};

//------------------------------------------------------------106. Construct Binary Tree from Inorder and Postorder Traversal| Only2 change thats it
//https://www.youtube.com/watch?v=HCpaB3awIJs
/* 
inorder = [9, 3, 15, 20, 7];
postorder = [9, 15, 7, 20, 3]// rightmost is root,then right , then left
 */
var buildTree = function (inorder, postorder) {
    if (postorder == null || inorder == null || postorder.length == 0 || inorder.length == 0) return [];

    let map = new Map();
    for (let i = 0; i < inorder.length; i++) {
        map.set(inorder[i], i);
    }

    let postIndex = postorder.length - 1;//going reverse
    function builder(inStart, inEnd) {

        if (inStart > inEnd) {
            return null;
        } else if (inStart == inEnd) {
            let node = new TreeNode(postorder[postIndex]);
            postIndex -= 1;//going reverse

            return node;
        }

        let nodeVal = postorder[postIndex];
        let nodeIndex = map.get(nodeVal);
        postIndex -= 1;//going reverse

        let node = new TreeNode(nodeVal);
        node.right = builder(nodeIndex + 1, inEnd);//here right will be filled first
        node.left = builder(inStart, nodeIndex - 1);


        return node;
    }

    return builder(0, inorder.length - 1);
};
