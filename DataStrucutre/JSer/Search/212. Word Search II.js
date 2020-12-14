//outco


class Node {
    constructor(char) {
        this.char = char;
        this.end = false;
        this.children = {};
    }
}

class Trie {
    constructor() {
        this.root = new Node('');
    }

    insert(word) {
        let current = this.root;
        word = word.split('');

        for (let char of word) {
            if (!(char in current.children)) {//current[children][char]
                current.children[char] = new Node(char);
            }
            current = current.children[char];
        }
        current.end = true;
    }
}

function findWords(matrix, words) {
    if (matrix == null || words == null || matrix.length == 0 || words.length == 0) return [];
    let result = [];

    let trie = new Trie();
    for (let word of words) {
        trie.insert(word);
    }

    let visited = new Set();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let char = matrix[i][j];
            if (char in trie.root.children) {
                dfs(i, j, trie.root.children[char], char);
            }
        }
    }

    function dfs(i, j, current, build) {
        //base case
        if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[i].length)
            return;

        let key = i + '_' + j;
        //base case
        if (visited.has(key)) return;

        //base case 
        if (current == undefined) {
            return;
        }

        //base case 
        if (current.end) {
            result.push(build);
            current.end = false;
        }

        visited.add(key);

        if (isValid(i + 1, j)) {
            dfs(i + 1, j, current.children[matrix[i + 1][j]], build + matrix[i + 1][j]);

        }
        if (isValid(i - 1, j)) {
            dfs(i - 1, j, current.children[matrix[i - 1][j]], build + matrix[i - 1][j]);
        }
        if (isValid(i, j + 1)) {
            dfs(i, j + 1, current.children[matrix[i][j + 1]], build + matrix[i][j + 1]);
        }

        if (isValid(i, j - 1)) {
            dfs(i, j - 1, current.children[matrix[i][j - 1]], build + matrix[i][j - 1]);
        }


        visited.delete(key);
    }

    function isValid(i, j) {
        //check for out of bounds of matrix
        if (i < 0 || j < 0 || i >= matrix.length || j >= matrix[i].length) {
            return false;
        } else {
            return true;
        }


    }



    return result;
}

let trie = new Trie();

let board = [
    ['o', 'a', 'a', 'n'],
    ['e', 't', 'a', 'e'],
    ['i', 'h', 'k', 'r'],
    ['i', 'f', 'l', 'v']
];
console.log(findWords(board, ["oath", "pea", "eat", "rain"]));
