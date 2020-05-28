var licenseKeyFormatting = function (S, K) {
    let result = "";
    let count = 0;
    let i = S.length - 1;
  
    while (i >= 0) {
      let currentChar = S[i].toUpperCase();
      if (currentChar == "-") {
        i--;
      }else if (count !=0 && count % K == 0 ){
          result = '-' + result;
          count = 0;
      }else{
          result  = currentChar + result;
          count++;
          i--;
      }
    }
  
    return result;
  };
  
  console.log(licenseKeyFormatting("5F3Z-2e-9-w",4));
  console.log(licenseKeyFormatting("2-5g-3-J",2));
  
  
  //Solved by myself --- Best solution
  var licenseKeyFormatting = function (address,K) {
    let result ="";
    let count =0;
      address = address.replace(/-/gi, "").toUpperCase();
      for(let i=address.length-1 ; i >= 0 ; i-=1){
        let current  =address.substring(i, i+1);
        count+=1;
        if (i!=0 && count == K){
          result  =  '-' + current + result;
          count = 0;
        }else{
          result =  current + result;
        }
      }
      return result;
  };
  
  console.log(licenseKeyFormatting("2-5g-3-J" , 2));
    console.log(licenseKeyFormatting("5F3Z-2e-9-w",4));
  