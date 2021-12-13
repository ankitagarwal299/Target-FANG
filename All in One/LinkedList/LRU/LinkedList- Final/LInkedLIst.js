class Node {
    constructor(val) {
        this.value = val;
        this.next = null;
    }
}

class LInkedLIst {
    constructor() {
        this.root = null;
    }

    insertAtTail(val) {
        if (this.root == null) {
            this.root = new Node(val);
            return;
        }
        let curr = this.root;

        while (curr.next != null) {
            curr = curr.next;
        }

        curr.next = new Node(val);
    }

    insertAtHead(data) {

        if (this.root == null) {
            this.root = new Node(val);
            return;
        }

        let curr = this.root;
        let newNode = new Node(data);

        newNode.next = curr;
        this.root = newNode;
    }



    insertAtNth(data, index) {
        if ((this.root == null && index > 1) || index < 1) return "Invalid poistion";



        if (index == 1) {
            let curr = this.root;
            let newNode = new Node(data);
            newNode.next = curr;
            this.root = newNode;
        }

        let prev = null;
        let curr = this.root;
        let count = 1;

        while (curr != null && count < index) {
            prev = curr;
            curr = curr.next;
            count++;
        }

        if (count < index) return "Out of Bounds";

        prev.next = new Node(val);
        prev.next.next = curr;

        return true;
    }

    search(val) {
        if (this.root == null) return null;

        let curr = this.root;
        while (curr != null) {
            if (curr.val == val) return true;;
            curr = curr.next;
        }
        return false;

    }

    //237. Delete Node in a Linked List
    deleteNode = function (node) {
        //not be given access to the head of the list,given access to the node to be deleted directly.
        let curr = node;
        curr.val = curr.next.val;

        //delete next node
        curr.next = curr.next.next;
    };

    //only changing reference
    //203. Remove Linked List Elements
    //83. Remove Duplicates from Sorted List
    removeElements = function (head, val) {
        if (head == null || val == undefined) return head;

        let dummy = new ListNode(-Infinity);
        let prev = dummy;

        let curr = head;
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
    };

    //1836. Remove Duplicates From an Unsorted Linked List - 2ways either mergesort or maintain hash
    removeDuplicatesUnSortedList(head) {
        if (head == null || head.next == null) return head;
        let hashSet = new Set();

        let dummy = new ListNode(-Infinity);
        let prev = dummy;
        let curr = head;

        while (curr != null) {
            if (hashSet.has(curr.val)) {
                curr = curr.next;
                prev.next = null;// no link with next, good for edge cases or at the end
            } else {
                hashSet.add(curr.val);
                prev.next = curr;
                prev = curr;
                curr = curr.next;
            }

        }

        return dummy.next
    }



    //141. Linked List Cycle - Easy
    hasCycle = function (head) {
        if (head == null || head.next == null) return false;

        let slow = head;
        let fast = head;

        while (fast.next != null && fast.next.next != null) {
            slow = slow.next;
            fast = fast.next.next;

            if (slow == fast) {//check afterwards
                return true;
            }
        }
        return false;
    };

    //142. Linked List Cycle II - VVVIMp
    detectCycle = function (head) {
        if (head == null || head.next == null) return null;
        let totalLength = 0;


        /* detect cycle and find length of cycle */
        function detectCycleII(head) {
            let slow = head;
            let fast = head;
            while (fast.next != null && fast.next.next != null) {
                slow = slow.next;
                fast = fast.next.next;

                if (slow == fast) {
                    //find the length of the cycle
                    let cycleLength = 0;//NOTE this
                    let curr = slow;

                    while (true) {
                        curr = curr.next;
                        cycleLength++;
                        if (curr == slow) {
                            break;
                        }

                    }
                    totalLength = cycleLength;
                    return true;
                }


            }
            return false;
        }


        if (detectCycleII(head)) {
            //find start point using cycleLength
            let pointer1 = head;
            let pointer2 = head;

            while (totalLength > 0) {
                pointer2 = pointer2.next;
                totalLength--;
            }

            while (pointer1 != pointer2) {
                pointer1 = pointer1.next;
                pointer2 = pointer2.next;
            }

            return pointer1
        }

        return null;
    };

    //876. Middle of the Linked List
    middleNode = function (head) {
        if (head == null || head.next == null) return head;

        let slow = head;
        let fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;

        /* To find middle for odd and even number */
        /* eg [1,2,3,4,5,6] return (4) or [1,2,3,4,5]return 3 */
    };


    //82. Remove Duplicates from Sorted List II, remove all occurence of repeated chars
    //https://www.youtube.com/watch?v=7PGsMXlMzGA&t=643s
    //eg.[1, 1], [1,2,3,3,4,4,5], [1,1,1,1,1]
    deleteDuplicates = function (head) {
        if (head == null || head.next == null) return head;

        let dummy = new ListNode(-Infinity);

        let prev = dummy;

        let curr = head.next;
        prev.next = head;//potential next element

        while (curr != null) {
            if (prev.next.val == curr.val) {
                curr = curr.next;

            } else {
                prev = prev.next
                curr = curr.next;
            }
        }
        return dummy.next;
    };

    //23. Merge k Sorted Lists
    mergeKLists = function (lists) {
        if (lists == null || lists.length == 0) return null;
        if (lists.length == 1) return lists[0]

        let dummy = new ListNode(-Infinity);
        let curr = dummy;

        let minHeap = new PriorityQueue((a, b) => a[1] - b[1]);

        for (let i = 0; i < lists.length; i++) {
            if (lists[i]) {
                minHeap.add([i, lists[i].val]);
                lists[i] = lists[i].next;//imp
            }
        }

        while (minHeap.size() > 0) {
            let arr = minHeap.poll()
            curr.next = new ListNode(arr[1]);
            curr = curr.next;

            if (lists[arr[0]]) {
                minHeap.add([arr[0], lists[arr[0]].val]);
                lists[arr[0]] = lists[arr[0]].next;//imp
            }
        }

        return dummy.next;
    };
    //[[],[]
    //[[]]
    //[[1]]

    //19. Remove Nth Node From End of List
    removeNthFromEnd = function (head, n) {
        if (head == null) return null;

        let slow = head;
        let fast = head;

        for (let i = 0; i < n; i++) {
            if (fast == null) return null;//----- Impoortant 
            fast = fast.next;
        }

        /* Since we will need access to the node before the target node in order to remove the target node, we can use fast.next == null as our exit condition, 
        rather than fast == null, so that we stop one node earlier.

        This will unfortunately cause a problem when n is the same as the length of the list, which would make the first node the target node, and thus make it impossible to find the node before the target node. 
        If that's the case, however, we can just return head.next without needing to stitch together the two sides of the target node.

       */
        if (!fast) return head.next;///Extreme case import eg [1] and n=1 , https://leetcode.com/problems/remove-nth-node-from-end-of-list/discuss/1164542/JS-Python-Java-C%2B%2B-or-Easy-Two-Pointer-Solution-w-Explanation

        while (fast && fast.next != null) {//one before null as we dont want to stand on removal node
            fast = fast.next;
            slow = slow.next;
        }

        //removing process
        let target = slow.next;
        slow.next = slow.next.next;


        target.next = null;

        return head;
    };


    //1721. Swapping Nodes in a Linked List - I did myself
    swapNodes = function (head, k) {
        let counter = k;

        if (head == null || head.next == null) return head

        let kthfromBeg = null;
        let curr = head;
        while (counter > 1) {//this is important , calculation is differnt (2nd node from start)
            if (curr == null) return null; //out of bounds
            curr = curr.next;
            counter--;
        }
        kthfromBeg = curr;
        console.log("hi", counter)

        counter = k; // reinitialize

        let kthfromEnd = null;
        let slow = head;
        let fast = head;
        while (counter > 0) {//this is important , calculation is differnt (2nd node from END)
            if (fast == null) return null; //out of bounds
            fast = fast.next;
            counter--
        }

        //hop 1 step at a time
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        kthfromEnd = slow;

        //swap values
        let temp = kthfromEnd.val;
        kthfromEnd.val = kthfromBeg.val;
        kthfromBeg.val = temp;


        return head
    };

