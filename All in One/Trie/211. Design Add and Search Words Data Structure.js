function Node(value) {
    this.children = {};
    this.end = false;
    this.value = value
}


var WordDictionary = function () {
    this.root = new Node("-");
};


WordDictionary.prototype.addWord = function (word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);

        if (curr.children[char] == undefined) {
            curr.children[char] = new Node(char);
        }
        curr = curr.children[char];
    }
    curr.end = true;
};


WordDictionary.prototype.search = function (word) {//b..

    // helper function to call recursively
    function preorder(currentNode, i) {

        if (i === word.length) return currentNode.end;

        const char = word[i];

        if (char === '.') {
            for (const char in currentNode.children) {
                const child = currentNode.children[char];
                if (preorder(child, i + 1)) return true;
            }

            return false;
        }
        else {

            if (!(char in currentNode.children)) return false;

            return preorder(currentNode.children[char], i + 1);//directly inserting char then it works
        }
    }

    // we call this function by starting at our root node with the index for the first letter in the string
    return preorder(this.root, 0)
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */