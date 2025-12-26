class Enrollment {
  constructor(courseId, userId, enrollmentDate, progress = 0) {
    this.courseId = courseId;
    this.userId = userId;
    this.enrollmentDate = enrollmentDate;
    this.progress = progress; // 0 to 100
    this.lastUpdated = enrollmentDate;
  }

  updateProgress(newProgress, updateDate) {
    if (newProgress >= 0 && newProgress <= 100) {
      this.progress = newProgress;
      this.lastUpdated = updateDate;
    } else {
      console.warn("Invalid progress value");
    }
  }

  summary() {
    return `Course: ${this.courseId}, User: ${this.userId}, Progress: ${this.progress}%, Last Updated: ${this.lastUpdated}`;
  }
}


class CourseManager {
  constructor() {
    this.enrollments = [];
  }

  addEnrollment(enrollment) {
    this.enrollments.push(enrollment);
  }

  getUsersInCourse(courseId) {
    return this.enrollments
      .filter(e => e.courseId === courseId)
      .map(e => e.userId);
  }

  getAverageProgress(courseId) {
    const courseEnrollments = this.enrollments.filter(e => e.courseId === courseId);
    if (courseEnrollments.length === 0) return 0;
    const total = courseEnrollments.reduce((sum, e) => sum + e.progress, 0);
    return total / courseEnrollments.length;
  }

  isDuplicate(courseId, userId) {
    return this.enrollments.some(e => e.courseId === courseId && e.userId === userId);
  }

  addEnrollmentSafe(enrollment) {
    if (!this.isDuplicate(enrollment.courseId, enrollment.userId)) {
      this.addEnrollment(enrollment);
    } else {
      console.warn(`Duplicate enrollment for user ${enrollment.userId} in course ${enrollment.courseId}`);
    }
  }


  getCompletedUsers(courseId) {
    return this.enrollments
      .filter(e => e.courseId === courseId && e.progress === 100)
      .map(e => e.userId);
  }


  getInactiveUsers(currentDate) {
    const now = new Date(currentDate);
    return this.enrollments
      .filter(e => {
        const last = new Date(e.lastUpdated);
        const diffDays = (now - last) / (1000 * 60 * 60 * 24);
        return diffDays > 30 && e.progress < 100;
      })
      .map(e => e.userId);
  }


  generateCourseReport() {
    const report = {};
    const courseStats = {};

    this.enrollments.forEach(e => {
      if (!courseStats[e.courseId]) {
        courseStats[e.courseId] = { total: 0, completed: 0, progressSum: 0 };
      }
      courseStats[e.courseId].total += 1;
      courseStats[e.courseId].progressSum += e.progress;
      if (e.progress === 100) {
        courseStats[e.courseId].completed += 1;
      }
    });

    Object.entries(courseStats).forEach(([courseId, stats]) => {
      const completionRate = (stats.completed / stats.total) * 100;
      const avgProgress = stats.progressSum / stats.total;
      report[courseId] = {
        totalEnrollments: stats.total,
        completionRate: completionRate.toFixed(2) + "%",
        averageProgress: avgProgress.toFixed(2) + "%"
      };
    });

    const topCourses = Object.entries(courseStats)
      .sort((a, b) => b[1].progressSum / b[1].total - a[1].progressSum / a[1].total)
      .slice(0, 3)
      .map(([courseId]) => courseId);

    return { report, topCourses };
  }
}


function exportEnrollmentsToCSV(enrollments, filename = "course_enrollments.csv") {
  const header = ["Course ID", "User ID", "Enrollment Date", "Progress", "Last Updated"];
  const rows = enrollments.map(e => [
    e.courseId,
    e.userId,
    e.enrollmentDate,
    `${e.progress}%`,
    e.lastUpdated
  ]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

const manager = new CourseManager();

manager.addEnrollmentSafe(new Enrollment("C001", "U001", "2025-07-01", 20));
manager.addEnrollmentSafe(new Enrollment("C001", "U002", "2025-07-02", 100));
manager.addEnrollmentSafe(new Enrollment("C002", "U001", "2025-07-03", 50));
manager.addEnrollmentSafe(new Enrollment("C003", "U001", "2025-06-01", 0));

manager.enrollments[0].updateProgress(80, "2025-08-01");

console.log("Users in C001:", manager.getUsersInCourse("C001"));
console.log("Completed users in C001:", manager.getCompletedUsers("C001"));
console.log("Inactive users:", manager.getInactiveUsers("2025-08-14"));

const report = manager.generateCourseReport();
console.log("Course Report:", report);

exportEnrollmentsToCSV(manager.enrollments);