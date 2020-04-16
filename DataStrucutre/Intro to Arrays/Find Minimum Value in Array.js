function findMinimum(arr) {
  var minimum = Number.POSITIVE_INFINITY;

  for (let i = 0; i < arr.length; i++) {
      if (arr[i]< minimum){
          minimum = arr[i]
      }
  }

  return minimum;
}

console.log(findMinimum([9, 2, 3, 6]));
