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



/* priority queue / heaps approach */
var topKFrequent = function (words, k) {
    const countMap = new Map();

    for (let i = 0; i < words.length; i++) {
        countMap.set(words[i], countMap.get(words[i]) + 1 || 1);
    }

    //for (let key of countMap.keys()) uniqueWords.push(key);

    /* create Priority Queue */
    let comparator = (word1, word2) => {

        const count1 = countMap.get(word1);
        const count2 = countMap.get(word2);

        if (count1 > count2) {
            return -1;
        } else if (count1 < count2) {
            return 1;
        } else {
            if (word1 < word2) {
                return -1;
            } else if (word1 > word2) {
                return 1;
            } else {
                return 0;
            }
        }
    }

    let pq = new PriorityQueue(comparator);

    for (let [word] of countMap) {
        pq.add(word);
        if (pq.size > k) {
            pq.poll();
        }
    }

    let result = pq.storage.slice();

    /* Minheap has different order , so we need in reverse order */
    //result.sort(comparator);//either this

    while (this.storage.length > 0) {
        result.push(pq.poll());
    }

    return result.reverse();
}

console.log(topKFrequent(["i", "love", "leetcode", "i", "love", "coding"], 2))


class PriorityQueue {
    storage = [];

    constructor(comparator) {
        this.compare = comparator;
    }

    get size() {
        return this.storage.length;
    }

    _exists(index) {
        return this.storage[index] != undefined;
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
        let index = this.size - 1;

        while (index > 0) {
            let parent = this.getParent(index);
            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                this._swap(index, parent);
                index = parent;
            } else {
                break;
            }
        }
    }

    getChild(index) {
        let leftChildIndex = 2 * index + 1;
        let rightChildIndex = 2 * index + 2;

        let shouldSwapWithLeft = this._exists(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;
        let shouldSwapWithRight = this._exists(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

        if (!shouldSwapWithLeft && !shouldSwapWithRight) return undefined;

        if (shouldSwapWithLeft && shouldSwapWithRight) {
            if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        } else if (shouldSwapWithLeft) {
            return leftChildIndex;
        } else if (shouldSwapWithRight) {
            return rightChildIndex;
        }
    }

    poll() {
        /* base consition  */
        if (this.size == 0 || this.size == 1) return this.storage.pop();

        this._swap(0, this.size - 1);
        let item = this.storage.pop();

        let index = 0;
        while (index < this.size) {
            let child = this.getChild(index);

            if (!child) break;

            this._swap(index, child);
            index = child;
        }


        return item;
    }
}
