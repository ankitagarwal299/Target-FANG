//DIY:1231  Divide Chocolate

function chocolateDistribute() {

}
console.log(chocolateDistribute());



//-------------------------------Chocolate Distribution | GFG Solution | Searching and Sorting | Variation1---------------------
/*

 The task is to distribute chocolate packets such that:
    Each student gets EXACTLY ONE packet.
    The difference between maximum number of chocolates given to a student and minimum number of chocolates given to a student is minimum.
*/

//https://www.youtube.com/watch?v=50nn3bA1BT4
function findMinDifference(choclatePacketArr, students) {
    let result = Infinity;

    //sort
    choclatePacketArr.sort((a, b) => a - b);//[1,3,4,7,9,9,12,56]

    for (let i = 0; i <= choclatePacketArr.length - students; i++) {
        let minWin = choclatePacketArr[i];
        let maxWind = choclatePacketArr[i + students - 1];
        let gap = maxWind - minWin;

        if (gap < result) {
            //result = [gap, i, i + students - 1];
            result = gap;
        }
    }
    return result;
}

console.log(findMinDifference([3, 4, 1, 9, 56, 7, 9, 12], 5));//gap =6, i = 1, j=5


//-------------------------------Allocate Minimum Number of Pages | GFG Solution | Variation2---------------------
/*
    Every student is assigned to read some consecutive books
    The task is to assign books in such a way that the maximum number of pages assigned to a student is minimum.
    (means Student who is reading more page in all subsets should be minimum )

Example:
    Input : pages[] = {12, 34, 67, 90}
        m = 2
Output : 113
Explanation:
    There are 2 number of students. Books can be distributed
    in following fashion :
    1) [12] and [34, 67, 90]
        Max number of pages is allocated to student
        2 with 34 + 67 + 90 = 191 pages
    2) [12, 34] and [67, 90]
        Max number of pages is allocated to student
        2 with 67 + 90 = 157 pages
    3) [12, 34, 67] and [90]
        Max number of pages is allocated to student
        1 with 12 + 34 + 67 = 113 pages

    Of the 3 cases, Option 3 has the minimum pages = 113.
 */

function reduceLoadOnMaxReadingPages(pages, m) {
    if (m > pages.length) return -1; //if no. of  books is less than no. of students

    let maxSum = pages.reduce((previousValue, currentValues) => previousValue + currentValues);
    let maxPage = pages.reduce((previousValue, currentValues) => Math.max(previousValue, currentValues));

    //range set
    let low = maxPage;
    let high = maxSum;
    let ans = 0;

    while (low < high) {
        let mid = Math.floor(low + (high - low) / 2);//save from overloading low+high can be larger value

        /* Find the minimum no.pages/load/mid where we need more than M students , breaking point*/
        if (isPossible(pages, mid, m) == true) {//if trues then yes it is possible
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;//the maximum number of pages assigned to a student is minimum with m students

}


function isPossible(arr, mid, m) {
    // Count how many students are required to distribute curr_min pages (mid)

    let students = 1;
    let sum = 0;

    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];

        if (sum > mid) {
            students++;
            sum = arr[i];
        }
    }
    return students <= m;
    // if students required becomes greater
    // than given no. of students,return false
}

////https://www.youtube.com/watch?v=okP-e2VpI_g
//https://www.geeksforgeeks.org/allocate-minimum-number-pages/
console.log(reduceLoadOnMaxReadingPages([12, 34, 67, 90], 2));






//-------------------------------410. Split Array Largest Sum |  Searching and Sorting | Variation2---------------------

//410  Split Array Largest Sum  
var splitArray = function (nums, m) {
    if (m > nums.length) return -1; //if no. of split is greate than no. of subarr

    let sum = nums.reduce((prevValue, currValue) => prevValue + currValue);
    let max = nums.reduce((prevValue, currValue) => Math.max(prevValue, currValue));

    if (m == nums.length) return max;

    let low = max;
    let high = sum;
    let ans = 0;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (isPossible(nums, mid, m) === true) {
            ans = mid;
            high = mid - 1;

        } else {
            low = mid + 1;
        }
    }
    return ans;
};

