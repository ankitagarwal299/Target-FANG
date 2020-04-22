function heapsort(arr) {
  let heapLength = 1;

  function getParent(child) {
    if (child % 2 == 0) {
      return (child - 2) / 2;
    } else {
      return (child - 1) / 2;
    }
  }

  function swap(i1,i2){
    [arr[i1], arr[i2]] = [arr[i2],arr[i1]];
  }
  
  function bubbleUp() {
    let child = heapLength - 1;//child = 2-1; at first iteration
    let parent = getParent(child);

    while (child > 0 && arr[child] > arr[parent]){
        swap(child,parent);
        child =parent;
        parent= getParent(child);
    }
  }

  function getChild(parentIndex) {
    let leftIndex = 2 * parentIndex + 1;
    if (leftIndex < heapLength) {
      if (arr[leftIndex] > arr[leftIndex + 1]) {
        return leftIndex;
      } else {
        return leftIndex + 1;
      }
    }
    return null;
  }

  function bubbleDown(){
    swap(0,heapLength);
    let parent = 0;
    let child = getChild(parent);
    while(child < heapLength && arr[child] > arr[parent]){
      swap(child,parent);
      parent = child;
      child =getChild(parent);
    }
}

  /* max heapify array */
  while (heapLength < arr.length) {
      /* Increase heaplength && Maxheap whole array by bubbleUp */
    heapLength++;
    bubbleUp();
  }

  console.log("Max Heapify Array", arr);


  

  while(heapLength > 1){
      /* Decrease heaplength && Minheap by bubbleDown */
    heapLength--;
    bubbleDown();
  }

  return arr;
}

console.log(
  "Sorted\n",
  heapsort([9, 1, 6, 10, 0, 18, 9, 8, 5, 6, 3, 22, -10, -8, 2])
);
