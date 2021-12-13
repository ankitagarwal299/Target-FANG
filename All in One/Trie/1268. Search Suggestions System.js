class Node {
    constructor(val) {
        this.val = val;
        this.children = new Array(26).fill(null);
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node('*');
    }

    insert(word) {
        let curr = this.root;

        for (let i = 0; i < word.length; i++) {
            let char = word.charAt(i);

            if (curr.children[char.charCodeAt() - 'a'.charCodeAt()] == undefined) {//change here
                curr.children[char.charCodeAt() - 'a'.charCodeAt()] = new Node(char);
            }
            curr = curr.children[char.charCodeAt() - 'a'.charCodeAt()];
        }
        curr.end = true;
    }

    _search(prefix) {
        let curr = this.root;

        for (let i = 0; i < prefix.length; i++) {
            let char = prefix.charAt(i);
            if (curr.children[char.charCodeAt() - 'a'.charCodeAt()] == undefined) return null;//change here

            curr = curr.children[char.charCodeAt() - 'a'.charCodeAt()];
        }
        return curr;
    }

    search(prefix) {
        let curr = this._search(prefix);
        if (curr == null) return [];

        let result = [];
        function traverse(currNode, path) {
            if (currNode.end == true) {
                result.push(path);
            }

            for (let [index, node] of currNode.children.entries()) {//change here
                if (node != undefined) {
                    traverse(node, path + String.fromCharCode(index + 'a'.charCodeAt()));//Change here
                }

            }
        }

        traverse(curr, prefix);
        return result.sort((a, b) => a - b).slice(0, 3);
    }
}

var suggestedProducts = function (products, searchWord) {
    let trie = new Trie();

    for (let i = 0; i < products.length; i++) {
        trie.insert(products[i]);
    }

    if (searchWord == null || searchWord.length == 0) return [];

    let result = [];

    for (let i = 0; i < searchWord.length; i++) {
        result.push(trie.search(searchWord.substring(0, i + 1)));
    }




    return result;
};

//Good Questioon
//https://www.youtube.com/watch?v=PLNDfB0Vg9Y