/* 
Input #
An array containing positive and negative elements

Output #
A sorted array with negative elements at the left and positive elements at the right

Sample Input #
[10,-1,20,4,5,-9,-6]

Sample Output #
[-1,-9,-6,10,20,4,5]

 */

function reArrange(arr) {
  var leftmost = 0;
  var temp;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 0) {
        temp = arr[i];
        arr[i] = arr[leftmost];
        arr[leftmost] = temp;

        leftmost++;
    }
  }

  return arr;
}

console.log(reArrange([10, -1, 20, 4, 5, -9, -6]));
//10, -1, 20, 4, 5, -9, -6
//-1, 10, 20, 4, 5, -9, -6
//-1, -9, 20, 4, 5, 10, -6
//-1, -9, -6, 4, 5, 10, 20

