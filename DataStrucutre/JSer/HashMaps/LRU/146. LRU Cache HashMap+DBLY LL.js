//https://leetcode.com/problems/lru-cache/discuss/446715/JavaScript-Solution
//Excellent
var Node = function (key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
}

/* DoublyLinkedList Class
    @constrcutor initialize head & tail
    @action insertHeqad
    @action removeHead
    @action moveToHEad
    @action removeTail
 */
var DoublyLinkedList = function () {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
}

/*
    Insert a new node right after head
    @param {Node} node
*/
DoublyLinkedList.prototype.insertHead = function (node) {
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
}

/*
    Remove a node from the linked list
    @param {Node} node
 */
DoublyLinkedList.prototype.removeNode = function (node) {
    let prev = node.prev;
    let next = node.next;
    prev.next = next;
    next.prev = prev;
}

/*
    Move a node to the head
    @param {Node} node
 */
DoublyLinkedList.prototype.movetoHead = function () {
    this.removeNode(node);
    this.insertHead(node);
}

/*
    Remove the tail element and return its key
    @return {String}
*/
DoublyLinkedList.prototype.removeTail = function () {
    let tail = this.tail.prev;
    this.removeNode(tail);
    return tail.key;
}

/* 
    @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.currentSize = 0;
    this.hash = new Map();
    this.dll = new DoublyLinkedList();
}

/*
    @param {number} key
    @return {number}
*/
LRUCache.prototype.get = function (key) {
    let node = this.hash.get(key);
    if (!node) return -1;
    this.dll.movetoHead(node);
    return node.value;
}

/* 
    @param {number} key
    @param {number} value
    @return {void}
*/
LRUCache.prototype.put = function (key, value) {
    let node = this.hash.get(key);
    if (node == null) {//new node
        let newNode = new Node(key, value);
        this.hash.set(key, newNode);
        this.dll.insertHead(newNode);
        this.currentSize++;
        if (this.currentSize > this.capacity) {
            let tailKey = this.removeTail();
            this.hash.delete(tailKey);
            this.currentSize--;
        }
    } else {
        node.value = value;
        this.dll.movetoHead(node);
    }
}





/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */