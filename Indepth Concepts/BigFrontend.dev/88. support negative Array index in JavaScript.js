/*
Python supports negative list index, while Javascript doesn't
Can you write a wrapper function to make negative array index possible?
*/

const originalArr = [1, 2, 3];
const arr = wrap(originalArr);

arr[0] //1
arr[1] //2
arr[2] //3
arr[3] //undefined
arr[-1] //3
arr[-2] //2
arr[-3] //1
arr[-4] //undefined
//All methods on arr should be applied to original array

function wrap(arr) {
    //your code here
    return new Proxy(arr, {
        get(target, prop) {
            //if it is used as iterable
            if (prop === Symbol.iterator) {
                return target[prop].bind(target);
            }

            const index = parseInt(prop, 10);
            if (index < 0) {
                index = arr.length + index;
                return target[index];
            }
            return target[prop];
        }
    }, {
        set(target, prop, value) {
            let index = parseInt(prop, 10);
            if (index < 0) {
                index = arr.length + index;
                target[index] = value;

                //while setting value if index req is out of bound ? forex arrlengt 3 but req 10
                if (index < 0) {
                    throw new Error("index is overflow");
                }
                return true;
            }
            target[prop] = value;
            return true;
        }
    })
}