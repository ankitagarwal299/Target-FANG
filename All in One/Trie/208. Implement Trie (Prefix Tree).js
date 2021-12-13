class Node {
    constructor(value) {
        this.children = {};
        this.value = value;
        this.end = false;
        this.ranking = 0;
    }
}

var Trie = function () {
    this.root = new Node("-");
};


Trie.prototype.insert = function (word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);

        if (curr.children[char] == undefined) {
            curr.children[char] = new Node(char);
        }
        curr = curr.children[char];
    }

    curr.end = true;//standing at last node
    curr.ranking++;
};


Trie.prototype.search = function (word) {
    let curr = this.root;

    for (let i = 0; i < word.length; i++) {
        let char = word.charAt(i);

        if (curr.children[char] == undefined) return false;
        curr = curr.children[char];
    }
    return curr.end == true;//standing at last node

};


Trie.prototype.startsWith = function (prefix) {
    let curr = this.root;
    for (let i = 0; i < prefix.length; i++) {
        let char = prefix[i];

        if (curr.children[char] == undefined) return false;
        curr = curr.children[char];
    }
    return curr != undefined;//standing at last node

};

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */