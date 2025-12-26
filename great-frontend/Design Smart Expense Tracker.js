class Expense {
  constructor(userId, amount, category, date) {
    this.userId = userId;
    this.amount = amount;
    this.category = category;
    this.date = date;
  }

  isValid() {
    return this.amount > 0;
  }

  summary() {
    return `User: ${this.userId}, Amount: \$${this.amount}, Category: ${this.category}, Date: ${this.date}`;
  }
}

class ExpenseManager {
  constructor() {
    this.expenses = [];
  }

  addExpense(expense) {
    if (expense.isValid()) {
      this.expenses.push(expense);
    } else {
      console.warn("Invalid expense:", expense.summary());
    }
  }

  getTotalSpending(userId, startDate, endDate) {
    return this.expenses
      .filter(e => e.userId === userId && e.date >= startDate && e.date <= endDate)
      .reduce((sum, e) => sum + e.amount, 0);
  }

  getExpensesByCategory(category) {
    return this.expenses.filter(e => e.category === category);
  }

  setBudgetLimits(limits) {
    this.budgetLimits = limits; // { category: limit }
  }

  checkOverspending() {
    const categoryTotals = {};

    this.expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });

    Object.entries(this.budgetLimits || {}).forEach(([category, limit]) => {
      if ((categoryTotals[category] || 0) > limit) {
        console.log(`⚠️ Overspending alert in category "${category}": \$${categoryTotals[category]} > \$${limit}`);
      }
    });
  };


  generateFinancialReport() {
    const report = {
      totalSpending: 0,
      categoryBreakdown: {},
      topCategories: []
    };

    this.expenses.forEach(e => {
      report.totalSpending += e.amount;
      report.categoryBreakdown[e.category] = (report.categoryBreakdown[e.category] || 0) + e.amount;
    });

    report.topCategories = Object.entries(report.categoryBreakdown)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);

    return report;
  }

}

function exportExpensesToCSV(expenses, filename = "expenses.csv") {
  const header = ["User ID", "Amount", "Category", "Date"];
  const rows = expenses.map(e => [e.userId, e.amount, e.category, e.date]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}




const manager = new ExpenseManager();

manager.addExpense(new Expense("U001", 50, "food", "2025-08-01"));
manager.addExpense(new Expense("U001", 120, "transport", "2025-08-02"));
manager.addExpense(new Expense("U001", 200, "utilities", "2025-08-03"));
manager.addExpense(new Expense("U001", 80, "food", "2025-08-04"));

manager.setBudgetLimits({ food: 100, transport: 150, utilities: 180 });

console.log("Total spending:", manager.getTotalSpending("U001", "2025-08-01", "2025-08-31"));
console.log("Expenses in 'food':", manager.getExpensesByCategory("food"));

manager.checkOverspending();

const report = manager.generateFinancialReport();
console.log("Financial Report:", report);

exportExpensesToCSV(manager.expenses);
