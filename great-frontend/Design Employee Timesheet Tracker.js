class TimesheetEntry {
  constructor(employeeId, date, hoursWorked) {
    this.employeeId = employeeId;
    this.date = date;
    this.hoursWorked = hoursWorked;
  }

  isValid() {
    return this.hoursWorked >= 0 && this.hoursWorked <= 24;
  }

  summary() {
    return `Employee: ${this.employeeId}, Date: ${this.date}, Hours: ${this.hoursWorked}`;
  }


  isOvertime() {
    return this.hoursWorked > 8;
  };

}


class TimesheetManager {
  constructor() {
    this.entries = [];
  }

  addEntry(entry) {
    if (entry.isValid()) {
      this.entries.push(entry);
    } else {
      console.warn("Invalid entry:", entry.summary());
    }
  }

  getTotalHours(employeeId, startDate, endDate) {
    return this.entries
      .filter(e => e.employeeId === employeeId && e.date >= startDate && e.date <= endDate)
      .reduce((sum, e) => sum + e.hoursWorked, 0);
  }


  getOvertimeEntries(employeeId) {
    return this.entries.filter(e => e.employeeId === employeeId && e.isOvertime());
  };


  getWeeklySummary() {
    const summary = {};

    this.entries.forEach(entry => {
      const week = getWeek(entry.date);
      const key = `${entry.employeeId}-${week}`;
      if (!summary[key]) {
        summary[key] = { total: 0, overtime: 0 };
      }
      summary[key].total += entry.hoursWorked;
      if (entry.isOvertime()) {
        summary[key].overtime += entry.hoursWorked - 8;
      }
    });

    return summary;
  }


}


function exportToCSV(entries, filename = "timesheet.csv") {
  const header = ["Employee ID", "Date", "Hours Worked", "Overtime"];
  const rows = entries.map(e => [
    e.employeeId,
    e.date,
    e.hoursWorked,
    e.isOvertime() ? "Yes" : "No"
  ]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}


function getWeek(dateStr) {
  const date = new Date(dateStr);
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDays = Math.floor((date - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
}


const manager = new TimesheetManager();

manager.addEntry(new TimesheetEntry("E001", "2025-08-01", 9));
manager.addEntry(new TimesheetEntry("E001", "2025-08-02", 7));
manager.addEntry(new TimesheetEntry("E001", "2025-08-03", 10));
manager.addEntry(new TimesheetEntry("E002", "2025-08-01", 8));

console.log("Total hours:", manager.getTotalHours("E001", "2025-08-01", "2025-08-03"));
console.log("Overtime entries:", manager.getOvertimeEntries("E001"));
console.log("Weekly summary:", manager.getWeeklySummary());

// Export to CSV
exportToCSV(manager.entries);
