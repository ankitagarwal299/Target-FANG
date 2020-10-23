
/* Most asked question, TWO POINTER STARTEGY, EASY*/
var intervalIntersection = function (A, B) {
  if (A == null || B == null || A.length < 1 || B.length < 1) return [];

  const getIntersection = (a, b) => {
    //no intersection
    if (b[1] < a[0] || a[1] < b[0]) return null;
    return [Math.max(a[0], b[0]), Math.min(a[1], b[1])];
  }

  const result = [];
  let i = 0;
  let j = 0;

  while (i < A.length && j < B.length) {
    const a = A[i];
    const b = B[j];

    const intersection = getIntersection(a, b);

    if (intersection) result.push(intersection);

    //increment indexes
    if (a[1] < b[1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
  //[[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

};

//TEch Dose
//https://www.youtube.com/watch?v=Qh8ZjL1RpLI&t=45s

//JSer
//https://www.youtube.com/watch?v=zLSGHhE8Tug

let A = [[0, 2], [5, 10], [13, 23], [24, 25]];
let B = [[1, 5], [8, 12], [15, 24], [25, 26]]

console.log(intervalIntersection(A, B));

