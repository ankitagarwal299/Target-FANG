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
    // insertAtTail(data) - inserts an element at the end of the linked list
    // insertAtHead(data) - inserts an element at the start / head of the linked list
    // delete (data) - deletes an element with your specified value from the linked list
    // deleteAtHead() - deletes the first element of the list
    // search(data) - searches for an element in the linked list
    // isEmpty() - returns true if the linked list is empty
    insertAtHead(data) {
        if (this.head == null || this.isEmpty()) {
            this.head = new Node(data);
            return;
        }

        let node = this.head;
        this.head = new Node(data);
        this.head.nextElement = node;
        return this.head;
    }

    delete = function (node) {
        //not be given access to the head of the list,given access to the node to be deleted directly.
        node.val = node.next.val;
        node.next = node.next.next;
    };

    insertAtTail(data) {
        let node = new Node(data);

        if (this.head == null) {
            this.head = node;
            return this.head;
        }

        let curr = this.head;
        while (curr.nextElement != null) {
            curr = curr.nextElement;
        }

        curr.nextElement = node;
        return this.head;
    }

    insertAtNth(data, position) {
        let node = new Node(data);

        if (this.head == null && position > 1 || position < 1) {
            return "Invalid position";
        }

        if (position == 1) {
            node.nextElement = this.head;
            this.head = node;

            return;
        }

        let prev = null;
        let curr = this.head;
        let count = 1;

        while (curr != null && count < position) {
            prev = curr;
            curr = curr.nextElement;
            count++;
        }

        if (count < position) return "Out of bound";


        prev.nextElement = node;
        node.nextElement = curr;

        return this.head;
    }

    //leetcode 203 - 1way
    removeAllOccurence(val) {
        if (this.head == null) return this.head;

        //remove from head
        while (this.head && this.head.data == val) {
            this.head = this.head.nextElement;
        }

        let curr = this.head;//head is now pointing not equals to target
        while (curr != null && curr.nextElement != null) {
            if (curr.nextElement.val == val) {
                curr.nextElement = curr.nextElement.nextElement;
            } else {
                curr = curr.nextElement;
            }
        }
        return this.head;
    }



    //leetcode 203 - 2ndway
    removeAllOccurence(val) {
        if (this.head == null) return this.head;

        let dummy = new Node(-1000);
        let prev = dummy;
        let curr = this.head;

        while (curr != null) {
            if (curr.val != val) {
                prev.next = curr;
                prev = curr;
                curr = curr.next;
            } else {
                curr = curr.next;
                prev.next = null;
            }
        }

        return dummy.next;
    }

    addOneAfterEachNode() {
        if (this.head == null) return;

        let curr = this.head;
        while (curr != null) {
            let temp = curr.nextElement;
            let newnode = new Node(1);

            curr.nextElement = newnode;
            newnode.nextElement = temp;

            curr = temp;
        }
        return this.head
    }

    search(data) {
        if (this.head == null) {
            return false;
        }

        let curr = this.head;
        while (curr.val != null) {
            if (curr.val == data) {
                return true;
            }
            curr = curr.next;
        }
        return false;
    }


    size() {
        if (this.head == null) return 0;

        let counter = 0;
        let curr = this.head
        while (curr != null) {
            counter++;
            curr = curr.next;
        }
        return counter;
    }

    //return nth node from end-- VVIMP
    nthNodeEnd(nth) {
        if (this.head == null) return null;

        let slow = this.head;
        let fast = this.head;

        for (let i = 0; i < nth; i++) {
            if (fast == null) return "Out of bounds";//----- Impoortant 
            fast = fast.next;
        }

        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        return slow.val;
    }

    //remove nth node from end-- VVIMP (Leetcode 19)- Two pointers
    nthNodeEndRemove(nth) {
        //find total length of ll for edge cases
        if (this.head == null) return null;

        let slow = this.head;
        let fast = this.head;

        for (let i = 0; i < nth; i++) {
            if (fast == null) return "Out of bounds";//----- Impoortant 
            fast = fast.next;
        }

        while (fast.next != null) {//one before null as we dont want to stand on remaoval node
            fast = fast.next;
            slow = slow.next;
        }

        //removing process
        let target = slow.next;
        slow.next = slow.next.next;
        //or
        //slow.next = target.next;

        target.next = null;

        return this;
    }

    //reverse Singly Linked Lilst - Three pointers
    reverseInplace() {
        if (this.head == null || this.head.next == null) return this;//no need to reverse if ll is empty or 1 node

        let prev = null;
        let curr = this.head;

        while (curr != null) {
            let next = curr.next;
            curr.next = prev;
            prev = curr;
            curr = next;
        }

        //now head is at the last 
        this.head = prev;
    }

    reverseUsingStack() {
        if (this.head == null || this.head.next == null) return this;//no need to reverse if ll is empty or 1 node

        let stack = [];

        let curr = this.head;
        while (curr != null) {
            stack.push(curr.val);
            curr = curr.next;
        }

        let dummy = new Node(-1);
        let currNode = dummy;
        while (stack.length != 0) {
            currNode.next = new Node(stack.pop());
        }

        return dummy.next; //:) - Happy
    }

    //remove duplicates using extra space
    removeDuplicates() {
        let hashSet = new Set();

        if (this.head == null || this.head.next == null) return this;

        let prev = null;
        let curr = this.head;

        while (curr != null) {
            if (hashSet.has(curr.val)) {
                let temp = curr;
                curr = curr.next;
                prev.next = temp.next;
                temp.next = null;
            } else {
                hashSet.add(curr.val);
                prev = curr;
                curr = curr.next;
            }
        }
        return this;

    }

    //remove duplicates after sorting
    removeDuplicates() {
        if (!this.head || !this.head.next) return this; //0 or 1 node noduplicates

        this.head = this.mergeSortList()

        let prev = this.head;
        let curr = this.head.next;

        while (curr != null) {
            if (prev.val == curr.val) {
                let temp = curr;
                prev.next = temp.next;
                temp.next = null;

                curr = prev.next;
            }
        }
        return this;
    }

    //Inplace merging T : O(n+m), S: O(1)
    mergeTwoSort(l1, l2) {
        if (l1 == null || l2 == null) return l1 ? l1 : l2;

        let curr1 = l1;
        let curr2 = l2;

        let dummyHead = new Node(-1000);
        let prev = dummyHead;

        while (curr1 != null && curr2 != null) {

            if (curr1.val < curr2.val) {
                prev.next = curr1;
                curr1 = curr1.next;
            } else {
                prev.next = curr2;
                curr2 = curr2.next;
            }
            prev = prev.next;
        }

        prev.next = curr1 != null ? curr1 : curr2;

        return dummyHead.next;

    }

    findMiddle() {
        if (this.head == null || this.head.next == null) return this.head;

        let slow = this.head;
        let fast = this.head;//one step ahead

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    //Educative - VVIMP -VeryEasy
    rotate(k) {//handle both +ve and -ve rotation
        if (k == 0 || this.head == null || this.head.next == null) return;

        function size() {
            let lengthLL = 0;
            let curr = this.head;
            while (curr != null) {
                curr = curr.next;
                lengthLL++;
            }
            return lengthLL;
        }


        //  Let's optimize the number of rotations.
        //  Handle case if 'n' is a negative number.

        //  If n (number of rotations required) is bigger than
        //  length of linked list or if n is negative then
        //  we need to adjust total number of rotations needed
        let listLength = size();
        let totalRotations = k % listLength;//remainder

        if (totalRotations < 0) {//means -ve k provided
            totalRotations = totalRotations + listLength;// if -ve rotations
        }

        if (totalRotations == 0) return this.head;//no rotations needed , completely divisible


        //  Find the start of rotated list.
        //  If we have 1, 2, 3, 4, 5 where n = 2,
        //  4 is the start of rotated list.
        let slow = this.head;
        while (totalRotations > 0) {
            totalRotations--;
            slow = slow.next;
        }

        //  After the above loop temp will be pointing  to one node prior to rotation point
        let newHead = slow.next;

        //  Set new end of list.
        slow.next = null;


        //  Iterate to the end of list and  link that to original head.
        let curr = newHead;
        while (curr.next != null) {
            curr = curr.next;
        }
        curr.next = this.head;
        return newHead;


        /* 
        Ex: 1,2,3,4,5 , n=2
            4,5,1,2,3

        Ex: 1,2,3,4,5 , n= -2
            3,4,5,1,2
        */
    }

    cycledList() {
        if (this.head == null || this.head.next == null) return false; //0 or 1 node

        let slow = this.head;
        let fast = this.head;
        while (fast.next != null && fast.next.next != null) {
            if (slow == fast) return true;

            fast = fast.next.next;
            slow = slow.next;
        }

        return false; //no cycle reached null
    }

    cyclelength() {
        if (this.head == null || this.head.next == null) return this.head;

        //find if there is cycle using cycledList method
        let slow = this.head;
        let fast = this.head;

        while (fast.next != null && fast.next.next != null) {
            if (slow == fast) {
                //at meeting point run another loop to find length - Educative
                let curr = slow;
                let cycLength = 0;

                while (true) { // Revise again 
                    cycLength += 1;
                    curr = curr.next;
                    if (slow == curr) {
                        return cycLength;
                    }
                }

            }
            slow = slow.next;
            fast = fast.next.next;
        }


    }

    cycleStart() {
        if (this.head == null || this.head.next == null) return this.head;

        //find if there is cycle using cycledList method
        let slow = this.head;
        let fast = this.head;
        let cycLength = 0;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) {
                //at meeting point run another loop to find length - Educative
                let curr = slow;

                while (true) { // Revise again 
                    cycLength += 1;
                    curr = curr.next;
                    if (slow == curr) {
                        break;
                    }
                }
                break;
            }

        }

        //find start point  

        let pointer1 = this.head;
        let pointer2 = this.head;
        //remember to move pointer2 ahead 'cycle_length' nodes, not on the node , it should be ahead
        // Ex. 1,2,3,4,5,6, cycleLen =4
        // So point2 should be at 5, Move pointer2 ahead by ‘K’ nodes.

        while (cycLength > 0) {
            pointer2 = pointer2.next;
            cycLength--;
        }

        // increment both pointers until they meet at the start of the cycle
        while (pointer1 !== pointer2) {
            pointer1 = pointer1.next;
            pointer2 = pointer2.next;
        }
        return pointer1;
    }

    printList() {
        if (this.head == null) return "Empty";
        let strBuilder = "";

        let curr = this.head;
        while (curr != null) {
            strBuilder += curr.val + '->';
            curr = curr.next;
        }
        strBuilder += "->" + curr;
    }

}

let ll = new LinkedList();
for (let i = 0; i < 5; i++) {
    ll.insertAtTail(i)
}
console.log(ll.printList());



