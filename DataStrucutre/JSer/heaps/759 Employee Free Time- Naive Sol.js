//naive solution
function employeeFreeTime(schedule) {
  let result = [];
  if (schedule == null || schedule.length < 1) return result;

  let allIntervals = [];
  for (let empIntervals of schedule) {
    allIntervals = allIntervals.concat(empIntervals);
  }

  allIntervals.sort((a, b) => a[0] - b[0]);

  for (let i = 1; i < allIntervals.length; i++) {
    if (allIntervals[i - 1][1] < allIntervals[i][0]) {
      result.push(allIntervals[i - 1][1], allIntervals[i][0]);
    } else {

    }
  }

  return result;
}

let input = [
  [[1, 3], [5, 6]],
  [[2, 3]],
  [[6, 8]]
];
console.log(employeeFreeTime(input));

input = [[[1, 3], [9, 12]], [[2, 4]], [[6, 8]]];
console.log(employeeFreeTime(input));

input = [[[1, 3]], [[2, 4]], [[3, 5], [7, 9]]];
console.log(employeeFreeTime(input));

input = [
  [[1, 3], [6, 7]],
  [[1, 3]],
  [[4, 10]],
];
console.log(employeeFreeTime(input));

input = [
  [[1, 3], [6, 7]],
  [[2, 4]],
  [[2, 5], [9, 12]],
];
console.log(employeeFreeTime(input));

