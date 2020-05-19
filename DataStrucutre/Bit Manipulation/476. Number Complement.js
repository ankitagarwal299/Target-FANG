var findComplement = function (num) {
  let result = 0;
  let power = 1;
  while (num > 0) {
    result += (num % 2 ^ 1) * power;
    power *= 2;// power <<= 1; same as *2

   num>>1;// same as dividedby 2 num=num/2
  }

  return result;
};

console.log(findComplement());

//very important video:
//https://www.youtube.com/watch?v=oURSuMY4zSc&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=34

//same as question and wording are different
//1009. Complement of Base 10 Integer