    //206. Reverse Linked List -Easy
    reverseList = function (head) {
        if (head == null || head.next == null) return head;

        let prev = null;
        let curr = head;

        while (curr != null) {
            let next = curr.next;

            curr.next = prev;

            prev = curr;
            curr = next;

        }

        head = prev;

        return head

    };

    //206. Reverse Linked List-using addFirst method -Watch video - Easy
    //https://www.youtube.com/watch?v=TOztSNeXZuw
    reverseList = function (head) {
        if (head == null || head.next == null) return head;

        let tempHead = null;
        let tempTail = null;

        function addFirst(node) {
            if (tempHead == null) {
                tempHead = node;
                tempTail = node;
            } else {
                node.next = tempHead;
                tempHead = node;
            }
        }


        let curr = head;
        while (curr != null) {
            let next = curr.next;//store next node reference
            curr.next = null;//cut this node from chain
            addFirst(curr);
            curr = next;
        }

        return tempHead;
    };

    //25. Reverse Nodes in k-Group- VVIMP and Easy- thank you Pepcodin Rajneesh Sir
    //https://www.youtube.com/watch?v=EKgNMFCShO8

    reverseKGroup = function (head, k) {
        if (head == null || head.next == null) return head;

        let tempHead = null;
        let tempTail = null;
        function addFirst(node) {
            if (tempHead == null) {
                tempHead = node;
                tempTail = node;
            } else {
                node.next = tempHead;
                tempHead = node;
            }
        }



        function length(node) {
            let curr = node;
            let counter = 0;
            while (curr != null) {
                counter++;
                curr = curr.next;
            }
            return counter;
        }


        let listLen = length(head);
        let origHead = null;
        let origTail = null;

        let curr = head;

        while (listLen >= k) {
            let tempK = k;
            while (tempK > 0) {
                let next = curr.next;

                curr.next = null;
                addFirst(curr);
                curr = next;

                tempK--;
            }
            if (origHead == null) {
                origHead = tempHead;
                origTail = tempTail;
            } else {
                origTail.next = tempHead;
                origTail = tempTail
            }

            tempHead = null;
            tempTail = null;

            listLen = listLen - k;
        }

        //in the end some node are left, then connect
        origTail.next = curr;

        return origHead;
    };

    /* Do it again, 2 edge cases */
    /* 
        eg1: [1,2,3] l=1, r=1 
        eg1: [3,5] l=1, r=2
    */
    reverseBetween = function (head, left, right) {
        if (head == null || head.next == null) return head;

        let tempHead = null;
        let tempTail = null;
        function addFirst(node) {
            if (tempHead == null) {
                tempHead = node;
                tempTail = node;
            } else {
                node.next = tempHead;
                tempHead = node;
            }
        }

        let dummy = new ListNode(-Infinity);

        let counter = 1;
        let curr = head;
        let prev = dummy;


        while (counter <= right) {

            while (counter >= left && counter <= right) {


                let next = curr.next;
                curr.next = null;
                addFirst(curr);
                curr = next;
                counter++;
            }

            if (tempHead == null) {
                prev = curr;

                counter++;
            } else {
                prev.next = tempHead;
                tempTail.next = curr;


            }

            if (curr != null) curr = curr.next;


        }

        return left == 1 ? dummy.next : head;
    }


    //Floyd's method--- Tryiing to solve 160. Intersection of Two Linked Lists , but leetcode is throwing undefined, but here i learn unique way to find start of the cycle
    getIntersectionNode = function (headA, headB) {
        if (headA == null || headB == null) return 0;

        function startingNodeOfCycle(node) {
            console.log("inside")
            if (node == null || node.next == null) return null;
            let slow = node;
            let fast = node;

            while (fast != null && fast.next != null) {
                slow = slow.next;
                fast = fast.next.next;

                if (slow == fast) break;
            }

            if (slow != fast) return null;

            slow = node;//reset
            fast = fast;//keep fast pointer in same poositioon

            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            console.log("left", slow.val)
            return slow.val;//this is the starting position

        }



        let tail = headA;
        while (tail.next != null) {
            tail = tail.next;
        }
        tail.next = headB;

        let startNode = startingNodeOfCycle(headA);
        console.log("outside", startNode)
        tail.next = null;//important



        return startNode;


    };

