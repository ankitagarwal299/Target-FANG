/**
 * @template T, U
 * @param { (value: T, index: number, array: Array<T>) => U } callbackFn
 * @param {any} [thisArg]
 * @return {Array<U>}
 */
Array.prototype.myMap = function (callbackFn, thisArg) {
  if (this == undefined || this.length == 0) return [];

  if (typeof callbackFn != "function") {
    throw new TypeError(`${callbackFn} is not a function `);
  }

  let context = this;

  let new_array = new Array(context.length);

  for (let i = 0; i < context.length; i++) {
    if (!(i in context)) continue; // Skip holes, not skip undefined, null, 0, etc.

    new_array[i] = callbackFn.call(thisArg, this[i], i, this);
  }

  return new_array;
};
