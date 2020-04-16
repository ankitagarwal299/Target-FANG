function findSecondMaximum(arr) {
  var max = Number.NEGATIVE_INFINITY;
  var second = Number.NEGATIVE_INFINITY;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > max) {
      second = max;
      max = arr[i];
    } else if (arr[i] > second && arr[i] != max) {
      second = arr[i];
    }
  }

  return secondmax;
}

console.log(findSecondMaximum([9, 2, 3, 6]));
