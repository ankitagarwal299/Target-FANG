/* Linked List implemntation:
https://leetcode.com/problems/merge-k-sorted-lists/discuss/775273/2-Simple-Javascript-Solutions-with-Explanation-or-Runtime-Analysis
 */

/* 
Priority Queue Implementation
Runtime Analysis: The entire length of all lists is KN, K lists each with roughly N length. Priority queues take O(log(K)) to place an item in, and O(log(K)) to retrieve the top item. 
This is because we only ever keep the first item of each array in the heap, thus have an average heap size of K items. Since we place all items in, and take all 
items out we would thus have 2KNlog(K), which is O(KNlog(K)).
 */
var mergeKLists = function (lists) {
    // Initialize the linked list, and a helper to follow the linked list as it grows
    const lList = new ListNode()
    let lListEnd = lList

    // Initialize the queue, with higher priority given to smaller values. 
    // Each entry is an array containing [the list id the value came from, the value]. 
    // This helps us keep track of which value each list came from, which is important later on.
    const queue = new PriorityQueue((a, b) => a[1] < b[1]);

    // Go through each list and add an initial smallest value.
    lists.forEach((list, index) => {
        if (list) {
            queue.push([index, list.val])
            lists[index] = list.next
        }
    })

    // While we still have values to sort, pop off the smallest value from the queue, and then replace it
    // with another from that values initial list. This ensures we keep one value from each list in the queue.
    // Since each list is already sorted, this ensures the next smallest value is in the queue, regardless
    // of which list it was in originally.
    while (!queue.isEmpty()) {
        [smallestIndex, smallestVal] = queue.pop()
        if (lists[smallestIndex]) {
            queue.push([smallestIndex, lists[smallestIndex].val])
            lists[smallestIndex] = lists[smallestIndex].next
        }
        const newListNode = new ListNode(smallestVal)
        lListEnd.next = newListNode
        lListEnd = lListEnd.next
    }

    // Return the linked list.
    // The initial node used to create the linked list should not be returned, so return the next node.
    return lList.next
};


/* Sort Implmentation
Runtime Analysis: Sorting takes roughly O(nlog(n)) time. The entire length of all lists is KN, K lists each with roughly N length. Thus, the runtime is O(KNlog(KN)).
 */
var mergeKLists = function (lists) {
    // Merge the lists then sort
    const mergeLists = []
    lists.forEach((list) => {
        while (list) { mergeLists.push(list.val); list = list.next }
    })
    mergeLists.sort((a, b) => a - b)


    // Construct the linked list
    const llRet = new ListNode()
    let llRetHelp = llRet
    mergeLists.map(val => {
        llRetHelp.next = new ListNode(val)
        llRetHelp = llRetHelp.next
    })
    return llRet.next
}