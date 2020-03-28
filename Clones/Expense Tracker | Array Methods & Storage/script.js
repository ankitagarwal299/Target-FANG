const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

/* const dummyTransaction = [
  { id: 1, text: "Flower", amount: -20 },
  { id: 2, text: "Salary", amount: 300 },
  { id: 3, text: "Book", amount: -10 },
  { id: 4, text: "Camera", amount: 150 }
]; */

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));


let transactions = localStorage.getItem('transactions') !== null?localStorageTransactions:[];

//Add Transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === "" || amount.value.trim() === "") {
    alert("please add a text and amoiunt ");
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: parseInt(amount.value)
    };

    text.value = '';
    amount.value='';

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();
  }
}

//Genrate random Id
function generateID() {
  return Math.floor(Math.random() * 1000000);
}

//Add transactions to DOMLIst
function addTransactionDOM(transaction) {
  //Get th sign
  const sign = transaction.amount < 0 ? "-" : "+";
  const item = document.createElement("li");

  //Add class based on value
  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `
    ${transaction.text}
    <span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" 
    onclick="removeTransaction(${transaction.id})">x</button>
    `;

  list.appendChild(item);
}

//update the balance , income and expense
function updateValues() {
  const amount = transactions.map(transaction => transaction.amount);
  const total = amount.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const income = amount
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amount.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) * -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

//update localstorage 
function updateLocalStorage(){
    localStorage.setItem('transactions',JSON.stringify(transactions))
}

//init app
function init() {
  list.innerHTML = "";
  transactions.forEach(addTransactionDOM);

  updateValues();
}


//Remove transaction by ID
function removeTransaction(id){
    transactions = transactions.filter(item => item.id !==id);
    updateLocalStorage();
    init();
}

init();

form.addEventListener("submit", addTransaction);
