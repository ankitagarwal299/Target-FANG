class Trie {
    constructor() {
        this.root = new Node();
    }

    insert(word) {
        let current = this.root;
        let letter;
        for (let i = 0; i < word.length; i++) {
            letter = word[i];
            if (current.next[letter] == undefined) {
                current.next[letter] = new Node(letter);
            }
            current = current.next[letter];
        }

        current.end = true;
    }

    search(word) {
        let current = this.root;
        let i = 0;
        while (i < word.length) {
            let letter = word[i];
            if (current.next[letter] == undefined) {
                return null;
            }
            current = current.next[letter];
            i++;
        }
        return current;
    }

    startsWith(word) {
        let current = this.search(word);
        if (current == null) return [];

        let results = this.traverseNode(current);

        return results.map((str) => {
            return word + str;
        });
    }

    traverseNode(node) {
        let results = [];

        function dfs(current, path) {
            if (current == undefined) return;
            if (current.end) results.push(path);

            for (let key in current.next) {
                dfs(current.next[key], path + key);
            }
        }
        dfs(node, '');

        return results;
    }
}
class Node {
    constructor(values = '\0') {
        this.value = values;
        this.next = {};
        this.end = false;
    }
}


