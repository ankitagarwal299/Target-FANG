class Node {
    constructor(value = null) {
        this.ranking = 0;
        this.value = value;
        this.end = false;
        this.next = {};
    }
}

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

    _search(word) {
        let current = this.root;
        let letter;

        for (let i = 0; i < word.length; i++) {
            letter = word[i];

            if (current.next[letter] == undefined) return null;

            current = current.next[letter];
        }

        return current;
    }

    isWord(word) {
        const current = this._search(word);
        return current != null && current.end;
    }

    isPrefix(word) {
        const current = this._search(word);
        return current != null;
    }


    startsWith(word) {
        const current = this._search(word);
        if (current == null) {
            return [];
        }

        let results = this._dfs(current);
        console.log(results);

        for (let i = 0; i < results.length; i++) {
            results[i] = word + results[i];
        }

        return results;
    }


    _dfs(node) {
        let results = [];

        function dfs(current, path) {
            //base case
            if (current == undefined) return;

            if (current.end) results.push(path);

            for (let key in current.next) {
                dfs(current.next[key], path + key)
            }
        }

        dfs(node, "");

        return results;
    }

    remove(word) {
        if (word == "") return;
        let current = this.root;

        let stack = [];
        let letter;

        for (let i = 0; i < word.length; i++) {
            stack.push(current);//push root node, and dont push last node
            letter = word[i];
            current = current.next[letter];

            if (current == undefined) return;
        }

        current.end = false;

        //do not delete if deleting bat also delete batter
        if (Object.keys(current.next).length) return;

        while (stack.length > 0) {
            let prevLetter = current.value;
            current = stack.pop();
            //Don not del if deleting eat will delete each
            if (Object.keys(current.next).length > 1) {
                current.next[prevLetter] = false;
            }

            delete current.next[prevLetter];
        }
    }
}

let trie = new Trie();

let words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each', 'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];

for (let i = 0; i < words.length; i++) {
    trie.insert(words[i]);
}

function pullWordFromField() {
    let query = document.getElementById('searchField').value;
    return query;
}


function getMoreOption(prefix) {
    if (prefix == "") return;
    let results = trie.startsWith(prefix);

    let list = document.getElementById('suggestions');
    list.innerHTMl = "";


    for (let i = 0; i < results; i++) {
        let elem = document.createElement("LI");
        elem.innerText = results[i];
        list.appendChild(elem);
    }
}

function displayWords() {
    getMoreOption(pullWordFromField());
}

function searchWord() {
    event.preventDefault();
    console.log("isWord", trie.isWord(pullWordFromField()));

    console.log("isPrefix", trie.isPrefix(pullWordFromField()));

    console.log("startsWith", trie.startsWith(pullWordFromField()));

    displayWords();
}


let time = setInterval(function () {
    displayWords();
}, 5000);
clearInterval(time);