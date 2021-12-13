
//---- Only head Node
"use strict";
class Node {
    constructor(value, next) {
        this.data = value;
        this.nextElement = next;
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

    isEmpty() {
        if (this.head == null) return true;
    }

    // 1.Insertion at the head
    // 2.Insertion at the tail
    // 3.Insertion at the N-th index
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

    //--IMP, 3 conditions
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

        while (curr != null && count < position) {//imp
            prev = curr;
            curr = curr.nextElement;
            count++;
        }

        if (count < position) return "Out of bound";


        prev.nextElement = node;
        node.nextElement = curr;

        return this.head;
    }

    //function to print the linked list
    printList() {
        let str = "";
        if (this.isEmpty()) {
            console.log("Empty List");
            return false;
        } else {
            let temp = this.head;
            while (temp != null) {
                str += temp.data + '-->';
                temp = temp.nextElement;

            }
            str += null
            console.log("Result", str);
            return str;
        }
    }


}
let list = new LinkedList();
for (var i = 0; i < 5; i++) {
    list.insertAtTail(i);
}
list.printList(); //will print the list

list.insertAtNth(20, 1);
list.printList(); //will print the list

list.insertAtNth(25, 3);
list.printList(); //will print the list

list.insertAtNth(5, 8);
list.printList(); //will print the list

console.log(list.insertAtNth(1, -1))
list.printList(); //will print the list


console.log(list.insertAtNth(1, 20))
list.printList(); //will print the list



