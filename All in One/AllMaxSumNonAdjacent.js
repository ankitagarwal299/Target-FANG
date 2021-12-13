//https://www.youtube.com/watch?v=VT4bZV24QNo&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=23
//maxSumNonAdjacent
var maxSumNonAdjacent = function (arr) {
    let include = new Array(arr.length).fill(0);
    let exclude = new Array(arr.length).fill(0);

    include[0] = arr[0];
    exclude[0] = 0;

    for (let i = 1; i < arr.length; i++) {
        include[i] = arr[i] + exclude[i - 1];
        exclude[i] = Math.max(include[i - 1], exclude[i - 1]);
    }
    return Math.max(include[arr.length - 1], exclude[arr.length - 1]);
};

//Optimize
var maxSumNonAdjacent = function (arr) {

    prevInclude = arr[0];
    prevExclude = 0;

    for (let i = 1; i < arr.length; i++) {
        let include = prevExclude + arr[i];
        let exclude = Math.max(prevInclude, prevExclude);

        prevExclude = exclude;
        prevInclude = include;

    }
    return Math.max(prevInclude, prevExclude);
};

console.log(maxSumNonAdjacent([5, 10, 10, 100, 5, 6]));
console.log(maxSumNonAdjacent([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));




//256	Paint HouseI
var hoousePaintI = function (arr) {
    let dp = new Array(arr.length).fill(0).map(_ => new Array(arr[0].length).fill(0));

    dp[0][0] = arr[0][0];
    dp[0][1] = arr[0][1];
    dp[0][2] = arr[0][2];

    for (let i = 1; i < dp.length; i++) {
        dp[i][0] = arr[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
        dp[i][1] = arr[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
        dp[i][2] = arr[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
    }

    console.log(dp)
    return Math.min(dp[arr.length - 1][0], dp[arr.length - 1][1], dp[arr.length - 1][2]);
};

var arr =
    [
        [1, 5, 7],
        [5, 8, 4],
        [3, 2, 9],
        [1, 2, 4]
    ]

console.log(hoousePaintI([[1, 5, 7], [5, 8, 4], [3, 2, 9], [1, 2, 4]]));






//256	Paint HouseI
var hoousePaintI = function (arr) {
    let dp = new Array(arr.length).fill(0).map(_ => new Array(arr[0].length).fill(0));

    for (let row = 1; row < dp.length; row++) {
        for (let col = 0; col < arr[0].length; col++) {

            if (row == 0) {
                //fill 1st row of the dp to paint each house cost
                dp[row][col] = arr[row][col]
            } else {

                //iterate one previous row and iterate all columns to find min cost except the selected color
                let minimum = Infinity;
                for (let j = 0; j < arr[0].length; j++) {
                    if (j != col) {
                        minimum = Math.min(dp[row - 1][j], minimum);
                    }
                }
                dp[row][col] = arr[row][col] + minimum;
            }

        }
    }
    //Last Row in dp , iterate all columns for min cost
    let overallMin = Infinity;
    for (let i = 0; i < arr[0].length; i++) {
        overallMin = Math.min(overallMin, dp[dp.length - 1][i]);
    }
    console.log(dp);
    return overallMin;
}
var arr =
    [
        [1, 5, 7],
        [5, 8, 4],
        [3, 2, 9],
        [1, 2, 4]
    ]
console.log(hoousePaintI(arr));

//OPTiMize 
var hoousePaintII = function (arr) {
    let dp = new Array(arr.length).fill(0).map(_ => new Array(arr[0].length).fill(0));

    let least = Infinity;
    let secondLeast = Infinity;

    //fill 1st row of the dp to paint each house cost
    for (let col = 0; col < arr[0].length; col++) {
        if (arr[0][col] <= least) {
            secondLeast = least;
            least = arr[0][col];
        } else if (arr[0][col] <= secondLeast) {
            secondLeast = arr[0][col];
        }
        dp[0][col] = arr[0][col];
    }

    for (let row = 1; row < dp.length; row++) {
        let nleast = Infinity;
        let sleast = Infinity;
        for (let col = 0; col < arr[0].length; col++) {
            if (least == dp[row - 1][col]) {
                dp[row][col] = secondLeast + arr[row][col];
            } else {
                dp[row][col] = least + arr[row][col];
            }


            if (dp[row][col] <= nleast) {
                sleast = nleast;
                nleast = dp[row][col];
            } else if (dp[row][col] <= sleast) {
                sleast = dp[row][col];
            }
        }
        least = nleast;
        secondLeast = sleast;

    }
    return least;
}
var arr2 = [
    [1, 5, 7, 2, 1, 4],
    [5, 8, 4, 3, 6, 1],
    [3, 2, 9, 7, 2, 3],
    [1, 2, 4, 9, 1, 7]
]

console.log(hoousePaintII(arr2));



//Question: Count binary string of length 6 which have NON-Consecutive 0's.
//Count Binary Strings | Binary Strings with no consecutive 0's
function countBinaryString(binaryLength) {
    let preZeroLength = 1;
    let prevOneLength = 1;

    for (let i = 2; i <= binaryLength; i++) {
        let nzero = prevOneLength;
        let none = prevOneLength + preZeroLength;
        preZeroLength = nzero;
        prevOneLength = none;
    }

    return preZeroLength + prevOneLength;
}
//https://www.youtube.com/watch?v=nqrXHJWMeBc&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=19

console.log(countBinaryString(5));
console.log(countBinaryString(6));



//	276	Paint Fence - Very good explanation
function paintFence(fence, k) {
    let samePaintWays = k * 1;
    let diffPaintWays = k * (k - 1);
    let totalWays = samePaintWays + diffPaintWays;

    for (let i = 3; i <= fence; i++) {
        samePaintWays = diffPaintWays;
        diffPaintWays = totalWays * (k - 1);
        totalWays = samePaintWays + diffPaintWays;

    }

    return totalWays;
}
//https://www.youtube.com/watch?v=ju8vrEAsa3Q&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=26

console.log(paintFence(8, 3));
console.log(paintFence(6, 3));
console.log(paintFence(4, 3));
console.log(paintFence(3, 3));



//Arrange Buildings Dynamic Programming
function arrangeBuilding(land) {
    let cbldg = 1;
    let cspace = 1;

    for (let i = 2; i <= land; i++) {
        let ncbldg = cspace;
        let ncspace = cbldg + cspace;

        cbldg = ncbldg;
        ncspace = ncspace;
    }
    return cbldg + cspace;
}
//https://www.youtube.com/watch?v=0nF-BMYy7tc&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=20
console.log(arrangeBuilding(5));


//198. House Robber
var rob = function (nums) {
    let include = nums[0];
    let exclude = 0;

    for (let i = 1; i < nums.length; i++) {
        let ninclude = nums[i] + exclude;
        let nexclude = Math.max(include, exclude);

        include = ninclude;
        exclude = nexclude;
    }
    return Math.max(include, exclude);

};
console.log(rob([1, 2, 3, 1]));


//213. House Robber II
var rob = function (nums) {
    if (nums.length < 4) return Math.max(...nums);

    let rob1 = maxSumNonAdjacent(0, nums.length - 2, nums);
    let rob2 = maxSumNonAdjacent(1, nums.length - 1, nums);
    console.log(rob1, rob2)
    return Math.max(rob1, rob2)
};


function maxSumNonAdjacent(start, end, nums) {
    let include = nums[start];
    let exclude = 0;

    for (let i = start + 1; i <= end; i++) {
        let nInclude = nums[i] + exclude;
        let nExclude = Math.max(include, exclude);

        include = nInclude;
        exclude = nExclude;

    }
    return Math.max(include, exclude);
}


//5240, 5241, 5287


//213. House Robber II
var rob = function (nums) {
    if (nums.length < 4) return Math.max(...nums);

    let rob1 = maxSumNonAdjacent(nums.slice(0, nums.length - 1));
    let rob2 = maxSumNonAdjacent(nums.slice(1, nums.length));
    console.log(rob1, rob2)
    return Math.max(rob1, rob2)
};


function maxSumNonAdjacent(nums) {
    let include = nums[0];
    let exclude = 0;

    for (let i = 1; i < nums.length; i++) {
        let ninclude = nums[i] + exclude;
        let nexclude = Math.max(include, exclude);

        include = ninclude;
        exclude = nexclude;
    }
    return Math.max(include, exclude);

};

console.log(rob([1, 2, 3, 1]));




//337. House Robber III --- Very easy
function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val);
    this.left = (left === undefined ? null : left);
    this.right = (right === undefined ? null : right);
}

class HousePair {
    withRobbery = 0;
    withoutRobbery = 0;
}
var rob = function (root) {

    if (root == null) return 0;


    function dfs(root) {
        if (root == null) return new HousePair();
        let left = dfs(root.left);
        let right = dfs(root.right);

        let answerPair = new HousePair();
        answerPair.withRobbery = left.withoutRobbery + root.val + right.withoutRobbery;

        answerPair.withoutRobbery = Math.max(left.withRobbery, left.withoutRobbery) + Math.max(right.withRobbery, right.withoutRobbery)
        return answerPair;
    }

    let finalResult = dfs(root);

    return Math.max(finalResult.withRobbery, finalResult.withoutRobbery);
};
//https://www.youtube.com/watch?v=kTL5LhCTL1c
console.log(robIII([3, 2, 3, null, 3, null, 1]));


//91. Decode Ways - Very Easy
var numDecodings = function (s) {
    if (s == null || s.length == 0 || s.charAt(0) == 0) return 0;

    let dp = new Array(s.length);
    dp[0] = 1;

    for (let i = 1; i < dp.length; i++) {
        //Case1: 00
        if (s.charAt(i - 1) == '0' && s.charAt(i) == '0') {
            dp[i] = 0;
        }
        //Case2: 01
        else if (s.charAt(i - 1) == '0' && s.charAt(i) != '0') {
            dp[i] = dp[i - 1];
        }
        //Case3: 20
        else if (s.charAt(i - 1) != '0' && s.charAt(i) == '0') {
            if (s.charAt(i - 1) == '1' || s.charAt(i - 1) == '2') {
                dp[i] = (i >= 2 ? dp[i - 2] : 1);
            } else {
                dp[i] = 0;
            }
        }
        //Case4: 11
        else if (s.charAt(i - 1) != '0' && s.charAt(i) != '0') {
            if (s.slice(i - 1, i + 1) <= 26) {
                dp[i] = dp[i - 1] + (i >= 2 ? dp[i - 2] : 1);
            } else {
                dp[i] = dp[i - 1];
            }
        }

    }

    return dp[s.length - 1];
};
//https://www.youtube.com/watch?v=jFZmBQ569So&list=PL-Jc9J83PIiG8fE6rj9F5a6uyQ5WPdqKy&index=22

console.log(numDecodings("231011"));
console.log(numDecodings("21123"));




//91. Decode Ways -Also print all the decoding
var numDecodings = function (s) {
    if (s == null || s.length == 0 || s.charAt(0) == 0) return "";
    let mapping = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E', '6': 'F', '7': 'G', '8': 'H', '9': 'I', '10': 'J', '11': 'K', '12': 'L', '13': 'M', '14': 'N', '15': 'O', '16': 'P', '17': 'Q', '18': 'R', '19': 'S', '20': 'T', '21': 'U', '22': 'V', '23': 'W', '24': 'X', '25': 'Y', '26': 'Z', }
    printEncoding(s, "", mapping);

};

function printEncoding(str, asf, mapping) {
    if (str.length == 0) {
        console.log(asf);
        return;
    } else if (str.length == 1) {
        let char = str.charAt(0);
        let ros = str.substring(1);//check rest of string char
        if (char == '0') {
            return;
        } else {
            //asf = asf + mapping[char];
            //console.log(asf);
            printEncoding(ros, asf + mapping[char], mapping);
        }
        // return;
    } else {
        //2 or more char
        let char = str.charAt(0);//check 1st char
        let ros = str.substring(1);//check rest of string char

        if (char == '0') {
            return;
        } else {
            //asf = asf + mapping[char];
            printEncoding(ros, asf + mapping[char], mapping);
        }


        //Check 2 digits together
        let char12 = str.substring(0, 2);//check 2 chars
        let ros12 = str.substring(2);//check rest of string char
        if (char12 <= '26') {
            //asf = asf + mapping[char12];
            printEncoding(ros12, asf + mapping[char12], mapping);
        }

    }

}




//https://www.youtube.com/watch?v=2ClSccwnq1Y&list=PL-Jc9J83PIiFxaBahjslhBD1LiJAV7nKs&index=47
//console.log(numDecodings("261"));

console.log(numDecodings("231011"));
console.log(numDecodings("21123"));
console.log(numDecodings("01123"));
console.log(numDecodings("123"));