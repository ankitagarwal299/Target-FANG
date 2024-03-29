class TrieNode {
  constructor(value = null) {
    this.ranking = 0;
    this.value = value;
    this.next = {};
    this.end = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let current = this.root;
    let letter;

    for (let i = 0; i < word.length; i++) {
      letter = word[i];
      if (current.next[letter] == undefined) {
        current.next[letter] = new TrieNode(letter);
      }
      current = current.next[letter];
    }
    current.end = true;
  }

  _search(words) {
    let current = this.root;
    let letter;

    for (let i = 0; i < words.length; i++) {
      letter = words[i];
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
    if (current === null) {
      return [];
    }
    let results = this._traverseNode(current);
    /* for (let i = 0; i < results.length; i++) {
        results[i] = word + results[i];
      } */
    for (let key in results) {
      results[key] = word + results[key];
    }
    return results;
  }

  _traverseNode(node) {
    let results = [];

    function dfs(current, path) {
      if (current === undefined) {
        return;
      }
      if (current.end) {
        results.push(path);
      }
      for (let key in current.next) {
        dfs(current.next[key], path + key);
      }
    }

    dfs(node, "");
    return results;
  }

  remove(word) {
    if (word == "") return;
    let current = this.root;
    let stack = [];

    for (let i = 0; i < word.length; i++) {
      stack.push(current);
      current = current.next[word[i]];
      if (current == undefined) return;
    }

    current.end = false;
    //Do not delete if deleting bat also delete batter.
    if (Object.keys(current.next).length > 0) return;

    while (stack.length > 0) {
      let previousLetter = current.value;
      current = stack.pop();

      //Don not del if deleting eat will delete each
      /* if (Object.keys(current.next).length > 1) {//code commented by ankit
        current.next[previousLetter].end = false;
        return;
      } */

      if (Object.keys(current.next).length) {
        return;
      }

      delete current.next[previousLetter];

    }
  }
}

let trie = new Trie();

let words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each',
  'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];

for (let i = 0; i < words.length; i++) {
  trie.insert(words[i]);
}

console.log(trie.startsWith("b"));