function isPossible(arr, mid, m) {

    let sum = 0;
    let subArrCount = 1;


    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        if (sum > mid) {
            subArrCount += 1;
            sum = arr[i];
        }

    }

    return subArrCount <= m;
}


//Write an algorithm to minimize the largest sum among these m subarrays(continuous).
console.log(splitArray([1, 2, 3, 4, 5], 2));
//https://www.youtube.com/watch?v=eq6dAJefOqc





//-------------------------------1011 Capacity To Ship Packages Within D Days |  Searching and Sorting | Variation2---------------------

var shipWithinDays = function (weights, days) {
    if (days > weights.length) return -1; //if no. of split is greate than no. of subarr

    let sum = weights.reduce((prevValue, currValue) => prevValue + currValue);
    let max = weights.reduce((prevValue, currValue) => Math.max(prevValue, currValue));

    if (days == weights.length) return max;

    let low = max;
    let high = sum;
    let ans = 0;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (isPossible(weights, mid, days) === true) {
            ans = mid;
            high = mid - 1;

        } else {
            low = mid + 1;
        }
    }
    return ans;
};

function isPossible(arr, mid, m) {

    let sum = 0;
    let subArrCount = 1;


    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        if (sum > mid) {
            subArrCount += 1;
            sum = arr[i];
        }

    }

    return subArrCount <= m;
}


//https://www.youtube.com/watch?v=1w4-rZhP7BM&list=PL-Jc9J83PIiHhXKonZxk7gbEWsmSYP5kq&index=26
console.log(shipWithinDays());









//-------------------------------1231  Divide Chocolate |  Searching and Sorting | Variation 3---------------------
function maximizeSweetness(sweetness, k) {
    let friends = k + 1;

    // write your code here
    if (k > sweetness.length) return -1; //if no. of split is greate than no. of subarr

    let sum = sweetness.reduce((prevValue, currValue) => prevValue + currValue);


    if (k == sweetness.length) return min;

    let low = 1;
    let high = Math.floor(sum / friends);
    let ans = 0;

    while (low < high) {
        let mid = Math.floor((low + high + 1) / 2);

        if (canSplit(sweetness, mid, friends) === true) {
            ans = mid;
            low = mid;

        } else {
            high = mid - 1;
        }
    }
    return ans;

}

function canSplit(arr, mid, friends) {

    let sum = 0;
    let chunks = 0;


    for (let i = 0; i < arr.length; i++) {
        sum = sum + arr[i];
        if (sum >= mid) {
            chunks += 1;
            sum = 0;
        }

    }

    return chunks >= friends;
}
//https://www.youtube.com/watch?v=Ppy9lvyMnuc
console.log(divideChocolate());



//-------------------------------875. Koko Eating Bananas |  Searching and Sorting | Variation 4---------------------

//https://www.youtube.com/watch?v=LzZFUTWE55c&list=PL-Jc9J83PIiHhXKonZxk7gbEWsmSYP5kq&index=20
/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
    let low = 0;
    let high = piles.reduce((a, b) => Math.max(a, b));
    let speed = Number.MAX_SAFE_INTEGER;

    while (low <= high) {
        let mid = Math.floor(low + (high - low) / 2);

        if (isPossible(piles, h, mid) == true) {
            speed = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }

    return speed;
};

function isPossible(piles, hours, speed) {
    let time = 0;

    for (let i = 0; i < piles.length; i++) {
        time = time + Math.ceil(piles[i] / speed);
    }

    return time <= hours;
}




/*
Several users made a number of Facebook posts every day last month.
We have stored the number of daily posts in an array. We want to mine these posts for information.
We have k worker nodes to process the data. For optimally exploiting the temporal relationship between the posts, each worker node must process posts from one or more consecutive days.
There will be a master node among our k worker nodes.
This node will be in charge of distributing posts to other nodes, as well as mining the posts itself.

Given an allocation of tasks to workers and the master node, the master node should get the smallest task.
To efficiently utilize our resources, we want an allocation of tasks that maximizes the task allocation to the master node,
so we have optimal utilization of worker nodes processing power.
There can be a lot of posts a day, so input posts for each day would be in thousands.
 */



