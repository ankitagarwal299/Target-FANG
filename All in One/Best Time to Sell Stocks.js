var maxProfit = function (prices) {
    if (prices == null || prices.length < 2) return 0;


    let oprofit = 0;
    /* Minimum buy and and maximum sell*/
    let minBuy = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < prices.length; i++) {

        if (prices[i] < minBuy) {
            minBuy = prices[i];
        } else {
            let currProfit = 0;
            currProfit = prices[i] - minBuy;
            if (currProfit > oprofit) {
                oprofit = currProfit;
            }
        }
    }

    return oprofit;
};
//121. Best Time to Buy and Sell Stock - One Transaction Allowed
console.log(maxProfit([7, 1, 5, 3, 6, 4]));


var maxProfit = function (prices) {
    if (prices == null || prices.length < 2) return 0;


    let oprofit = 0;
    /* Buy 1 and then sell; if sell > buy */


    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            oprofit += prices[i] - prices[i - 1];
        }
    }

    return oprofit;
};

//122. Best Time to Buy and Sell Stock II- (Infinite Transactions) Allowed
//Note: You may not engage in multiple transactions simultaneously(i.e., you must sell the stock before you buy again).
console.log(maxProfit([7, 1, 5, 3, 6, 4]));


//SECOND WAY
var maxProfit = function (prices) {
    if (prices == null || prices.length < 2) return 0;

    let oprofit = 0;
    let buyDayIndex = 0;
    let sellDayIndex = 0;

    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            sellDayIndex++;
        } else {
            //sell at this point
            oprofit += prices[sellDayIndex] - prices[buyDayIndex];

            //now after selling you can buy
            buyDayIndex = i;
            sellDayIndex = i;
        }
    }

    //last index  handle; if same then then substraction will be 0
    oprofit += prices[sellDayIndex] - prices[buyDayIndex];

    return oprofit;
};
//122. Best Time to Buy and Sell Stock II- (Infinite Transactions) Allowed
//Note: You may not engage in multiple transactions simultaneously(i.e., you must sell the stock before you buy again).
//https://www.youtube.com/watch?v=HWJ9kIPpzXs
console.log(maxProfit([7, 1, 5, 3, 6, 4]));




[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]
[1, 1, 1, 1, 1, 1, 1, 1, 1, 0]//Pmin
[0, 1, 3, 3, 4, 6, 6, 6, 9, 9]//Profit

cProfit = 0
Profit = 9

[1, 2, 4, 2, 5, 7, 2, 4, 9, 0]
[9, 9, 9, 9, 9, 9, 9, 9, 9, 0]//Pmax from backwards
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Profit

Pmax = 9
Profit = 0

[0, 1, 3, 3, 4, 6, 6, 6, 9, 9]//Profit
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//Profit



var maxProfit = function (prices) {
    if (prices == null || prices < 2) return 0;

    //print Maxprofit if sold on today's sell price,
    //by selecting min buy price from previous
    // or Max profit if sold earlier
    let minBuyPrice = prices[0];
    let dpProfit1 = new Array(prices.length).fill(0);
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] < minBuyPrice) {
            minBuyPrice = prices[i];//relax till here got min buy price
        }

        let currentProfit = prices[i] - minBuyPrice;
        dpProfit1[i] = Math.max(dpProfit1[i - 1], currentProfit);//max profit vs current profit
    }

    //print Maxprofit if bought on today's buy price, 
    //by selecting max sell price from future
    // or Max profit if sold in future
    let maxSellPrice = prices[prices.length - 1];
    let dpProfit2 = new Array(prices.length).fill(0);

    for (let i = prices.length - 2; i >= 0; i--) {
        if (prices[i] > maxSellPrice) {//prices[i] is > than any selling price ,then it can't be sold
            maxSellPrice = prices[i];
        }
        let currentProfit = maxSellPrice - prices[i];
        dpProfit2[i] = Math.max(dpProfit2[i + 1], currentProfit);//max profit vs current profit
    }
    console.log(dpProfit1, dpProfit2);

    let maxprofit = 0;
    for (let i = 0; i < prices.length; i++) {
        maxprofit = Math.max(dpProfit1[i] + dpProfit2[i], maxprofit);
    }
    return maxprofit

}
//https://www.youtube.com/watch?v=wuzTpONbd-0
//Best Time to Buy and Sell Stock III - Two Transaction Allowed (Hard) -- Learn this video fully do 20times
console.log(maxProfit([7, 1, 5, 3, 6, 4]));

[3, 3, 5, 0, 0, 3, 1, 4]
[3, 3, 3, 0, 0, 0, 0, 0]//min Buy
[0, 0, 2, 2, 2, 3, 3, 4]//profit


[3, 3, 5, 0, 0, 3, 1, 4]
[5, 5, 5, 4, 4, 4, 4, 4]//Max Sell
[4, 4, 4, 4, 4, 3, 3, 0]//profit

[0, 0, 2, 2, 2, 3, 3, 4]//profit
[4, 4, 4, 4, 4, 3, 3, 0]//profit

[4, 4, 6, 6, 6, 6, 6, 4]





var maxProfit = function (k, prices) {
    if (prices == null || prices < 2) return 0;

    /* A[k][i] end at i, should be equal to 
             max {
                   A[k-1][i],

                   max{
                       j=0 -> i-1 , A[k-1][j] + A[i] - A[j]
                   }
             }
    */

    let dp = new Array(k + 1).fill(0).map(_ => new Array(prices.length).fill(0));

    for (let t = 1; t <= k; t++) {
        for (let d = 1; d < prices.length; d++) {

            let max = dp[t][d - 1];
            for (let j = 0; j < d; j++) {

                if (dp[t - 1][j] + prices[d] - prices[j] > max) {
                    max = dp[t - 1][j] + prices[d] - prices[j];
                }
            }

            dp[t][d] = max;
        }
    }
    console.log(dp)
    return dp[k][prices.length - 1];
}
//https://www.youtube.com/watch?v=3YILP-PdEJA
//Jser https://www.youtube.com/watch?v=ryj_4Tygxy4
//188. Best Time to Buy and Sell Stock IV - K Transaction Allowed (Hard) -- Learn this video fully do 20times
console.log(maxProfit(2, [2, 4, 1]));