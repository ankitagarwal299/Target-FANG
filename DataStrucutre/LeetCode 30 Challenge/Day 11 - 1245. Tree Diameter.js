class TreeNode{
    constructor(val,left=null,right=null){
        this.val =val;
        this.left = left;
        this.right = right;
    }
}

class TreeDiameter{
    constructor(){
        this.treeDiameter = 0;
    }

    find_diameter(root){
        this.calculateHeight(root);
        return this.treeDiameter;
    }
    calculateHeight(currentNode){
        if (currentNode == null) return 0;

        const leftTreeHeight = this.calculateHeight(currentNode.left);
        const rightTreeheight = this.calculateHeight(currentNode.right);

        /* Diameter at current node equal to height of left subtree + height of right subtree + 1(for current node) */
        const diameter = leftTreeHeight + rightTreeheight + 1;

        //update global tree diameter
        this.treeDiameter = Math.max(this.treeDiameter,diameter )

        //height of the curruntNode equal max of left|| right subtree +1 for current node
        return Math.max(leftTreeHeight|| rightTreeheight) +1;

    }
}


  
  
  const treeDiameter = new TreeDiameter();
  const root = new TreeNode(1);
  root.left = new TreeNode(2);
  root.right = new TreeNode(3);
  root.left.left = new TreeNode(4);
  root.right.left = new TreeNode(5);
  root.right.right = new TreeNode(6);
  console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);
  root.left.left = null;
  root.right.left.left = new TreeNode(7);
  root.right.left.right = new TreeNode(8);
  root.right.right.left = new TreeNode(9);
  root.right.left.right.left = new TreeNode(10);
  root.right.right.left.left = new TreeNode(11);
  console.log(`Tree Diameter: ${treeDiameter.find_diameter(root)}`);

/* Tree Diameter (medium) #
Given a binary tree, find the length of its diameter. The diameter of a tree is the number of nodes on the longest path between any two leaf nodes. The diameter of a tree may or may not pass through the root.

Note: You can always assume that there are at least two leaf nodes in the given tree.

 Example 1:   
 Output: 5
 Explaination: The diameter of the tree is: [4, 2, 1, 3, 6]
 
 Example 1:   
 Output: 5
 Explaination: The diameter of the tree is: 10, 8, 5, 3, 6, 9, 11] 
 */ 