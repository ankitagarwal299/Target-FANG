function searchRotatedSortedArray(arr, target) {
  if (arr == null || arr.length == 0) return "not found";

  if (arr.length == 1) return arr[0];

  let left = 0;
  let right = arr.length - 1;

  //start binary search
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (arr[mid] == target) {
      return arr[mid] == target;//found at mid point

    } else if (arr[mid] >= arr[left]) {//means left is sorted, then find in sorted first

      //does target lies between sorted left part
      if (arr[left] <= target && arr[mid] >= target) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {//means right is sorted, then find in sorted first

      //does target lies in the range of right sorted branch
      if (arr[mid] <= target && target <= right) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }

    }

  }
  return false;//if not found at mid then false

}

//https://www.youtube.com/watch?v=oTfPJKGEHcc&t=680s
// console.log(searchRotatedSortedArray([2, 5, 6, 0, 0, 1, 2], 0));
console.log(searchRotatedSortedArray([2, 2, 2, 2, 2, 0, 2, 2], 0));