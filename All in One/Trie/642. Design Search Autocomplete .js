class Node {
    constructor(value) {
        this.children = {};
        this.ranking = 0;
        this.value = value;
        this.end = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node('*');
    }

    insert(word, times) {
        let curr = this.root;

        for (let i = 0; i < word.length; i++) {
            let char = word.charAt(i);
            if (curr.children[char] == undefined) {
                curr.children[char] = new Node(char);
            }
            curr = curr.children[char];
        }

        curr.end = true;
        if (times > 0) {
            curr.ranking = times;
        }

    }


    _search(prefix) {
        let curr = this.root;

        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (curr.children[char] == undefined) return null;
            curr = curr.children[char];
        }
        return curr;
    }

    startWith(prefix) {
        //does this prefix exists
        let currNode = this._search(prefix);
        if (currNode == null) return [];

        let result = [];

        function preorder(curr, path) {
            if (curr === null) return;
            if (curr.end == true) result.push(path);

            for (let char in curr.children) {

                if (char != undefined) {
                    preorder(curr.children[char], path + char);
                }
            }
        }
        preorder(currNode, prefix);

        return result;
    }
}
let trie = new Trie();

function autocomplete(char) {//single char at a time

    for (let i = 0; i < words.length; i++) {
        trie.insert(words[i], times[i]);
    }
}

let history = "";
function input(char) {
    if (char == "#") {
        history = "";
        return [];
    } else {
        history = history + char;
        return trie.startWith(history);;
    }
}
var words = ['i love you', 'island', 'ironman', 'i love leetcode'];
var times = [5, 3, 2, 2];
autocomplete(words);


console.log(input('i'));
console.log(input(' '));
//console.log(input('a'));
console.log(input('#'));

/*
Example:
Operation: AutocompleteSystem(["i love you", "island", "ironman", "i love leetcode"], [5, 3, 2, 2])
The system have already tracked down the following sentences and their corresponding times:
"i love you" : 5 times
"island" : 3 times
"ironman" : 2 times
"i love leetcode" : 2 times
Now, the user begins another search:

Operation: input('i')
Output: ["i love you", "island", "i love leetcode"]
Explanation:
There are four sentences that have prefix "i".Among them, "ironman" and "i love leetcode" have same hot degree.Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman".Also we only need to output top 3 hot sentences, so "ironman" will be ignored.

    Operation: input(' ')
Output: ["i love you", "i love leetcode"]
Explanation:
There are only two sentences that have prefix "i ".

    Operation: input('a')
Output: []
Explanation:
There are no sentences that have prefix "i a".

    Operation: input('#')
Output: []
Explanation:
The user finished the input, the sentence "i a" should be saved as a historical sentence in system.And the following input will be counted as a new search. */