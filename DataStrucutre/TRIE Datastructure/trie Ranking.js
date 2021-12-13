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

  search(query) {
    this.insert(query);
  }

  insert(word) {
    let current = this.root;
    let letter;
    for (let i = 0; i < word.length; i++) {
      letter = word[i];
      if (current.next[letter] === undefined) {
        current.next[letter] = new TrieNode(letter);
      }
      current = current.next[letter];
    }
    current.end = true;
    current.ranking++;
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
    if (current === null) { return []; }
    let results = this._traverseNode(current);
    // for (let i = 0; i < results.length; i++) {
    //   results[i][0] = word + results[i][0];
    // }
    for (let key in results) {
      results[key][0] = word + results[key][0];
    }
    return results;
  }

  getsRankedWords(prefix) {
    let options = this.startsWith(prefix);
    let sortedOptions = options.sort((a, b) => {
      return b[1] - a[1];
    })
    // for (let i = 0; i < sortedOptions.length; i++) {
    //   sortedOptions[i] = sortedOptions[i][0];
    // }
    return sortedOptions;
  }

  remove(word) {
    if (word === '') { return; }
    let current = this.root;
    let stack = [];

    for (let i = 0; i < word.length; i++) {
      stack.push(current);
      current = current.next[word[i]];
      if (current === undefined) { return; }
    }

    current.end = false;
    if (Object.keys(current.next).length > 0) { return; }

    let previousLetter;
    while (!current.end && stack.length > 0) {
      previousLetter = current.value;
      current = stack.pop();
      delete current.next[previousLetter];
    }
  }

  _search(word) {
    let current = this.root;
    let letter;
    for (let i = 0; i < word.length; i++) {
      letter = word[i];
      if (current.next[letter] === undefined) { return null; }
      current = current.next[letter];
    }
    return current;
  }

  _traverseNode(node) {
    let results = [];

    function dfs(current, path) {
      if (current === undefined) { return; }
      if (current.end) { results.push([path, current.ranking]); }
      for (let key in current.next) {
        dfs(current.next[key], path + key);
      }
    }

    dfs(node, '');
    return results;
  }
}




let trie = new Trie();

let words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each',
  'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];

for (let i = 0; i < words.length; i++) {
  trie.insert(words[i]);
}

trie.insert('i like to eat pizza');
trie.insert('i like to eat pizza');
trie.insert('i like to eat pizza');
trie.insert('i like to eat pie');
trie.insert('i like to eat pie');
trie.insert('i like to eat pie');
trie.insert('i like to eat pie');



function pullWordFromField() {
  let query = document.getElementById('searchField').value;
  //alert(query)
  return query;
}

function getPossibilities(prefix) {
  let results = trie.getsRankedWords(prefix);

  let list = document.getElementById('suggestions');
  list.innerHTML = "";
  if (prefix === "") {
    return;
  }

  for (let i = 0; i < results.length; i++) {
    let element = document.createElement("LI");
    element.innerText = results[i];
    list.append(element);
  }
}

function displayWords() {
  getPossibilities(pullWordFromField());
}

function searchWord() {
  event.preventDefault();
  trie.search(pullWordFromField());
}

setInterval(displayWords, 5000);