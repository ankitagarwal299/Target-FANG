/* 
Input #
A sorted array

Output #
An array with elements stored in max/min form

Sample Input #
arr = [1,2,3,4,5]
Sample Output #
arr = [5,1,4,2,3]

 */

function maxMin(arr) {
  var result = [];

  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    result.push(arr[arr.length - (i + 1)]);
    result.push(arr[i]);
  }

  //if numbers are odd push middle element
  if (arr.length % 2) {
    result.push(arr[Math.floor(arr.length / 2)]);
  }

  return result;
}
console.log(maxMin([1, 2, 3, 4, 5, 6, 7]));
console.log(maxMin([1, 2, 3, 4, 5, 6]));
