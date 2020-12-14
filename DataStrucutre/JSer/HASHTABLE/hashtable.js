
HashTable.prototype.resize = function () {
    let newSlot = this.slots * 2;
    let newBucket = [];

    for (let i = 0; i < newSlot; i++) {
        newBucket[i] = null;
    }

    this.slots = newSlot;

    //rehash all items into new slots
    for (let i = 0; i < this.bucket.length; i++) {
        let head = this.bucket[i];

        while (head != null) {
            let newIndex = this.getIndex(head.key);
            if (newBucket[newIndex] == null) {
                newBucket[newIndex] = new HashEntry(head.key, head.value);
            } else {
                let node = newBucket[newIndex];
                while (node != null) {
                    if (node.key == head.key) {
                        //found same key then overwrite/replace value
                        node.value = head.value;
                    } else if (node.next == null) {
                        node.next = new HashEntry(head.key, head.value);
                        node = null;
                    } else {
                        //increment node pointer in a particular bucket
                        node = node.next;
                    }
                }
            }
            //increment head pointer
            head = head.next;
        }
    }
    //finally assign new bucket to original bucket
    this.bucket = newBucket;
}

HashTable.prototype.insert = function (key, value) {
    let threshold = 0.6;
    let b_Index = this.getIndex(key);
    if (this.bucket[b_Index] == null) {
        this.bucket[b_Index] = new HashEntry(key, value);
    } else {
        let head = this.bucket[b_Index];
        while (head != null) {
            if (head.key == key) {
                head.value = value;
                break;
            } else if (head.next == null) {
                head.next = new HashEntry(key, value);
                break;
            }
            head = head.next;
        }
    }
    this.size = +1;
    let loadFactor = Number(this.size) / Number(this.slots);
    //Checks if 60% of the entries in table are filled, threshold = 0.6
    if (load_factor >= threshold) {
        this.resize();
    }

}

HashTable.prototype.search = function (key) {
    let b_index = this.getIndex(key);
    let head = this.bucket[b_index];

    /* search key in the slots */
    if (head != null) {
        while (head != null) {
            if (head.key == key) {
                return head.value;
            }
            head = head.next;
        }
    }
    //if key not found 
    return null;
}

HashTable.prototype.delete = function (key) {
    let b_index = this.getIndex(key);
    let head = this.bucket[b_index];

    //if key exists in the first slot
    if (head != null && head.key == key) {
        this.bucket[b_index] = head.next;
        this.size -= 1;
        return;
    }


    //Find the key in slots
    let prev = null;
    while (head != null) {

        //if key exists
        if (head.key == key) {
            prev.next = head.next;
            this.size -= 1;
            return;
        }
        //Else keep moving chain
        prev = head;
        head = head.next;
    }

    //if key doesnot exists
    return;
}



class HashEntry {
    constructor(key, data) {
        this.key = key;
        this.value = data;
        this.next = null;
    }
}

class HashTable {
    constructor() {
        this.slots = 10;
        this.size = 0;
        this.bucket = [];
        for (let i = 0; i < this.slots; i++) {
            this.bucket[i] = null;
        }
    }

    /* Helper fn */
    get_size() {
        return this.size;
    }

    isEmpty() {
        return this.get_size() == 0;
    }

    getIndex(key) {
        let index = key % this.slots;
        return index;
    }
}