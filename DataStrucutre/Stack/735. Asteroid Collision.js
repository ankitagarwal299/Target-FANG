var asteroidCollision = function (asteroids) {
    let stack = [];
    for (let i = 0; i < asteroids.length; i++) {
        //if positive asteroid found
      if (asteroids[i] > 0) {
        stack.push(asteroids[i]);
      } else {
          //if stack has positive asteroid and then encounter [-1,5,-6]
          while(stack.length > 0 && stack[stack.length-1] > 0 && stack[stack.length-1] < Math.abs(asteroids[i])) {
              //Case1: [-2, -1, 1, 2]
              stack.pop();
          }
          //Case2:when stack empty[-1,-6] or [-10,10]
          if(stack.length ==0 || stack[stack.length-1] < 0 ){
              stack.push(asteroids[i]);
              //console.log(stack)
          }
          else if (stack[stack.length-1] == Math.abs(asteroids[i])){
            //Case3: [8,-8]
              stack.pop();
          }
      }
    }
    return stack
  };
  
  console.log(asteroidCollision([-2, -1, 1, 2]));
  console.log(asteroidCollision([10, 2, -5]));
  console.log(asteroidCollision([-10, 10]));
  console.log(asteroidCollision([8, -8]));
  
  
  
  
  //https://www.youtube.com/watch?v=5AV33YdtDYw&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=113