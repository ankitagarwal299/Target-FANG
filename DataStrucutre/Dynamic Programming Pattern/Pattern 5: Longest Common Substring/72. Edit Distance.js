/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {

  //Form proper 2D array
  let dp = new Array(word1.length + 1).fill(0).map(_ => new Array(word2.length + 1).fill(0));
  
  //FILL 1st row and column

  for (let i = 0; i < dp.length; i++) {
      dp[i][0] = i;
  }

  for (let i = 0; i < dp[0].length; i++) {
      dp[0][i] = i;
  }

console.log(dp)
  for (let i = 1; i < dp.length; i++) {
      for (let j = 1; j < dp[0].length; j++) {

          if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
              dp[i][j] = dp[i - 1][j - 1];
          } else {
              dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j - 1], dp[i - 1][j]);
          }
      }
  }

  return dp[word1.length][word2.length];
  //return dp[dp.length-1][dp[0].length-1];both works
};

/*
      "" r  o  s
""  [ 0, 1, 2, 3 ],
h   [ 1, 0, 0, 0 ],
o   [ 2, 0, 0, 0 ],
r   [ 3, 0, 0, 0 ],
s   [ 4, 0, 0, 0 ],
e   [ 5, 0, 0, 0 ]
*/



var minDistance = function (word1, word2) {

  let cache = {};

  function helper(i1, i2) {
      if (i1 >= word1.length && i2 >= word2.length) return 0;

      const key = `${i1}-${i2}`

      if(key in cache) return cache[key];

      if (i1 >= word1.length) return word2.length - i2;//add from word2

      if (i2 >= word2.length) return word1.length - i1;//delete chars from word1



      if (word1[i1] == word2[i2]) {
          return cache[key] = helper(i1 + 1, i2 + 1)
      } else {
          return cache[key] = 1 + Math.min(helper(i1, i2 + 1), helper(i1 + 1, i2), helper(i1 + 1, i2 + 1));
      }
  }

  return helper(0, 0);
};