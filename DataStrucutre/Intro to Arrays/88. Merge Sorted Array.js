function mergeArrays(arr1, arr2) {
  var merged = [];
  var i = 0,
    j = 0;

  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }

  /*   if (i < arr1.length) {
    arr1.splice(0, i);
    merged =merged.concat(arr1);
  }else if (j <= arr2.length){
    arr2.splice(0, j);
    merged =merged.concat(arr2);
  } */
  if (arr1.length < arr2.length) {
    arr2.splice(0, arr1.length);
    merged = merged.concat(0, arr2);
  } else if (arr1.length > arr2.length) {
    arr1.splice(0, arr2.length);
    merged = merged.concat(0, arr1);
  }

  return merged;
}
console.log(mergeArrays([4, 5, 6], [-2, -1, 0, 7]));
