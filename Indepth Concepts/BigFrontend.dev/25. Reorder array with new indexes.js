function sort(items, newOrder) {
    let result = [];

    for (let i = 0; i < items.length; i++) {
        result[newOrder[i]] = items[i];
    }

    items.length = 0;
    //items = [...result];
    items.push(...result);//both can be used
}



function sort(items, newOrder) {

    for (let i = 0; i < items.length; i++) {
        let to = newOrder[i];
        [items[to], items[i]] = [items[i], items[to]];
        [newOrder[to], newOrder[i]] = [newOrder[i], newOrder[to]];
    }

    return items;
}

const A = ['A', 'B', 'C', 'D', 'E', 'F'];
const B = [1, 5, 4, 3, 2, 0];

console.log(sort(A, B));//['F', 'A', 'E', 'D', 'C', 'B']

