function getHeight(tree) {
    if (tree == null) return 0;

    return Math.max(...Array.from(tree.children).map(getHeight), 0) + 1;
}

//traverse DOM layer by layer
function getHeight(tree) {
    if (tree == null) return 0;

    let queue = [tree]; let height = 0;

    while (queue.length > 0) {
        let count = queue.length;

        height += 1;

        while (count > 0) {
            let head = queue.shift();
            queue.push(...head.children);
            count--;
        }
    }
}