    //160. Intersection of Two Linked Lists- Correct way
    //https://www.youtube.com/watch?v=B4aqNarb0QQ
    getIntersectionNode = function (headA, headB) {
        if (headA == null || headB == null) return 0;

        function lengthofLL(node) {
            let counter = 1;
            let curr = node;
            while (curr != null) {
                curr = curr.next;
                counter++

            }
            return counter;

        }

        let headAlen = lengthofLL(headA)
        let headBlen = lengthofLL(headB)

        let diff = Math.abs(headAlen - headBlen);

        let pointer1 = headA;
        let pointer2 = headB;
        if (headAlen > headBlen) {

            for (let i = 0; i < diff; i++) {
                pointer1 = pointer1.next;
            }

        } else {

            for (let i = 0; i < diff; i++) {
                pointer2 = pointer2.next;
            }
        }

        while (pointer1 != pointer2) {
            pointer1 = pointer1.next;
            pointer2 = pointer2.next;
        }
        return pointer1;
    };

    //21. Merge Two Sorted Lists
    mergeTwoLists = function (l1, l2) {
        if (l1 == null || l2 == null) return l1 ? l1 : l2;

        let dummy = new ListNode(-Infinity);
        let prev = dummy;

        let curr1 = l1;
        let curr2 = l2;

        while (curr1 != null && curr2 != null) {
            if (curr1.val < curr2.val) {
                prev.next = curr1;
                curr1 = curr1.next;

            } else {
                prev.next = curr2;
                curr2 = curr2.next;
            }

            prev = prev.next;//this i forget to increase
        }

        prev.next = (curr1 != null) ? curr1 : curr2;

        return dummy.next;

    };

    //merge sorting linked list 
    /* STEPS
        1. using find mid, 
        2. recursive call to mersesort and 
        3. then finally return merge2list 
    */
    mergeSortLL(head) {
        if (head == null || head.next == null) return head;

        function midNode(head) {
            if (head == null || head.next == null) return head;

            let slow = head;
            let fast = head;

            while (fast != null && fast.next != null) {
                slow = slow.next;
                fast = fast.next.next;
            }
            return slow;
        }

        function merge2Lists(l1, l2) {
            if (l1 == null || l2 == null) return l1 ? l1 : l2;

            let dummy = new ListNode(-Infinity);
            let prev = dummy;

            let curr1 = l1;
            let curr2 = l2;

            while (curr1 != null && curr2 != null) {
                if (curr1.val < curr2.val) {
                    prev.next = curr1;
                    curr1 = curr1.next;
                } else {
                    prev.next = curr2;
                    curr2 = curr2.next;
                }
                prev = prev.next;//imp
            }

            //i foget if any list get empty before other
            prev.next = curr1 ? curr1 : curr2;

            return dummy.next;
        }

        let midNode = midNode(head);
        let nextHead = midNode.next;
        midNode.next = null;//important1 break list

        let l1 = mergeSortLL(head);//important2 recursive call
        let l2 = mergeSortLL(nextHead);//important3 recursive call

        return merge2Lists(l1, l2);
    }

    // Odd EVEN SEGGREGATE BY VALUE | Segregate 01 Node of LinkedList 
    //https://www.youtube.com/watch?v=j_w83pJ6Px0&list=PL-Jc9J83PIiGRqcfZxxgOKovgLVd3znnq&index=29
    oddEvenList = function (head) {
        if (head == null || head.next == null) return head;

        let evenHead = new ListNode(-Infinity);
        let prevEven = evenHead;

        let oddHead = new ListNode(-Infinity);
        let prevOdd = oddHead;

        let curr = head;
        while (curr != null) {
            if (curr.val % 2 == 0) {
                //even
                prevEven.next = curr;
                prevEven = prevEven.next;
            } else {
                prevOdd.next = curr;
                prevOdd = prevOdd.next;
            }
            curr = curr.next;
        }
        //avoid circular loop
        prevEven.next = null;
        prevOdd.next = null;


        prevOdd.next = evenHead.next;//all odd first followed by evens, attach Odd last node to Even HEAD

        return oddHead.next;// return odd head
    };

