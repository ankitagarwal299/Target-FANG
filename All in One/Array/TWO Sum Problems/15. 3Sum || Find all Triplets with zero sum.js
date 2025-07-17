
var threeSum = function (nums) {
    if (nums == null || nums.length < 3) return [];
    let target = 0;//given in question

    nums.sort((a, b) => a - b);

    let allpairs = [];

    function twoSum(left, right, target) {
        let pairs = [];

        let start = left;
        let end = right;

        while (start < end) {
            if (left != start && nums[start] == nums[start - 1]) {
                start++;
                continue;
            }
            let sum = nums[start] + nums[end];

            if (sum == target) {
                pairs.push([nums[start], nums[end]]);
                start++;
                end--;
            } else if (sum > target) {
                end--;
            } else {
                start++;
            }
        }
        return pairs;
    }

    for (let i = 0; i <= nums.length - 3; i++) {
        let curr = nums[i];

        if (i != 0 && nums[i] == nums[i - 1]) {
            // i++;//for loop will take care
            continue;
        }

        let currpairs = twoSum(i + 1, nums.length - 1, target - curr);
        for (let i = 0; i < currpairs.length; i++) {
            allpairs.push([curr, ...currpairs[i]]);
        }
    }
    return allpairs
};
//https://www.youtube.com/watch?v=1IBgYGJqKP8
//Excellent pepcoding

//https://www.callicoder.com/find-triplets-with-zero-sum/



WITHOUT SORTING USING HASH



// JavaScript program to find all triplets with zero sum using hashing
function findTriplets(arr) {
    // Set to handle duplicates and store unique triplets
    let resSet = new Set();
    let n = arr.length;

    // Map to store the sum of all pairs of elements along with their indices
    let mp = new Map();

    // Loop to store all pairs and their sums in the map
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let sum = arr[i] + arr[j]; // Calculate the sum of the current pair

            // If this sum is not already in the map, add it with an empty array
            if (!mp.has(sum)) {
                mp.set(sum, []);
            }

            // Store the pair of indices that make this sum
            mp.get(sum).push([i, j]);
        }
    }

    // Iterate through the array to find triplets
    for (let i = 0; i < n; i++) {
        // Find the remaining value needed to reach zero sum
        let rem = -arr[i];

        // Check if there are pairs with the required sum in the map
        if (mp.has(rem)) {
            let pairs = mp.get(rem);

            // Iterate through each pair that has the required sum
            for (let p of pairs) {
                // Ensure the current element is not part of the pair to avoid duplication
                if (p[0] != i && p[1] != i) {
                    // Create a sorted triplet to avoid different order duplications
                    let curr = [i, p[0], p[1]].sort((a, b) => a - b);

                    // Add the triplet to the set as a string to ensure uniqueness
                    resSet.add(curr.join(","));
                }
            }
        }
    }

    // Convert set back to array of arrays and map string elements to numbers
    return Array.from(resSet).map(triplet => 
                                    triplet.split(",").map(Number));
}

// Example call
let arr = [0, -1, 2, -3, 1];
console.log(findTriplets(arr)); 
// Output: [ [ 1, 2, 4 ], [ 0, 1, 3 ] ]

