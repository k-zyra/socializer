function renderExpensesSection() {
  return `
    <section class="card expenses-card" id="expenses">
      <div class="card-header">
        <div><p class="eyebrow">BUDŻET</p><h2>Zestawienie kosztów</h2></div>
        <button class="text-btn" id="addExpenseBtn">+ Dodaj</button>
      </div>
      <div class="expense-total"><span>Łączny koszt</span><strong id="expenseTotal">0 zł</strong></div>
      <div id="expenseList" class="expense-list"></div>
      <div class="split-box">
        <div><span>Podział między</span><strong id="splitPeople">0 osób</strong></div>
        <div><span>Każdy płaci</span><strong id="splitAmount">0 zł</strong></div>
      </div>
    </section>
  `;
}

function renderExpenses(expenses) {
  $("#expenseList").innerHTML = expenses.map((expense) => `
    <div class="expense-item">
      <div><strong>${expense.name}</strong><br><small>${expense.detail}</small></div>
      <strong>${money(expense.amount)}</strong>
    </div>
  `).join("");
}
