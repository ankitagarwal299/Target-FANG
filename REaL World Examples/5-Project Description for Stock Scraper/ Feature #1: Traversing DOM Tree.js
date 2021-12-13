class TreeNode {
    constructor(val) {
        this.val = val;
        this.children = [];
    }
}

function traverse(root) {
    let result = [];
    if (root == null) return root;

    let queue = [root];
    while (queue.length > 0) {
        let currLevelSize = queue.length;
        let currLevel = [];

        for (let i = 0; i < currLevelSize; i++) {

            // add the node to the current level
            let currentNode = queue.shift();
            currLevel.push(currentNode.val);

            for (let i = 0; i < currentNode.children.length; i++) {
                // insert the children of current node in the queue
                queue.push(currentNode.children[i]);
            }
        }
        result.push(currLevel)
    }
    return result;
}


const root = new TreeNode("body")
root.children.push(new TreeNode("div"))
root.children.push(new TreeNode("h1"))
root.children.push(new TreeNode("div"))
root.children[0].children.push(new TreeNode("h2"))
root.children[0].children[0].children.push(new TreeNode("ul"))
root.children[0].children.push(new TreeNode("h3"))
root.children[0].children[1].children.push(new TreeNode("a"))
root.children[0].children[1].children.push(new TreeNode("p"))
root.children[0].children[1].children.push(new TreeNode("table"))
root.children[2].children.push(new TreeNode("p"))
root.children[2].children.push(new TreeNode("a"))
root.children[2].children.push(new TreeNode("p"))

var result = traverse(root);

console.log("Web nodes at each level: ");
console.log(result);

for (var i = 0; i < result.length; i++) {
    console.log(result[i])
}