//https://www.youtube.com/watch?v=irFtGMLbf-s

function findCombinations(result, currentComb, remainingTarget, startIndex) {
    if (remainingTarget == 0) {
      result.push(currentComb);
      return;
    }
  
    if (remainingTarget < 0) return;
  
    for (let i = startIndex; i < candidates.length; i++) {
        if (candidates[i] > target) break;
  
        currentComb.push(candidates[i]);
        findCombinations(result, currentComb, remainingTarget - candidates[i], i+1);
        currentComb.remove(currentComb.length-1);
    }
  }
  
  var combinationSum2 = function (candidates, target) {
    let result = [];
    if (candidates == null || candidates.length == 0) return result;
  
    candidates.sort(() => a - b);
  
    findCombinations(result, new Array(), candidates, target, 0);
  
  
    return result;
  };
  
  console.log(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8));
  