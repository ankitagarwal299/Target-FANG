class BookLoan {
  constructor(bookId, userId, loanDate, dueDate) {
    this.bookId = bookId;
    this.userId = userId;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
    this.returnedDate = null;
  }

  markReturned(date) {
    this.returnedDate = date;
  }

  isOverdue(currentDate) {
    if (this.returnedDate) return false;
    return new Date(currentDate) > new Date(this.dueDate);
  }

  summary() {
    return `Book: ${this.bookId}, User: ${this.userId}, Loaned: ${this.loanDate}, Due: ${this.dueDate}, Returned: ${this.returnedDate || "Not yet"}`;
  }

  isSeverelyOverdue(currentDate) {
    const due = new Date(this.dueDate);
    const now = new Date(currentDate);
    const diffDays = Math.floor((now - due) / (1000 * 60 * 60 * 24));
    return !this.returnedDate && diffDays > 7;
  };

}

class LibraryManager {
  constructor() {
    this.loans = [];
  }

  addLoan(loan) {
    this.loans.push(loan);
  }

  getActiveLoans() {
    return this.loans.filter(loan => !loan.returnedDate);
  }

  getOverdueCountByUser(userId, currentDate) {
    return this.loans.filter(
      loan => loan.userId === userId && loan.isOverdue(currentDate)
    ).length;
  }

  generateMonthlyReport(month) {
    const report = {};
    const topUsers = {};

    this.loans.forEach(loan => {
      const loanMonth = loan.loanDate.slice(0, 7); // YYYY-MM
      if (loanMonth === month) {
        report.total = (report.total || 0) + 1;
        if (loan.isOverdue(new Date().toISOString().split("T")[0])) {
          report.overdue = (report.overdue || 0) + 1;
        }
        topUsers[loan.userId] = (topUsers[loan.userId] || 0) + 1;
      }
    });

    const sortedUsers = Object.entries(topUsers)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    return {
      totalLoans: report.total || 0,
      overdueLoans: report.overdue || 0,
      topUsers: sortedUsers
    };
  }

  sendReminders(currentDate) {
    const overdueLoans = this.loans.filter(loan => loan.isSeverelyOverdue(currentDate));
    overdueLoans.forEach(loan => {
      console.log(`Reminder: User ${loan.userId}, please return book ${loan.bookId} (overdue since ${loan.dueDate})`);
    });
  }
}



function exportLoansToCSV(loans, filename = "library_loans.csv") {
  const header = ["Book ID", "User ID", "Loan Date", "Due Date", "Returned Date", "Overdue"];
  const rows = loans.map(loan => [
    loan.bookId,
    loan.userId,
    loan.loanDate,
    loan.dueDate,
    loan.returnedDate || "Not returned",
    loan.isOverdue(new Date().toISOString().split("T")[0]) ? "Yes" : "No"
  ]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}



const manager = new LibraryManager();

manager.addLoan(new BookLoan("B001", "U001", "2025-07-01", "2025-07-10"));
manager.addLoan(new BookLoan("B002", "U001", "2025-07-05", "2025-07-12"));
manager.addLoan(new BookLoan("B003", "U002", "2025-07-03", "2025-07-09"));

manager.loans[0].markReturned("2025-07-09");

console.log("Active Loans:", manager.getActiveLoans());
console.log("Overdue Count for U001:", manager.getOverdueCountByUser("U001", "2025-08-14"));

manager.sendReminders("2025-08-14");

const report = manager.generateMonthlyReport("2025-07");
console.log("Monthly Report:", report);

exportLoansToCSV(manager.loans);

