// Boyer-Moore Voting Algorithm

var majorityElement = function(nums) {
    // base case
    if(nums.length === 1) return [nums[0]];
    
    // create vars
    let candidate1 = null, candidate2 = null;
    let counter1 = 0, counter2 = 0;
   
    // iterate through nums, find 2 candidates
    for(let i = 0; i < nums.length; i++) {
       if(candidate1 === nums[i]){
           counter1++;
       } else if(candidate2 === nums[i]){
            counter2++;
        } else if(counter1 === 0){
            candidate1 = nums[i];
            counter1++;
        } else if(counter2 === 0){
            candidate2 = nums[i];
            counter2++;
        } else{
            // if we already have 2 candidates and counters !== 0, decrease counters
            // if one counter will === 0, we will assign a new candidate in the next iteration
            counter1--;
            counter2--;
        }        
    }
    
    // count how many times each candidate appears in the nums
    let appear1 = 0, appear2 = 0;
    let res = [];   // create arr for only 1 or 2 numbers - our candidates
    
    nums.forEach(num => {       
        if(num === candidate1) appear1++;
        if(num === candidate2) appear2++;
    })
    
    // check appear1, appear2 if they apear more than n/3 times, push a candidate into resullt array
    if(appear1 > nums.length / 3) res.push(candidate1);
    if(appear2 > nums.length / 3) res.push(candidate2);
    
    return res;
};

/* 
Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.

Note: The algorithm should run in linear time and in O(1) space.

Example 1:
Input: [3,2,3]
Output: [3]


Example 2:
Input: [1,1,1,3,3,2,2,2]
Output: [1,2]

*/