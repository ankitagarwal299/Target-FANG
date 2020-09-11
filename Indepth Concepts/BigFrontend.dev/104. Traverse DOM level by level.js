function flatten(root) {
    if (root == null) return [];

    let result = [];
    let queue = [root];

    while (queue.length > 0) {
        let head = queue.shift();
        result.push(head);

        queue.push(...head.children);
    }
    return result;
}