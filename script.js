// Expense Tracker UI
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const listContainer = document.getElementById('list');
const addBtn = document.getElementById('add-btn');

// Popup
const textUpdate = document.getElementById('text-update');
const amountUpdate = document.getElementById('amount-update');
const btnGoBack = document.getElementById('btn-go-back');
const editPopupBtn = document.getElementById('edit-popup-btn');
const popup = document.getElementById('popup');


// Add percentage
// Add update
// Add more design + animations

// let transactions = [
//   { text: 'cereal', amount: 400, id: 30 },
//   { text: 'home', amount: -1400, id: 35 },
//   { text: 'salary', amount: 3400, id: 3 }
// ]

let transactions = getData()

function init() {
  clearDOM();
  clearDataSet();
  updateValues();
  transactionsDOM(transactions);

}

init();

function transactionsDOM(transactions) {
  transactions.forEach(transaction => addToDOM(transaction));
}

function clearDataSet() {
  localStorage.clear();
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

function clearDOM() {
  listContainer.innerHTML = '';
  text.innerHTML = '';
  amount.innerHTML = '';
}

function getData() {
  const transData = JSON.parse(localStorage.getItem('transactions'));
  return transData === null ? [] : transData;
};

function getRandomId() {
  return Math.floor(Math.random() * 1000000);
};

function addTransaction(e) {

e.preventDefault();
// Create the instance
  const transaction = {
    text: text.value,
    amount: parseInt(amount.value),
    id: getRandomId()
  };

// Push the instance to the transactions array
  transactions.push(transaction)

// Add the transaction to the DOM
addToDOM(transaction);
// Update the values on top for total/inc/exp
updateValues();
// Save to local storage
localStorage.setItem('transactions', JSON.stringify(transactions));
// Reset input
text.innerHTML = '';
amount.innerHTML = '';

}

function updateValues() {

  // Compute balance, income and expense
  const amountArr = transactions.map(transaction => transaction.amount);
  const total = amountArr.reduce((acc, cur) => acc += cur, 0).toFixed(2);

  const inc = transactions
    .filter(transaction => transaction.amount > 0)
    .map(transaction => transaction.amount)
    .reduce((acc, cur) => acc += cur, 0)
    .toFixed(2);

    const exp = transactions
      .filter(transaction => transaction.amount < 0)
      .map(transaction => transaction.amount)
      .reduce((acc, cur) => acc += cur, 0)
      .toFixed(2);

  // Render balance, inc and exp in DOM
  balance.innerHTML = `$${total}`
  income.innerHTML = `$${inc}`
  expense.innerHTML = `$${exp}`

};

function addToDOM(transaction) {

  const type = transaction.amount > 0 ? 'inc' : 'exp'

  // Create div
  const newEl = document.createElement('div')

  // Add inc or exp class to div
  newEl.classList.add(type)
  // Add the inner HTML content
  newEl.innerHTML = `
    <p>${transaction.text}</p>
    <p>$${transaction.amount}</p>
    <button class="btn-delete" onclick="removeTransaction(${transaction.id})">x</button>
    <button class="btn-edit" onclick="addPopup(${transaction.id})">Edit</button>
  `
  // Append element to the parent div
  listContainer.appendChild(newEl)

};

function removeTransaction(id) {

  // Remove it from transactions with filter function for ID
  transactions = transactions.filter(transaction => transaction.id !== id)
  // Refresh data + DOM with init
  init();
};


// POPUP

function addPopup(id){

  // Make popup appear
  popup.classList.toggle('hidden');
  popup.setAttribute("data-id", `${id}`)

  // Select transaction from dataset
  const transaction = transactions.filter(transaction => transaction.id === id)

  // Create popup with new text, amount input and update button
  textUpdate.value = `${transaction[0].text}`;
  textUpdate.focus();
  // textUpdate.value = transaction.text;
  amountUpdate.value = `${transaction[0].amount}`;

  };

function editTransaction(e){

  // Retrieve ID from DOM
  const retrieveID = parseInt(popup.dataset.id);

  //Find the right transaction with id and update it
  findTransaction(retrieveID)[0].text = textUpdate.value;
  findTransaction(retrieveID)[0].amount = parseInt(amountUpdate.value);

  // Refresh Data Set
  init();

};

function findTransaction(id){
  return transactions.filter(transaction => transaction.id === id)
};


// Event Listeners

addBtn.addEventListener('click', addTransaction);
editPopupBtn.addEventListener('click', editTransaction)
btnGoBack.addEventListener('click', () => popup.classList.toggle('hidden'));













