class Node {
    constructor(value) {
        this.val = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    insertAtTail(data) {
        if (this.head == null) {
            this.head = new node(data);
            return this.head;
        }

        let curr = this.head;

        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = new Node(data);
        return this.head;
    }

    midNode(node) {
        if (node == null || node.next == null) return node;

        let fast = node;
        let slow = node;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    mergeTwoSortedList(l1, l2) {
        if (l1 == null || l2 == null) return l1 != null ? l1 : l2;

        let c1 = l1;
        let c2 = l2;

        let dummy = new Node(-1000);
        let prev = dummy;


        while (c1 != null && c2 != null) {
            if (c1.val < c2.val) {
                prev.next = c1;
                c1 = c1.next;
            } else {
                prev.next = c2;
                c2 = c2.next;
            }

            prev = prev.next;
        }

        prev.next = (c1 != null) ? c1 : c2;

        return dummy.next;
    }

    mergeSort(head) {
        if (head == null || head.next == null) return head;

        let mid = this.midNode(head);
        let nHead = mid.next;
        mid.next = null;//break 2 list

        let l1 = mergeSort(head);
        let l2 = mergeSort(nHead);

        return mergeTwoList(l1, l2);
    }
}


//https://www.youtube.com/watch?v=HUFibUCDt0U
let l1 = new LinkedList();
for (let i = 0; i < 100; i++) {
    l1.insertAtTail(i);
}
