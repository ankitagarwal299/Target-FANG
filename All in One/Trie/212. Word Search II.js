/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */

class Node {
    constructor(char) {
        this.children = {};
        this.end = false;
        this.value = char;
    }
}

class Trie {
    constructor() {
        this.root = new Node('*');
    }


    insert(word) {
        let curr = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (curr.children[char] == undefined) {
                curr.children[char] = new Node(char);
            }
            curr = curr.children[char];
        }
        curr.end = true;
    }
}

var findWords = function (board, words) {
    let trie = new Trie();
    let result = [];
    let visited = new Set();

    function canTravel(i, j) {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) return false;
        return true;
    }




    function dfs(i, j, curr, path) {
        if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) return;
        if (curr == undefined) return;
        if (visited.has(i + '-' + j)) return;
        //all fail conditions should be at top


        if (curr.end == true) {
            result.push(path);
            curr.end = false;//to avoid adding duplicates
        }




        visited.add(i + '-' + j);

        let nextChar = null;
        if (canTravel(i + 1, j)) {
            nextChar = board[i + 1][j];
            dfs(i + 1, j, curr.children[nextChar], path + nextChar);
        }

        if (canTravel(i - 1, j)) {
            nextChar = board[i - 1][j];
            dfs(i - 1, j, curr.children[nextChar], path + nextChar);
        }


        if (canTravel(i, j + 1)) {
            nextChar = board[i][j + 1];
            dfs(i, j + 1, curr.children[nextChar], path + nextChar);
        }

        if (canTravel(i, j - 1)) {
            nextChar = board[i][j - 1];
            dfs(i, j - 1, curr.children[nextChar], path + nextChar);
        }



        visited.delete(i + '-' + j);
    }


    for (let i = 0; i < words.length; i++) {
        trie.insert(words[i]);//insert all words
    }


    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let char = board[i][j];

            if (char in trie.root.children) {
                dfs(i, j, trie.root.children[char], char);
            }
        }
    }

    return result;
};