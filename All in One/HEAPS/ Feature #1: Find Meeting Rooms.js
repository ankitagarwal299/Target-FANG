//	253	Meeting Rooms II


/* Steps:
1. Maintain an array to calculate minimum endtime for all conflicting meetings endTime =[]
2. Sort meetings by start time
3. Add first meeting end time into endTime array
4. Compare next meeting start time with min end time
    a. If meeting conflict then add end time of the meeting into endTime array
    b. If meeting is not conflict, then we can have next meeting in the same room, after the minim entime meeting is finished, update min end time with next meeting endtime array.
    c. Sort the meeting endtime to find the minimum endtime
5. endtime array is the total rooms required for meeting

eg
 */


function minMeetingRooms(meetingTimes) {
    let comparator = ((a, b) => a - b);
    var heap = new PriorityQueue(comparator);


    if (meetingTimes == null || meetingTimes.length == 0) {
        return 0;
    }

    meetingTimes.sort(function (a, b) {
        return a[0] != b[0] ? a[0] - b[0] : a[1] - b[1];
    });

    for (var i = 0; i < meetingTimes.length; i++) {
        if (heap.storage.length == 0) {
            heap.add(meetingTimes[i][1]);//add end time
        } else if (heap.peek() > meetingTimes[i][0]) {
            heap.add(meetingTimes[i][1]); //new room created
        } else {
            heap.remove();
            heap.add(meetingTimes[i][1]); //old room is used for this meeting, and add this meeting end time
        }

    }

    return heap.storage.length;
}








var meetingTimes = [[2, 8], [3, 4], [3, 9], [5, 11], [8, 20], [11, 15]]
console.log(minMeetingRooms(meetingTimes))

//https://www.youtube.com/watch?v=PWgFnSygweI

//Better Code - pepcoding
//https://www.youtube.com/watch?v=NKf1OJhEZj0

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

    peek() {
        return this.storage[0];
    }
}