    //328. Odd Even Indices |  reordered list. - Very Easy
    oddEvenList = function (head) {
        if (head == null || head.next == null) return head;

        let evenHead = new ListNode(-Infinity);
        let prevEven = evenHead;

        let oddHead = new ListNode(-Infinity);
        let prevOdd = oddHead;

        let dummy = new ListNode(-Infinity);

        let counter = 1;
        let curr = head;
        while (curr != null) {
            if (counter % 2 == 0) {
                //even
                prevEven.next = curr;
                prevEven = prevEven.next;
            } else {
                prevOdd.next = curr;
                prevOdd = prevOdd.next;
            }
            curr = curr.next;
            counter++
        }
        //avoid circular loop
        prevEven.next = null;
        prevOdd.next = null;

        prevOdd.next = evenHead.next;

        return oddHead.next
    };

    //2. Add Two Numbers - Very easy and good questioons
    //https://www.youtube.com/watch?v=pmS2GAlRNNk&list=PL-Jc9J83PIiGRqcfZxxgOKovgLVd3znnq&index=22
    addTwoNumbers = function (l1, l2) {
        if (l1 == null || l2 == null) return l1 ? l1 : l2;
        let curr1 = l1;
        let curr2 = l2;

        let dummy = new ListNode(-Infinity);
        let prev = dummy;

        let carry = 0;
        while (curr1 != null || curr2 != null || carry != 0) {

            //let sum = curr1.val + curr2.val + carry;
            let sum = (curr1 ? curr1.val : 0) + (curr2 ? curr2.val : 0) + carry;

            carry = Math.floor(sum / 10);
            let value = sum % 10;

            prev.next = new ListNode(value);
            prev = prev.next;

            if (curr1 != null) curr1 = curr1.next;
            if (curr2 != null) curr2 = curr2.next;


        }

        return dummy.next;//imp

    };

    //445. Add Two Numbers II | Here we need to reverse(l1), reverse(l2) and reverse(dummy.next) that's it
    addTwoNumbers = function (l1, l2) {
        if (l1 == null || l2 == null) return l1 ? l1 : l2;

        function reverse(node) {
            if (node == null || node.next == null) return node;


            let prev = null;//always think of dummy, iinstead it should be null

            let curr = node;
            while (curr != null) {
                let next = curr.next;

                curr.next = prev;

                prev = curr;
                curr = next;

            }
            return prev;
        }

        let curr1 = reverse(l1);
        let curr2 = reverse(l2);


        let dummy = new ListNode(-Infinity);
        let prev = dummy;

        let carry = 0;
        while (curr1 != null || curr2 != null || carry != 0) {

            //let sum = curr1.val + curr2.val + carry;
            let sum = (curr1 ? curr1.val : 0) + (curr2 ? curr2.val : 0) + carry;

            carry = Math.floor(sum / 10);
            let value = sum % 10;

            prev.next = new ListNode(value);
            prev = prev.next;

            if (curr1 != null) curr1 = curr1.next;
            if (curr2 != null) curr2 = curr2.next;


        }
        return reverse(dummy.next);
    };

