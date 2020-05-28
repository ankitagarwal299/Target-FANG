var bagOfTokensScore = function (tokens, P) {
    tokens.sort();
  let i = 0;
  let j = tokens.length - 1;
  let maxPoint = 0;
  let point = 0;

  while (i <= j) {
    if (P >= tokens[i]) {
      P = P - tokens[i++];
      point++;
      maxPoint = Math.max(maxPoint, point);
    } else if (point > 0) {
      point--;
      P += tokens[j--];
    }
  }

  return maxPoint;
};
console.log(bagOfTokensScore([100, 200, 300, 400], 200));

//https://www.youtube.com/watch?v=1GubKefOabc
