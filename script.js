
const textInput = document.getElementById('text-input');
const amountInput = document.getElementById('amount-input');
const addBtn = document.getElementById('add-btn');
const transactionList = document.getElementById('transaction-list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const clear = document.getElementById('clear');
const deleteItem = document.getElementById('delete');


// Refactor iteration for items
// Add Delete button for item
//X Add Clear All
// Work on the design + animations


let data = {
  allItems: {
      inc: [],
      exp: []
  },

  totals: {
      inc:0,
      exp:0
  }
};

const proofData = getData();

function getData() {
  const transactionData = JSON.parse(localStorage.getItem('data'))
  return transactionData === null ? data : transactionData
}

function displayData(dataEl) {

  // Display updated Budget + Inc/Exp with iteration
  const totalInc = dataEl.totals.inc;
  const totalExp = dataEl.totals.exp;

  balance.textContent = `$${totalInc + totalExp}`
  income.textContent = `$${totalInc}`
  expense.textContent = `$${totalExp}`


  dataEl.allItems.inc.forEach(element => {

         // Create div element
         const transEl = document.createElement('div')

         // Add a style class to it
         transEl.classList.add('transaction-item')

         // Set style depending on transaction
             transEl.classList.add('income-item')

         // Add its html content
         transEl.innerHTML = `
             <p class="transaction-name" id="transaction-name">${element.text}</p>
             <p class="transaction-amount" id="transaction-amount">$${element.amount}</p>
         `
         // Place it inside transList div
         transactionList.appendChild(transEl);
  });

  dataEl.allItems.exp.forEach(element => {

         // Create div element
         const transEl = document.createElement('div')

         // Add a style class to it
         transEl.classList.add('transaction-item')

         // Set style depending on transaction
             transEl.classList.add('expense-item')

         // Add its html content
         transEl.innerHTML = `
             <p class="transaction-name" id="transaction-name">${element.text}</p>
             <p class="transaction-amount" id="transaction-amount">$${element.amount}</p>
         `
         // Place it inside transList div
         transactionList.appendChild(transEl);
  });

};

displayData(proofData);

const addCart = function(text, amount) {
  this.text = text,
  this.amount = amount
  // this.amount = parseInt(amount)
}

function clearAll() {

  localStorage.clear();
  // displayData(proofData);
  window.location.reload();
};

// Click events

clear.addEventListener('click', clearAll);

addBtn.addEventListener('click', addNewItem);

document.addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    addNewItem();
  }
});

// Add function
function addNewItem() {

  const text = textInput.value;
  const amount = parseInt(amountInput.value);
  const newTrans = new addCart(text, amount)

  if (text === '' || amount === '') {
      alert('Please enter a value!')
    } else {

    // Store data in the array for Items and Budget Balance
    if (amount > 0) {
      proofData.allItems.inc.push(newTrans);
      proofData.totals.inc += newTrans.amount;
    } else {
      proofData.allItems.exp.push(newTrans);
      proofData.totals.exp += newTrans.amount;
    }

    // Save it in the database
    localStorage.setItem('data', JSON.stringify(proofData));

    // Display Item

      // Create div element
      const transEl = document.createElement('div')

      // Add a style class to it
      transEl.classList.add('transaction-item')

      // Set style depending on transaction
      if (amount > 0) {
          transEl.classList.add('income-item')
      } else {
          transEl.classList.add('expense-item')
      }

      // Add its html content
      transEl.innerHTML = `
          <p class="transaction-name" id="transaction-name">${text}</p>
          <p class="transaction-amount" id="transaction-amount">$${amount}</p>
      `
      // Place it inside transList div
      transactionList.appendChild(transEl);

      // Clear input
      textInput.value = '';
      amountInput.value = '';

    // Display updated Budget + Inc/Exp
    const totalInc = proofData.totals.inc;
    const totalExp = proofData.totals.exp;

    balance.textContent = `$${totalInc + totalExp}`
    income.textContent = `$${totalInc}`
    expense.textContent = `$${totalExp}`

  }
}