    //234. Palindrome Linked List; findMid , then break list, then reverse other list and then restore
    //change in startegy to get mid value as compared to question 876
    //eg [1,2,3,9,8,9,3,2,1]//true , [1,1,2,1]//false
    isPalindrome = function (head) {
        if (head == null || head.next == null) return true;

        function findMid(head) {
            if (head == null || head.next == null) return head;

            let slow = head;
            let fast = head;

            //change in startegy to get mid value as compared to question 876
            /* [1,1,2,1] , mid = 1,
            [1,2,3,9,8,9,3,2,1] , mid = 8
             */
            while (fast.next != null && fast.next.next != null) {//IMPR, read comments above
                slow = slow.next;
                fast = fast.next.next;
            }
            return slow;
        }

        function reverse(node) {
            let prev = null;
            let curr = node;
            while (curr != null) {
                let next = curr.next;

                curr.next = prev;

                prev = curr;
                curr = next;
            }

            return prev;
        }


        let mid = findMid(head);
        let nHead = mid.next;//hold next node
        mid.next = null;//break the list


        nHead = reverse(nHead);

        let curr1 = head;
        let curr2 = nHead;

        let result = true;
        while (curr1 != null && curr2 != null) {
            // while( curr2!=null){// trick : in odd scenario anyone list is unbalanced
            if (curr1.val != curr2.val) {
                result = false;
                break
            }
            curr1 = curr1.next;
            curr2 = curr2.next;
        }


        //restore linkedlist
        nHead = reverse(nHead);
        mid.next = nHead;


        return result;

    };

    //61. Rotate List - Most tricly past is to get prevIndex (practise this more)
    rotateRight = function (head, k) {
        if (head == null || head.next == null || k == 0) return head;//k==0, k can be negative

        function size(node) {
            let counter = 0;
            let curr = node;
            while (curr != null) {
                curr = curr.next;
                counter++
            }
            return counter;
        }
        let listlength = size(head);

        console.log("listlength", listlength)
        let rotations = k % listlength;

        if (rotations == 0) return head;

        if (rotations < 0) {
            //rotations = rotations + k;//wrong
            rotations = rotations + listlength;
        }

        //[1,2] ,1 --need to do below to pass this case
        let curr = head;
        let prevIndex = listlength - rotations;//Most tricly past is to get prevIndex
        while (prevIndex > 1) {//and stop at 
            curr = curr.next;
            prevIndex--;
        }

        let nHead = curr.next;//found head of 2nd list
        curr.next = null;//break 1st list and attach null as it will be added at the back

        let curr2 = nHead;
        while (curr2 != null && curr2.next != null) {
            curr2 = curr2.next;
        }

        curr2.next = head;//attached 1st at the back

        return nHead;//2nd list head

    };

    //1290. Convert Binary Number in a Linked List to Integer - Easy
    getDecimalValue = function (head) {
        console.log(head.val);
        if (head == null || head.next == null) return head ? head.val : head;

        console.log(head);

        function reverse(node) {
            if (node == null || node.next == null) return node;

            let prev = null;
            let curr = node

            while (curr != null) {
                let next = curr.next;

                curr.next = prev;

                prev = curr;
                curr = next;
            }
            return prev;
        }

        let curr = reverse(head);

        let sum = 0
        let counter = 0;
        while (curr != null) {
            sum = sum + Math.pow(2, counter) * curr.val;
            curr = curr.next;
            counter++;
        }

        return sum;

    };

    //109. Convert Sorted List to Binary Search Tree
    //same startegy to get mid value as compared to question 876, when getting palindrom we were changiing
    //Time O(nloogN)- we are itrating n elements and log for searching mid each time
    sortedListToBST = function (head) {
        if (head == null) {
            return null;
        }
        if (head.next == null) {
            return new TreeNode(head.val);
        }

        function findMid(node) {
            if (node == null || node.next == null) return node;

            let slow = node;
            let fast = node;
            let prev = null
            while (fast != null && fast.next != null) {//same as 876
                prev = slow;
                slow = slow.next;
                fast = fast.next.next;
            }

            prev.next = null;//only this part is important
            return slow;
        }


        let mid = findMid(head);
        let nHead = mid.next;
        mid.next = null;//break list later join



        let root = new TreeNode(mid.val);
        root.left = sortedListToBST(head);
        root.right = sortedListToBST(nHead);


        return root;
    };


    //Convert Sorted Doubly LinkedList to Balanced Binary Search Tree.js : Thiis should be solved with 109, no change required


    //426. Convert Binary Search Tree to Sorted Doubly Linked List.js (locked)
    //https://www.youtube.com/watch?v=WBsNE_DWk9U&t=1s
    //Todo



}


