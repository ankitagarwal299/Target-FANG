/* 
Input #
An array and a number by which to rotate that array

Output #
The given array rotated by n elements

Sample Input #
arr = [1,2,3,4,5]
n = 3
Sample Output #
arr = [3,4,5,1,2]
 */


function rightRotate(arr, n) {
    return (arr.splice(arr.length - n)).concat(arr.splice(0, arr.length))
}
  console.log(rightRotate([1,2,3,4,5], 3))
