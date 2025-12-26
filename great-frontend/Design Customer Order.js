const fs = require("fs");
const path = require("path");

const PRICE_LIST = {
  laptop: 1000,
  mouse: 50,
  keyboard: 80,
  monitor: 300
};

const statusOrder = {
  pending: 0,
  shipped: 1,
  delivered: 2
};

class Order {
  constructor(orderId, customerName, items) {
    this.orderId = orderId;
    this.customerName = customerName;
    this.items = items;
    this.status = "pending";
    this.discountCode = null;
  }

  updateStatus(newStatus) {
    this.status = newStatus;
  }

  applyDiscount(code) {
    this.discountCode = code === "SAVE10" ? 0.10 : 0;
  }

  calculateTotal() {
    let total = this.items.reduce((sum, item) => {
      return sum + (PRICE_LIST[item] || 0);
    }, 0);
    if (this.discountCode) {
      total -= total * this.discountCode;
    }
    return total;
  }

  summary() {
    return `
Order ID: ${this.orderId}
Customer: ${this.customerName}
Items: ${this.items.join(", ")}
Status: ${this.status}
Total: $${this.calculateTotal().toFixed(2)}
    `.trim();
  }
}

class Customer {
  constructor(name) {
    this.name = name;
    this.orders = [];
  }

  addOrder(order) {
    this.orders.push(order);
  }

  generateReport() {
    const sortedOrders = this.orders.sort((a, b) =>
      statusOrder[a.status] - statusOrder[b.status]
    );
    sortedOrders.forEach(order => {
      console.log(order.summary());
      console.log("-".repeat(40));
    });
  }
}

function exportOrderToCSV(order) {
  const csvContent = [
    ["Order ID", "Customer Name", "Items", "Status", "Total Price"],
    [
      order.orderId,
      order.customerName,
      order.items.join(", "),
      order.status,
      `$${order.calculateTotal().toFixed(2)}`
    ]
  ]
    .map(row => row.join(","))
    .join("\n");

  const filePath = path.join(__dirname, "order_summary.csv");
  fs.writeFileSync(filePath, csvContent, "utf8");
  console.log(`CSV file saved to ${filePath}`);
}

// Sample usage
const order1 = new Order("001", "Alice", ["laptop", "mouse"]);
order1.applyDiscount("SAVE10");
order1.updateStatus("shipped");

const order2 = new Order("002", "Alice", ["keyboard", "monitor"]);
order2.updateStatus("pending");

const customer = new Customer("Alice");
customer.addOrder(order1);
customer.addOrder(order2);

customer.generateReport();
exportOrderToCSV(order1);
