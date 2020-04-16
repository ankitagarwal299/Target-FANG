function findFirstUnique(arr) {
    var map = {};
  
    for (let i = 0; i < arr.length; i++) {
      if (!map[arr[i]]) {
        map[arr[i]] = 1;
      } else {
        map[arr[i]]++;
      }
    }
    console.log(map)
  
  
    for (let i in map) {
      if(map[i]==1) return i;
    }
    return null;
  }
  
  console.log(findFirstUnique([9, 2, 3, 6, 6, 9, 12, 3]));
  console.log(findFirstUnique([9, 2, 3, 6, 2, 6, 9, 0, 3]))
  