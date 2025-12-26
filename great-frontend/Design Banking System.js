class BankAccount {
  constructor(accountId, ownerName, balance = 0) {
    this.accountId = accountId;
    this.ownerName = ownerName;
    this.balance = balance;
    this.transferHistory = [];
  }

  deposit(amount) {
    if (amount > 0) this.balance += amount;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.balance) {
      this.balance -= amount;
      return true;
    }
    return false;
  }

  summary() {
    return `Account: ${this.accountId}, Owner: ${this.ownerName}, Balance: \$${this.balance}`;
  }
}


class BankSystem {
  constructor() {
    this.accounts = new Map();
    this.transfers = new Map(); // paymentId -> transfer object
    this.nextPaymentId = 1;
  }

  createAccount(accountId, ownerName, initialBalance = 0) {
    if (!this.accounts.has(accountId)) {
      this.accounts.set(accountId, new BankAccount(accountId, ownerName, initialBalance));
    }
  }

  transfer(fromId, toId, amount) {
    const from = this.accounts.get(fromId);
    const to = this.accounts.get(toId);
    if (!from || !to || amount <= 0 || !from.withdraw(amount)) return null;

    to.deposit(amount);
    const paymentId = `PAY${this.nextPaymentId++}`;
    const transfer = { paymentId, fromId, toId, amount, status: "completed", date: new Date().toISOString() };
    this.transfers.set(paymentId, transfer);
    from.transferHistory.push(transfer);
    to.transferHistory.push(transfer);
    return paymentId;
  }

  scheduleTransfer(fromId, toId, amount, scheduledDate) {
    const paymentId = `PAY${this.nextPaymentId++}`;
    const transfer = {
      paymentId,
      fromId,
      toId,
      amount,
      status: "scheduled",
      scheduledDate,
      date: null
    };
    this.transfers.set(paymentId, transfer);
    return paymentId;
  }
}


BankSystem.prototype.processScheduledTransfers = function (currentDate) {
  for (const [paymentId, transfer] of this.transfers.entries()) {
    if (transfer.status === "scheduled" && transfer.scheduledDate <= currentDate) {
      const from = this.accounts.get(transfer.fromId);
      const to = this.accounts.get(transfer.toId);
      if (from && to && from.withdraw(transfer.amount)) {
        to.deposit(transfer.amount);
        transfer.status = "completed";
        transfer.date = currentDate;
        from.transferHistory.push(transfer);
        to.transferHistory.push(transfer);
      } else {
        transfer.status = "failed";
      }
    }
  }
};

BankSystem.prototype.cancelTransfer = function (paymentId) {
  const transfer = this.transfers.get(paymentId);
  if (transfer && transfer.status === "scheduled") {
    transfer.status = "cancelled";
    return true;
  }
  return false;
};

BankSystem.prototype.getTopAccountsByTransfers = function () {
  const sorted = Array.from(this.accounts.values())
    .sort((a, b) => b.transferHistory.length - a.transferHistory.length)
    .slice(0, 3);
  return sorted.map(acc => acc.accountId);
};

BankSystem.prototype.exportTransfersToCSV = function () {
  const header = ["Payment ID", "From", "To", "Amount", "Status", "Date"];
  const rows = Array.from(this.transfers.values()).map(t => [
    t.paymentId,
    t.fromId,
    t.toId,
    t.amount,
    t.status,
    t.date || t.scheduledDate
  ]);
  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "transfers.csv";
  link.click();
};


