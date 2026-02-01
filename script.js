let expenses = [];

const nameInput = document.getElementById('name');
const amountInput = document.getElementById('amount');
const categorySelect = document.getElementById('category');
const addButton = document.getElementById('add-btn');
const expensesList = document.getElementById('expenses-list');
const noExpenses = document.getElementById('no-expenses');
const totalElement = document.getElementById('total');

function addExpense() {
    const name = nameInput.value;
    const amount = amountInput.value;
    const category = categorySelect.value;
        if (name === '' || amount === '') {
        alert('Please fill in all fields');
        return;
    }
        const expense = {
        name: name,
        amount: parseFloat(amount),
        category: category
    };
    
    expenses.push(expense);
    
    nameInput.value = '';
    amountInput.value = '';
    
    nameInput.focus();
    
    updateExpensesList();
    updateTotal();
    
    saveExpenses();
}

function updateExpensesList() {
    expensesList.innerHTML = '';
    
    if (expenses.length === 0) {
        expensesList.appendChild(noExpenses);
        return;
    }
    
    for (let i = 0; i < expenses.length; i++) {
        const expense = expenses[i];
        
        const expenseItem = document.createElement('div');
        expenseItem.className = 'expense-item';
        expenseItem.id = 'expense-' + i;
        
        expenseItem.innerHTML = `
            <div class="expense-header">
                <div class="expense-name">${expense.name}</div>
                <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
            </div>
            <div class="expense-category">Category: ${expense.category}</div>
            <button class="delete-btn" data-index="${i}">Delete</button>
        `;
        
        expensesList.appendChild(expenseItem);
    }
    
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = this.getAttribute('data-index');
            deleteExpense(index);
        });
    });
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    
    updateExpensesList();
    updateTotal();
    
    saveExpenses();
}

function updateTotal() {
    let total = 0;
        for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }
    
    totalElement.textContent = '$' + total.toFixed(2);
}

function saveExpenses() {
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function loadExpenses() {
    const savedExpenses = localStorage.getItem('expenses');
    if (savedExpenses) {
        expenses = JSON.parse(savedExpenses);
        updateExpensesList();
        updateTotal();
    }
}

window.addEventListener('DOMContentLoaded', function() {
    loadExpenses();
    
    addButton.addEventListener('click', addExpense);
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addExpense();
        }
    });
    
    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addExpense();
        }
    });
});