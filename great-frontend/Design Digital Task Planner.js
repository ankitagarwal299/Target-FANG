class Task {
  constructor(taskId, userId, title, dueDate, priority = "medium") {
    this.taskId = taskId;
    this.userId = userId;
    this.title = title;
    this.dueDate = dueDate;
    this.completed = false;
    this.priority = priority; // "low", "medium", "high"
  }

  markCompleted() {
    this.completed = true;
  }

  isOverdue(currentDate) {
    return !this.completed && new Date(currentDate) > new Date(this.dueDate);
  }

  summary() {
    return `Task: ${this.title}, User: ${this.userId}, Due: ${this.dueDate}, Completed: ${this.completed ? "Yes" : "No"}, Priority: ${this.priority}`;
  }
}



class TaskManager {
  constructor() {
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }

  getTasksByUser(userId) {
    return this.tasks.filter(t => t.userId === userId);
  }

  countTasks(userId) {
    const userTasks = this.getTasksByUser(userId);
    const completed = userTasks.filter(t => t.completed).length;
    const pending = userTasks.length - completed;
    return { completed, pending };
  }

  sortTasks() {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    return this.tasks.sort((a, b) => {
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }

  getUpcomingTasks(currentDate) {
    const now = new Date(currentDate);
    return this.tasks.filter(task => {
      const due = new Date(task.dueDate);
      const diffDays = (due - now) / (1000 * 60 * 60 * 24);
      return diffDays >= 0 && diffDays <= 3 && !task.completed;
    });
  }

  generateProductivityReport() {
    const report = {
      totalTasks: this.tasks.length,
      completedTasks: this.tasks.filter(t => t.completed).length,
      overdueTasks: this.tasks.filter(t => t.isOverdue(new Date().toISOString().split("T")[0])).length,
      topUsers: []
    };

    const userTaskCounts = {};
    this.tasks.forEach(t => {
      userTaskCounts[t.userId] = (userTaskCounts[t.userId] || 0) + 1;
    });

    report.topUsers = Object.entries(userTaskCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([userId]) => userId);

    report.completionRate = ((report.completedTasks / report.totalTasks) * 100).toFixed(2) + "%";

    return report;
  };
}


function exportTasksToCSV(tasks, filename = "tasks.csv") {
  const header = ["Task ID", "User ID", "Title", "Due Date", "Completed", "Priority"];
  const rows = tasks.map(t => [
    t.taskId,
    t.userId,
    t.title,
    t.dueDate,
    t.completed ? "Yes" : "No",
    t.priority
  ]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}




const manager = new TaskManager();

manager.addTask(new Task("T001", "U001", "Submit report", "2025-08-16", "high"));
manager.addTask(new Task("T002", "U001", "Team meeting", "2025-08-17", "medium"));
manager.addTask(new Task("T003", "U002", "Code review", "2025-08-14", "high"));
manager.addTask(new Task("T004", "U001", "Update docs", "2025-08-20", "low"));

manager.tasks[0].markCompleted();

console.log("Tasks for U001:", manager.getTasksByUser("U001"));
console.log("Task counts for U001:", manager.countTasks("U001"));
console.log("Upcoming tasks:", manager.getUpcomingTasks("2025-08-15"));
console.log("Sorted tasks:", manager.sortTasks());

const report = manager.generateProductivityReport();
console.log("Productivity Report:", report);

exportTasksToCSV(manager.tasks);
