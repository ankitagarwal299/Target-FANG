//HashMap Solution: O(n)
function intersect(nums1, nums2) {
  let map = new Map();
  for (let num of nums1) {
    if (map.has(num)) map.set(n, map.get(n) + 1);
    else map.set(n, 1);
  }

  const result = [];
  for (let n of nums2){
    if(map.has(n) && map.get(n) > 0){
        result.push(n);
        map.set(n, map.get(n) - 1);
    }
  }

  return result;
}

console.log(intersect([1, 2, 2, 1], [2, 2]));
