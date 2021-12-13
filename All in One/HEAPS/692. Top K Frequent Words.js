
var topKFrequent = function (words, k) {
    let countMap = new Map();

    for (let i = 0; i < words.length; i++) {
        countMap.set(words[i], countMap.get(words[i]) + 1 || 1);
    }

    //VVIMP: 
    //Step1: Created MinHeap to keep larger frequency in HEAP and remove lower freq.
    //Step2: If freq is equal then sort lexicographical order: strategy to keep lower words at top to remove
    let comparator = ((a, b) => {

        let compareFreq = countMap.get(a) - countMap.get(b);

        if (compareFreq == 0) {
            if (a > b) {
                return -1;
            } else if (a < b) {
                return 1
            } else {
                return 0
            }
        }
        return compareFreq;
    });

    let minHeap = new PriorityQueue(comparator);

    //add only unique words in heap to limit size
    for (let [key, value] of countMap.entries()) {

        minHeap.add(key);

        if (minHeap.size() > k) {
            minHeap.poll();
        }
    }

    let result = [];
    while (k > 0) {
        result.push(minHeap.poll());
        k--;
    }

    return result.reverse();//sorted by the frequency from highest to lowest
};

class PriorityQueue {
    storage = [];

    constructor(comparator) {
        this.compare = comparator;
    }

    _swap(i, j) {
        let item = this.storage;
        [item[i], item[j]] = [item[j], item[i]];
    }

    getParent(index) {
        if (index % 2 == 0) {
            return (index - 2) / 2;
        } else {
            return (index - 1) / 2;
        }
    }

    add(item) {
        this.storage.push(item);
        let index = this.storage.length - 1;
        while (index > 0) {
            let parent = this.getParent(index);
            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                this._swap(index, parent);
                index = parent;
            } else {
                //no need to further require parent
                break;
            }
        }
    }

    _exist(index) {
        return this.storage[index] != undefined;
    }

    getChild(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;

        let leftchildStatus = this._exist(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
        let rightChildStatus = this._exist(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

        if (!leftchildStatus && !rightChildStatus) return undefined;

        if (leftchildStatus && rightChildStatus) {
            if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        } else if (leftchildStatus) {
            return leftChildIndex;
        } else {
            return rightChildIndex;
        }
    }

    poll() {

        if (this.storage.length < 2) return this.storage.pop();

        //remove 0 index but array pop  from end , so swap
        let lastIndex = this.storage.length - 1;
        this._swap(0, lastIndex);

        let item = this.storage.pop();
        let index = 0;

        //bubble down
        while (index < this.storage.length) {
            let child = this.getChild(index);

            if (child == null) break;
            this._swap(index, child);
            index = child;
        }


        return item;
    }

    size() {
        return this.storage.length;
    }
}


/* Brute force approach */
var topKFrequent = function (words, k) {

    //O(n)
    const countMap = new Map();

    //O(n)
    const uniqueWords = [];


    for (let i = 0; i < words.length; i++) {
        countMap.set(words[i], countMap.get(words[i]) + 1 || 1);
    }

    for (let key of countMap.keys()) uniqueWords.push(key);
    //or for (let [key] of countMap) uniqueWords.push(key);


    //O(nlogn)
    uniqueWords.sort((word1, word2) => {

        const count1 = countMap.get(word1);
        const count2 = countMap.get(word2);

        if (count1 > count2) {
            return -1;
        } else if (count1 < count2) {
            return 1;
        } else {
            if (word1 < word2) {
                return -1
            } else if (word1 > word2) {
                return 1;
            } else {
                return 0;
            }
        }
    });

    console.log(uniqueWords)

    //O(k)
    return uniqueWords.slice(0, k);


}

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2))



