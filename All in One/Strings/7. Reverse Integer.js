/**
 * @param {number} x
 * @return {number}
 */
var reverse = function (num) {
  if (num == null) return num;

  let MAX_INT = 2 ** 31 - 1;//2147483647
  let MIN_INT = -(2 ** 31);//-2147483648

  function divide(num) {
    if (num < 0) {
      return Math.ceil(num / 10);
    } else {
      return Math.floor(num / 10);
    }

  }

  let result = 0;
  while (num != 0) {
    let remainder = num % 10;
    num = divide(num);

    if (result > divide(MAX_INT) || result == divide(MAX_INT) && remainder == 7) return 0;
    if (result < divide(MIN_INT) || result == divide(MIN_INT) && remainder == 8) return 0;

    result = result * 10 + remainder;
  }
  return result;
};
//https://www.youtube.com/watch?v=Io9ujnnR4sI&list=PLfAsuXGlNEFX3zfJyCzC0xmda2JlV-vpH


//reverse(123) 
//reverse(-120) 
//reverse(-2147483648) 

/* Caution Negative number division behave weird in javascript */
//eg. -123/10 = -12.3
//eg. Math.floor(-123/10) = -13
//eg. Math.ceil(-123/10 )= -12

//-------------------------------------------------------------------------------------------------------Palindrome Check within constraints-----------------------------------
//https://www.youtube.com/watch?v=THPvg1wLPdw&t=533s
//9. Palindrome Number (Google Engineer Explains) - VVVVVVVIMP questioon - I did my self after watching video

var isPalindrome = function (num) {

  if (num == null || num == 0) return true;
  if (num < 0 || num % 10 == 0) return false; //(provided in contraints)

  //this solution will handle 2**31, -2**31

  let b = 0;
  //traverse half numbers  (IMPPPPPP- contraiints)
  while (num > b) {
    let rem = num % 10;
    num = Math.floor(num / 10);

    b = b * 10 + rem;
  }
  return num == b || num == Math.floor(b / 10);
};

/*Even*/
// add.   num.  b
// 1221 ->122.  1
// 122  -> 12  12  true

//1231. -> 123. 1
//123.  -> 12.  13. false

//10.   -> 1.   0/10
//1.    -> 0.   1/10 (code doesnot work , so verify any number ending with 0 is not a palindrom)

/*Odd*/
//121.  -> 12.  1/10  0
//12.   -> 1   12/10  1 true

//110.  -> 11.  0/10  0
//11    ->.1.   1/10. 0 false


Constraints:
-231 <= x <= 231 - 1

Input: x = -121
Output: false
//Explanation: From left to right, it reads - 121. From right to left, it becomes 121 -.Therefore it is not a palindrome.