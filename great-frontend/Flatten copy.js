
export default function flatten(value) {
  if (value == null || typeof value != "object") {
    return value;
  }
  return Array.isArray(value) ? flattenArray(value) : flattenObject(value);
}

function flattenArray(value) {
  return value.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

function flattenObject(val) {
  const obj = {};

  for (let [key, value] of Object.entries(val)) {
    obj[key] = flatten(value);
  }
  return obj
}





const input1 = [1, [2, [3, 4]], 5];
const expected1 = [1, 2, 3, 4, 5];
console.log("Test 1:", JSON.stringify(flatten(input1)) === JSON.stringify(expected1));



const input2 = {
  a: 1,
  b: {
    c: 2,
    d: {
      e: 3
    }
  }
};
const expected2 = { a: 1, c: 2, e: 3 };
console.log("Test 2:", JSON.stringify(flatten(input2)) === JSON.stringify(expected2));



const input3 = [{ a: 1 }, [{ b: 2 }, 3]];
const expected3 = [{ a: 1 }, { b: 2 }, 3];
console.log("Test 3:", JSON.stringify(flatten(input3)) === JSON.stringify(expected3));
