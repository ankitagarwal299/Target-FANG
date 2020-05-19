//HashMap Solution: O(n) , space O(1)
function intersect(nums1, nums2) {
    let map = new Map();
    for (let num of nums1) {
      if (!map.has(num)) map.set(num, 1);
    }
  
    //filter 
    return nums2.filter((n) => {
      if (map.has(n)) {
        map.delete(n);
        return true;
      } else return false;
    });
  }

  function intersect(nums1, nums2) {
    let result=[];
    let map = new Map();
    for (let num of nums1) {
      if (!map.has(num)) map.set(num, 1);
    }
  
    for (let n of nums2) {
      if (map.has(n)) {
        map.delete(n);
        result.push(n);
      }
    }
    
    return result;
  }
  
  console.log(intersect([1, 2, 2, 1], [2, 2]));
  console.log(intersect([1, 2, 2, 1], [2, 1]));
  
  
  //reference: https://leetcode.com/problems/intersection-of-two-arrays/discuss/285818/javascript-solutions%3A-brute-force-hashmap-set
  
  
  
  //Solutions using Set - : Solution 1: O(n)
  function intersect(nums1, nums2) {
    let set = new Set(nums1);
    let set2 = new Set();
  
    for (let i = 0; i < nums2.length; i++) {
      if (set.has(nums2[i])) {
        set2.add(nums2[i]);
      }
    }
  
    return Array.from(set2); //convert set,map into array
  }
  
  console.log(intersect([1, 2, 2, 1], [2, 2, 2, 2, 2, 1]));
  
  //Solutions using Set -: Solution 1: O(n)
  
  function intersect(nums1, nums2) {
    let result = [];
    let setNum1 = new Set(nums1);
    let setNum2 = new Set(nums2);
  
    let [smallSet, largeSet] =
      setNum1.length < setNum2.length ? [setNum1, setNum2] : [setNum2, setNum1];
  
    smallSet.forEach((num) => {
      largeSet.has(num) && result.push(num);
    });
  
    return result;
  }
  
  
  
  //Brute Force Solution: O(n logn)
  
  function intersect(nums1, nums2) {
    let sortedNums1 = nums1.sort((a, b) => a - b);
    let sortedNums2 = nums2.sort((a, b) => a - b);
    let result = [];
    let i = 0;
    let j = 0;
  
    while (i < sortedNums1.length && j < sortedNums2.length) {
      if (sortedNums1[i] === sortedNums2[j]) {
        if (!result.includes(sortedNums1[i])) result.push(sortedNums1[i]);
        i++;
        j++;
      } else if (sortedNums1[i] < sortedNums2[j]) i++;
      else j++;
    }
    return result;
  }