function shuffle(nums) {
    for (let i = nums.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [nums[j], nums[i]] = [nums[i], nums[j]];
    }

    /* for (let i = 0; i < nums.length; i++) {
        let j = i + Math.floor(Math.random() * (nums.length - i));//I am not able to understand why to add i +
        [nums[j], nums[i]] = [nums[i], nums[j]];
    } */
    return nums;
}


// let countMap = {
//   '123':0,
//   '132':0,
//   '213':0,
//   '231':0,
//   '321':0,
//   '312':0
// }

let countMap = new Map();

for (let i = 0; i < 100; i++) {
    let result = shuffle([1, 2, 3, 4]);
    //countMap[result.join('')] +=1;

    if (countMap.has(result.join(''))) {
        countMap.set(result.join(''), countMap.get(result.join('')) + 1);
    } else {
        countMap.set(result.join(''), 1)
    }
}

console.log(countMap);

