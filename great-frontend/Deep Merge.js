function isPlainObject(obj) {
  return typeof obj == "object" && obj != null && !Array.isArray(obj);
}

function cloneValue(val) {
  if (Array.isArray(val)) {
    return val.map(cloneValue);
  } else if (isPlainObject(val)) {
    const newObj = {};
    for (let key in val) {
      newObj[key] = cloneValue(val[key]);
    }

    return newObj;
  }

  return val; //primitive
}
//---------------------/main function
export default function deepMerge(valA, valB) {
  if (Array.isArray(valA) && Array.isArray(valB)) {
    return [...cloneValue(valA), ...cloneValue(valB)];
  }

  // If only one is an array, return a clone of objB (objB takes precedence)
  if (Array.isArray(valA) || Array.isArray(valB)) {
    return cloneValue(valB);
  }

  // If either is not an object, return clone of objB (objB takes precedence)
  if (!isPlainObject(valA) || !isPlainObject(valB)) {
    return cloneValue(valB);
  }

  // Both values are objects.
  if (isPlainObject(valA) && isPlainObject(valB)) {
    const newObj = { ...valA };

    for (const key in valB) {
      newObj[key] = deepMerge(valA[key], valB[key]);
    }
    return newObj;
  }

  // Return the second value as it will "win" in case of an overlap.
  return valB;
}

//Test

function testDeepMerge() {
  const objA = { a: 1, b: { x: 10 } };
  const objB = { b: { y: 20 }, c: 3 };
  const expected = { a: 1, b: { x: 10, y: 20 }, c: 3 };

  const result = deepMerge(objA, objB);

  const passed = JSON.stringify(result) === JSON.stringify(expected);
  console.log("Test 1 - Merge nested objects:", passed ? "PASSED" : "FAILED");

  const arrA = [1, 2];
  const arrB = [3, 4];
  const expectedArr = [1, 2, 3, 4];

  const resultArr = deepMerge(arrA, arrB);
  const passedArr = JSON.stringify(resultArr) === JSON.stringify(expectedArr);
  console.log("Test 2 - Merge arrays:", passedArr ? "PASSED" : "FAILED");

  const mixedA = { a: [1, 2] };
  const mixedB = { a: [3] };
  const expectedMixed = { a: [1, 2, 3] };

  const resultMixed = deepMerge(mixedA, mixedB);
  const passedMixed = JSON.stringify(resultMixed) === JSON.stringify(expectedMixed);
  console.log("Test 3 - Merge object with array values:", passedMixed ? "PASSED" : "FAILED");
}

testDeepMerge();
