/**
 * @template T
 * @param {T} value
 * @return {T}
 */
export default function deepClone(value) {
  //Base Case 1: value is primitive or null or undefined , return directly
  // typeof Array and Object = onject
  if ( value == null || typeof value != "object") {
    return value;
  }

  // If the object is an array, recursively clone each element
  if (Array.isArray(value)) {
    return value.map(deepClone); // map applies deepClone to each element
  }

  // If the object is a plain object, create a new object and recursively clone each property
  const cloneObj = {};

  for (let [key, val] of Object.entries(value)) {
    cloneObj[key] = deepClone(val);
  }

  // Return the fully cloned object
  return cloneObj;
}


function testDeepClone() {
  const original = { a: 1, b: { c: 2 } };
  const cloned = deepClone(original);

  console.log("Test 1: Primitive clone", deepClone(42) === 42);
  console.log("Test 2: String clone", deepClone("hello") === "hello");
  console.log("Test 3: Null clone", deepClone(null) === null);
  console.log("Test 4: Undefined clone", deepClone(undefined) === undefined);

  console.log("Test 5: Flat object", cloned.a === 1 && cloned.b.c === 2);
  console.log("Test 6: Object reference", cloned !== original);
  console.log("Test 7: Nested reference", cloned.b !== original.b);

  const arr = [1, 2, 3];
  const arrClone = deepClone(arr);
  console.log("Test 8: Array clone", arrClone.length === 3 && arrClone[0] === 1);
  console.log("Test 9: Array reference", arrClone !== arr);

  const arrObj = [{ x: 1 }, { y: 2 }];
  const arrObjClone = deepClone(arrObj);
  console.log("Test 10: Array of objects", arrObjClone[0].x === 1 && arrObjClone[1].y === 2);
  console.log("Test 11: Object inside array", arrObjClone[0] !== arrObj[0]);
}

testDeepClone();

