let searchField = document.getElementById('searchField');
let listEl = document.getElementById('suggestions');
let submitBtn = document.getElementById('submitButton');


var words = ['ab', 'able', 'boot', 'book', 'bat', 'batter', 'eat', 'each', 'i like to eat cake', 'i like to eat pie', 'i like to eat pizza', 'i like to drink soda'];
let trie = new Trie();

for (let i = 0; i < words.length; i++) {
    trie.insert(words[i]);
}

searchField.addEventListener('keyup', handlerKeyUp);
function handlerKeyUp(e) {
    let searchWord = e.target.value;
    if (searchWord == null || searchWord.length == 0) return;

    let result = trie.startsWith(searchWord);
    listEl.innerHTML = "";

    for (let i = 0; i < result.length; i++) {
        listEl.innerHTML = listEl.innerHTML +
            `
            <li class="list-group-item" onclick="handleClick(this)">
                <b>${searchWord}</b>${result[i][0].substring(searchWord.length)}, ${result[i][1]}
            </li>
            `;
    }
}

function handleClick(e) {
    searchField = e.target.value;
}


submitBtn.addEventListener('click', handlerSubmit);

function handlerSubmit(e) {
    e.preventDefault();
    let str = searchField.value;
    trie.search(str);
}