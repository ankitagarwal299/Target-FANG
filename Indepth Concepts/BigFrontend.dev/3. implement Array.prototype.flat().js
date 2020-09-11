////------------------------------Recursive -----
function flat(arr, depth = 1) {
    let result = [];

    for (let item of arr) {
        if (Array.isArray(item) && depth > 0) {
            let a = flat(item, depth - 1);
            console.log("after", a);
            result.push(...a);
        } else {
            console.log("else", item);
            result.push(item);
        }
    }

    return result;
}


console.log(flat([1, [2], [3, [4]]], 1));

////------------------------------Reduce-----

function flat(arr, depth = 1) {
    return arr.reduce((result, item) => {
        if (Array.isArray(item) && depth > 0) {
            result.push(...flat(item, depth - 1));
        } else {
            result.push(item);
        }
        return result;
    }, []);
}


console.log(flat([1, [2], [3, [4]]], 1));


////------------------------------Iteration-----


function flat(arr, depth = 1) {
    const result = [];
    const stack = [...arr.map(item => ([item, depth]))];

    while (stack.length > 0) {
        const [head, depth] = stack.shift();
        if (Array.isArray(head) && depth > 0) {
            stack.unshift(...head.map(item => ([item, depth - 1])));
        } else {
            result.push(head)
        }

    }

    return result;
}


console.log(flat([1, [2], [3, [4]]], 1));

////------------------------------Iteration-----


function flat(arr, depth = 1) {
    const result = [];
    const stack = [...arr.map(item => ([item, depth]))];

    while (stack.length > 0) {
        const [top, depth] = stack.pop();
        if (Array.isArray(top) && depth > 0) {
            stack.push(...top.map(item => ([item, depth - 1])));
        } else {
            result.push(top)
        }
    }
    return result.reverse();
}

console.log(flat([1, [2], [3, [4]]], 1));