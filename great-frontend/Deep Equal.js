/**
 * @param {*} valueA
 * @param {*} valueB
 * @return {boolean}
 */
export default function deepEqual(valueA, valueB) {
  //check for primitives for equality
  if (Object.is(valueA, valueB)) {
    return true;
  }

  const bothObjects =
    Object.prototype.toString.call(valueA) == "[object Object]" &&
    Object.prototype.toString.call(valueB) == "[object Object]";

  const bothArrays = Array.isArray(valueA) && Array.isArray(valueB);

  if (!bothObjects && !bothArrays) {
    return false;
  }

  // Compare the keys of arrays and objects.
  if (Object.keys(valueA).length !== Object.keys(valueB).length) {
    return false;
  }

  for (const key in valueA) {
    if (!deepEqual(valueA[key], valueB[key])) {
      return false;
    }
  }

  return true;
}