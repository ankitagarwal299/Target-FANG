class Node {
    constructor(value = null) {
        this.ranking = 0;
        this.next = {};
        this.value = value;
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }

    //insert
    insert(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            if (current.next[word[i]] == undefined) {
                current.next[word[i]] = new Node(word[i]);
            }
            current = current.next[word[i]];
        }
        current.end = true;
        current.ranking++;
    }

    //search
    search(word) {
        this.insert(word);
    }


    _search(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            if (current.next[word[i]] == undefined) return null;
            current = current.next[word[i]];
        }
        return current;
    }


    //prefix
    prefix(word) {
        let current = this._search(word);
        if (current == null) return false;
        return true;
    }

    //isWord
    isWord(word) {
        let current = this._search(word);
        if (current == null || current.end == false) return false;

        return current.end == true;
    }

    //startsWith
    startsWith(word) {
        let current = this._search(word);
        if (current == null) return [];

        let result = this._traverse(current);

        for (let i = 0; i < result.length; i++) {
            result[i][0] = word + result[i][0];
        }

        //sort by rank
        result.sort((a, b) => b[1] - a[1]);
        return result;
    }

    _traverse(current) {
        let result = [];
        function dfs(node, path) {
            if (node == undefined) return;

            if (node.end == true) {
                result.push([path, node.ranking]);//push and continue for more
            }

            for (let char in node.next) {
                dfs(node.next[char], path + char)
            }
        }

        dfs(current, '');
        return result;
    }
}



// let words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each',
//     'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];

// let trie = new Trie();

// for (let i = 0; i < words.length; i++) {
//     trie.insert(words[i]);//initial arr
// }