var addBinary = function (a, b) {
  let i = a.length - 1;
  let j = b.length - 1;

  let strBuilder = "";

  let carry = 0;
  while (i >= 0 || j >= 0) {
    let sum = carry;
    if (i >= 0) {
      sum = sum + parseInt(a[i]);
      i--;
    }
    if (j >= 0) {
      sum = sum + parseInt(b[j]);
      j--;
    }

    let tempStr = (sum % 2).toString();
    strBuilder = tempStr.concat(strBuilder);

    carry = Math.floor(sum / 2);
  }

  if (carry > 0) {
    strBuilder = "1".concat(strBuilder);
  }

  return strBuilder;
};

//console.log(addBinary("11", "1"));
console.log(addBinary("1010", "1011"));

/*
  
  Example 1:
  
  Input: a = "11", b = "1"
  Output: "100"
  Example 2:
  
  Input: a = "1010", b = "1011"
  Output: "10101"
  
  */
