//https://www.youtube.com/watch?v=oGU1At1GFvc&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=29

var hammingDistance = function (x, y) {
  let result = 0;

  while (x > 0 || y > 0) {
    result = result + (x % 2) ^ y % 2;
    x >>= 1;
    y >>= 1;
  }

  return result;
};

console.log(hammingDistance(1, 4));
