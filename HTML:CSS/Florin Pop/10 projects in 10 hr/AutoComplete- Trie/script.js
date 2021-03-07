var words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each', 'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];
let trie = new Trie();

for (let i = 0; i < words.length; i++) {
    trie.insert(words[i]);
}

let textBox = document.getElementById('searchField');
let listEl = document.getElementById('suggestions');

textBox.addEventListener('keyup', handler);

function handler(e) {
    let str = e.target.value;
    let results = trie.startsWith(str);

    listEl.innerHTML = "";

    for (let prediction of results) {
        listEl.innerHTML +=
            `
       <li class="list-group-item" onclick="handleClick(this)">
                <b>${str}</b>${prediction.substring(str.length)}
       </li>
        `;
    }
}

function handleClick(e) {
    textBox.value = e.textContent.trim();
}

//handler({ target: { value: "" } });

