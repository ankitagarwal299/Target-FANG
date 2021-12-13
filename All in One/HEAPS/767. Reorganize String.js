//Kevin - Excellent - easy - eg "aabcccccdfeeeeeee" --> "ececececeaeacedfb"
//https://www.youtube.com/watch?v=zaM_GLLvysw&t=70s


/**
 * @param {string} S
 * @return {string}
 */
var reorganizeString = function (S) {
  if (S == null || S.length < 2) return S;



  let comparator = ((a, b) => countMap.get(b) - countMap.get(a));

  let maxHeap = new PriorityQueue(comparator);


  let countMap = new Map();

  for (let char of S) {
    countMap.set(char, countMap.get(char) + 1 || 1);
  }

  for (let [key, value] of countMap.entries()) {
    maxHeap.add(key);
  }

  let result = []
  //IMP - taking 2 at a time , looop should terminate if 1 left otherwise error
  while (maxHeap.size() > 1) {

    let first = maxHeap.poll();
    let second = maxHeap.poll();
    console.log(first, second)

    result.push(first);
    result.push(second);

    //decrese by -1, its used
    countMap.set(first, countMap.get(first) - 1);
    countMap.set(second, countMap.get(second) - 1);



    //again insert into maxHeap new freq, if not 0
    if (countMap.get(first) > 0) {
      maxHeap.add(first);
    }
    if (countMap.get(second) > 0) {
      maxHeap.add(second);
    }
  }


  //Heap not empty
  if (maxHeap.size() > 0) {
    let lastChar = maxHeap.poll();

    //last case imp: last char should be of freq 1, eg aba
    if (countMap.get(lastChar) > 1) {
      return "";
    }

    result.push(lastChar)
    return result.join('');
  }

  return result.join('');
};


//reorganizeString("aabcccccdfeeeeeee")
console.log(reorganizeString("aabcccccdfeeeeeee"));
