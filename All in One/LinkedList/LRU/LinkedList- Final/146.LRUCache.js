//https://leetcode.com/problems/lru-cache/discuss/446715/JavaScript-Solution
class Node {
    constructor(key, value) {
        this.key = key != undefined ? key : undefined;
        this.value = value != undefined ? value : undefined;
        this.prev = this.next = null;
    }
}

class DLL {
    constructor() {
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    insertHead(node) {

        let next = this.head.next;
        this.head.next = node;

        next.prev = node;
        node.prev = this.head;
        node.next = next;
    }

    removeNode(node) {
        let prev = node.prev;
        let next = node.next;
        prev.next = next;
        next.prev = prev;

        node.prev = null;
        node.next = null;
    }

    shiftToHead(node) {
        this.removeNode(node);
        this.insertHead(node);
    }

    removeFromTail() {
        let prev = this.tail.prev;
        this.removeNode(prev);
        return this.prev.key;//return to remove from hashmap
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.dll = new DLL();
        this.hashMap = new Map();
        this.size = 0;
    }

    put(key, value) {
        let node = this.hashMap.get(key);
        if (node) {
            node.value = value;
            this.dll.shiftToHead(node);
            return;
        }

        newnode = new Node(key, value);

        if (this.size == this.capacity) {
            this.hashMap.delete(this.dll.removeFromTail());//return key and then del
            this.size--;
        }
        this.hashMap.set(key, newnode);
        this.dll.insertHead(newnode);
        this.size++;
    }

    get(key) {
        let node = this.hashMap(key);
        if (node) {
            this.dll.shiftToHead(node);
            return node.value;
        }

    }
}