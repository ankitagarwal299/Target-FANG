//JSer
//Map in JS keeps order

/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
    this.capacity = capacity;
    this.map = new Map();
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
    if (this.map.has(key)) {
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }

    return -1;
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {

    //if exists update
    const prevVal = this.map.get(key);
    if (prevVal == -1) {
        if (this.map.size == this.capacity) {
            //remove least used
            for (let [firstKey] of this.map) {
                this.map.delete(firstKey);
                break;
            }
        }
    }


    this.map.set(key, value);
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */