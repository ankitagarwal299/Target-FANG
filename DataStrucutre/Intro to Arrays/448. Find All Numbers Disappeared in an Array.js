var findDisappearedNumbers = function (nums) {
    let numbers = new Set();
  
    for (let i of nums) {
      numbers.add(i);
    }
  
    for (let i = 1; i < nums.length; i++) {
      if (!numbers.has(i)) numbers.add(i);
    }
  
    return [...numbers]
  };
  
  console.log(findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1, 2, 2, 2, 2, 2]));
  