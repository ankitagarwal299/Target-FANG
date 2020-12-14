var Node = function (key, value) {
    this.prev = null;
    this.next = null;
    this.key = key;
    this.value = value;
}

var DoublyLinkedList = function () {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;

    this.insertHead = function (node) {
        node.prev = this.head;
        node.next = this.head.next;
        this.head.next.prev = node;//this should always come before remember
        this.head.next = node;
    }

    this.moveToHead = function (node) {
        this.removeNode(node);
        this.insertHead(node);
    }

    this.removeNode = function (node) {
        let prev = node.prev;
        let next = node.next;
        prev.next = next;
        next.prev = prev;
    }

    this.removeTail = function () {
        let tail = this.tail.prev;
        this.removeNode(tail);
        return tail.key;
    }

}

var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.dll = new DoublyLinkedList();
    this.hashMap = new Map();
    this.currentSize = 0;

    this.get = function (key) {
        let node = this.hashMap.get(key);
        if (!node) return -1;

        //already in hashMap
        this.dll.moveToHead(node);
        return node.value;
    }

    this.put = function (key, value) {
        let node = this.hashMap.get(key);
        if (node == null) {
            let newNode = new Node(key, value);
            this.hashMap.set(key, value);
            if (this.currentSize > this.capacity) {
                let tailKey = this.dll.removeTail();
                this.hashMap.delete(tailKey);
                this.currentSize--;
            }
        } else {
            //already exists
            node.value = value;
            this.dll.moveToHead(node);
        }
    }
}


/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
