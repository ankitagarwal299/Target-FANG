var uniquePaths = function (m, n) {
    let dp = Array(m).fill(0).map(() => Array(n).fill(0));
    
    for (let i = 0; i < m ; i++) {
      dp[i][0] = 1;
    }
    
    for (let i = 0; i < n; i++) {
      dp[0][i] = 1;
    }
    
    for (let i = 1; i < m; i++) {
      for (let j = 1; j < n; j++) {
        //how many ways to come from above us + ways to come from left to us.
        dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
  
      }
    }
   
  console.log(dp);
    return dp[m - 1][n - 1];
  };
  
  console.log(uniquePaths(2, 3));
  