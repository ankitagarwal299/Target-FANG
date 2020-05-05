//https://www.youtube.com/watch?v=TI3e-17YAlc

var maxArea = function (heights) {
  let i = 0;
  let j = heights.length - 1;

  let maxArea = Number.MIN_SAFE_INTEGER;

  while (i < j) {
      let minHeight = Math.min(heights[i], heights[j]);
      //calculate max area = Length * breadth
      maxArea = Math.max(max, minHeight * (j-i));
  }

  //we above calculate maxarea with minheigh, now next height
  if (heights[i] < heights[j]){
      i++;
  }else{
      j--;
  }

  return maxArea;
};

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7]));
