/* Given an integer array , count element x such that (x+1) is also present in the arr */

/* 
Ex:
Input arr = [1,2,3]
Output: 2 , 
Explanation : 1+1=2, 2+1=3


Ex2: [1,1,2,2,3,3,7,7]
Output: 0
Explanation : No number is counted as there are no  2,4,6,8,

*/
//If array is not sorted then needs to sort an array


//O(N)
function countElements(arr) {
  let mySet = new Set();

  for (let i = 0; i < arr.length; i++) {
    mySet.add(arr[i]);
  }

  let count = 0;
  for (let i of arr) {
    if (mySet.has(i + 1)) {
      count++;
    }
  }
  return count;
}

console.log(countElements([1, 2, 3]));



//Secod implementation without HashMap On(logn)
function countElements(arr) {
  arr.sort(function (a, b) {
    return a - b;
  });

  let left = 0;
  let right = 1;
  let count = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[left] + 1 == arr[right]) {
      count += right - left;
      left = right;
      right++;
    } else if (arr[left] == arr[right]) {
      right++;
    } else {
        left = right;
        right++;
    }
  }

  return count;
}

console.log(countElements([1, 3, 4]));
