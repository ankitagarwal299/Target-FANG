//https://www.youtube.com/watch?v=xu37BTWjzGA&t=86s

var findRepeatedDnaSequences = function (str) {


  let seen = new Map();
  let repeatedSequences = [];

  for (let i = 0; i < str.length - 10; i++) {
    let seq = str.slice(i, i + 10);

    seen[seq] = seen[seq] ? seen[seq] + 1 : 1;
    if (seen[seq] == 2) repeatedSequences.push(seq);
  }

  return repeatedSequences;
}

console.log(findRepeatedDnaSequences("AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"));


  //TODO with Rolling Hash

//https://leetcode.com/problems/repeated-dna-sequences/discuss/899317/JavaScript-Rolling-Hash-Solutions
//https://leetcode.com/problems/repeated-dna-sequences/discuss/1228538/HashSet-Rolling-Hash-Two-JS-Solutions
//https://www.youtube.com/watch?v=BQ9E-2umSWc
