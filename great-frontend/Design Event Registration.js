class EventRegistration {
  constructor(eventId, userId, registrationDate) {
    this.eventId = eventId;
    this.userId = userId;
    this.registrationDate = registrationDate;
    this.attended = false;
  }

  markAttended() {
    this.attended = true;
  }

  summary() {
    return `Event: ${this.eventId}, User: ${this.userId}, Registered: ${this.registrationDate}, Attended: ${this.attended ? "Yes" : "No"}`;
  }
}


class EventManager {
  constructor() {
    this.registrations = [];
  }

  addRegistration(reg) {
    this.registrations.push(reg);
  }

  getAttendees(eventId) {
    return this.registrations.filter(r => r.eventId === eventId && r.attended);
  }

  getNoShows = function (eventId) {
    return this.registrations.filter(r => r.eventId === eventId && !r.attended);
  }

  getRegistrationCount(eventId) {
    return this.registrations.filter(r => r.eventId === eventId).length;
  }

  isDuplicate(eventId, userId) {
    return this.registrations.some(r => r.eventId === eventId && r.userId === userId);
  }

  addRegistrationSafe(reg) {
    if (!this.isDuplicate(reg.eventId, reg.userId)) {
      this.addRegistration(reg);
    } else {
      console.warn(`Duplicate registration for user ${reg.userId} in event ${reg.eventId}`);
    }
  }

  getFrequentAttendees() {
    const attendanceMap = {};

    this.registrations.forEach(r => {
      if (r.attended) {
        attendanceMap[r.userId] = (attendanceMap[r.userId] || 0) + 1;
      }
    });

    return Object.entries(attendanceMap)
      .filter(([_, count]) => count >= 3)
      .map(([userId]) => userId);
  }

  generateEventReport() {
    const report = {};
    const eventStats = {};

    this.registrations.forEach(r => {
      if (!eventStats[r.eventId]) {
        eventStats[r.eventId] = { total: 0, attended: 0 };
      }
      eventStats[r.eventId].total += 1;
      if (r.attended) {
        eventStats[r.eventId].attended += 1;
      }
    });

    Object.entries(eventStats).forEach(([eventId, stats]) => {
      const attendanceRate = (stats.attended / stats.total) * 100;
      const noShowRate = 100 - attendanceRate;
      report[eventId] = {
        totalRegistrations: stats.total,
        attendanceRate: attendanceRate.toFixed(2) + "%",
        noShowRate: noShowRate.toFixed(2) + "%"
      };
    });

    const topEvents = Object.entries(eventStats)
      .sort((a, b) => b[1].attended - a[1].attended)
      .slice(0, 3)
      .map(([eventId]) => eventId);

    return { report, topEvents };
  }
}


function exportRegistrationsToCSV(registrations, filename = "event_registrations.csv") {
  const header = ["Event ID", "User ID", "Registration Date", "Attended"];
  const rows = registrations.map(r => [
    r.eventId,
    r.userId,
    r.registrationDate,
    r.attended ? "Yes" : "No"
  ]);

  const csvContent = [header, ...rows].map(row => row.join(",")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}

const manager = new EventManager();

manager.addRegistrationSafe(new EventRegistration("EVT001", "USR001", "2025-08-01"));
manager.addRegistrationSafe(new EventRegistration("EVT001", "USR002", "2025-08-01"));
manager.addRegistrationSafe(new EventRegistration("EVT002", "USR001", "2025-08-02"));
manager.addRegistrationSafe(new EventRegistration("EVT003", "USR001", "2025-08-03"));

manager.registrations[0].markAttended();
manager.registrations[2].markAttended();
manager.registrations[3].markAttended();

console.log("Attendees for EVT001:", manager.getAttendees("EVT001"));
console.log("No-shows for EVT001:", manager.getNoShows("EVT001"));
console.log("Frequent attendees:", manager.getFrequentAttendees());

const report = manager.generateEventReport();
console.log("Event Report:", report);

exportRegistrationsToCSV(manager.registrations);
