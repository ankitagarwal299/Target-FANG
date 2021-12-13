function findMid(node) {
    if (node == null || node.next == null) return node;

    let slow = node;
    let fast = node;
    let prev = null
    while (fast.n != null && fast.next != null) {
        prev = slow;
        slow = slow.next;
        fast = fast.next.next;
    }

    prev.next = null;
    return slow;
}

var sortedListToBST = function (head) {
    if (head == null) {
        return null;
    }
    if (head.next == null) {
        return new TreeNode(head.val);
    }


    let mid = findMid(head);
    let nHead = mid.next;
    mid.next = null;//break list later join



    let root = new TreeNode(mid.val);
    root.left = sortedListToBST(head);
    root.right = sortedListToBST(nHead);


    return root;
};









