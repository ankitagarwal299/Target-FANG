var totalFruit = function (tree) {
  if (tree == null || tree.length == 0) return 0;

  let startIndex = 0;
  let maxLength = 0;
  let fruitFrequency = {};

  for (let endIndex = 0; endIndex < tree.length; endIndex++) {
    const rightFruit = tree[endIndex];
    if (!(rightFruit in fruitFrequency)) {
      fruitFrequency[rightFruit] = 0;
    }
    fruitFrequency[rightFruit] = fruitFrequency[rightFruit] + 1;

    //shrink the sliding window, if window > 2
    while (Object.keys(fruitFrequency).length > 2) {
      const startFruit = tree[startIndex];
      fruitFrequency[startFruit] -= 1;

      // shrink the sliding window, until we are left with '2' fruits in the fruit frequency dictionary
      if (fruitFrequency[startFruit] == 0) {
        delete fruitFrequency[startFruit];
      }
      startIndex++;//shrink the window
    }
    maxLength = Math.max(maxLength, endIndex-startIndex +1);
  }
  return maxLength;
};

console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]));
console.log(totalFruit(["A", "B", "C", "B", "B", "C"]));
