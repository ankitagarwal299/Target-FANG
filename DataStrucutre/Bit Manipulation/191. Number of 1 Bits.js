var hammingWeight = function (n) {
  var count = 0;

  while (n) {
    if (n ) {
      count+= n & 1;
    }
    n = n >> 1;
  }
  return count;
};
  
  console.log(hammingWeight(00000000000000000000000000001011) , "00000000000000000000000000001011".length);
  console.log(hammingWeight(00000000000000000000000010000000),"00000000000000000000000010000000".length);
  
  //above code is not giving answer for below
  console.log(hammingWeight(00000000000000000000011111111111),"00000000000000000000011111111111".length);
  console.log(hammingWeight(11111111111111111111111111111101),"11111111111111111111111111111101".length);
  
  
//tried all solutions but answer is not printing for negative cases like above
  
  
  
  