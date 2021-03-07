/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (num) {
  const MAX_INT = 2 ** 31 - 1;//2147483647
  const MIN_INT = -(2 ** 31);//-2147483648

  function mod(num) {
    return num % 10;
  }
  function divide(num) {
    if (num < 0) {
      return Math.ceil(num / 10);
    } else {
      return Math.floor(num / 10);
    }
  }

  let result = 0;
  while (num) {
    let remainder = mod(num);
    num = divide(num);

    if ((result > divide(MAX_INT)) || (result == divide(MAX_INT) && remainder > 7)) {
      return 0
    }
    if ((result < divide(MIN_INT)) || (result == divide(MIN_INT) && remainder < 8)) {
      return 0
    }
    console.log(num, result)
    result = result * 10 + remainder;//this should not overflow
  }

  //console.log(result);
  return result

};
//https://www.youtube.com/watch?v=Io9ujnnR4sI&list=PLfAsuXGlNEFX3zfJyCzC0xmda2JlV-vpH

//reverse(123) 
//reverse(-120) 
//reverse(-2147483648) 

/* Caution Negative number division behave weird in javascript */
//eg. -123/10 = -12.3
//eg. Math.floor(-123/10) = -13
//eg. Math.ceil(-123/10 )= -12



//eg. -1/10 = -0.1
//eg. Math.floor(-123/10) = -1
//eg. Math.ceil(-123/10 )= -0

