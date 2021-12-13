
class Node {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}
//252	 Meeting Rooms.js |  Determine if the person could attend all meeting -VVVVVVVVVIMP
//Easy with Bruteforce 
function canAttendAll(intervals) {
    if (!intervals || intervals.length < 2) return true;

    intervals.sort((a, b) => a.start - b.start);

    for (let i = 1; i < intervals.length; i++) {
        if (intervals[i].start < intervals[i - 1].end) return false;
    }
    return true;
}

//-------------------------------------Second Variant- A wants to meet B particular interval? Check If B is free ot not----------------------------
//Binary Search Way - Learn - My Favorite questioon
class BinarySearchTree {
    constructor() {
        this.root = null;
    }


    insert(start, end) {
        if (this.root == null) {
            this.root = new Node(start, end)
            return true
        }
        let newNode = new Node(start, end);
        return this.addNode(this.root, newNode)
    }
    addNode(currNode, newNode) {
        //start and end times of User B’s scheduled meetings, which are non-overlapping.(important), otherwise it will not work
        if (newNode.start >= currNode.end) {
            if (currNode.right == null) {
                currNode.right = newNode;
                return true
            } else {
                return this.addNode(currNode.right, newNode);
            }
        } else if (newNode.end <= currNode.start) {
            if (currNode.left == null) {
                currNode.left = newNode
                return true
            } else {
                return this.addNode(currNode.left, newNode)
            }
        } else {
            return false;
        }
    }
}


function checkMeeting(meetingTimes, newMeeting) {
    var tree = new BinarySearchTree()
    meetingTimes.forEach((meeting) => {
        tree.insert(meeting[0], meeting[1])//You will be given an array of start and end times of User B’s scheduled meetings, which are non-overlapping.
    })
    return tree.insert(newMeeting[0], newMeeting[1])
}
var meetingTimes = [[1, 3], [4, 6], [8, 10], [10, 12], [13, 15]]
var newMeeting = [7, 8]
console.log(checkMeeting(meetingTimes, newMeeting));//true

/*
For this feature, we want to program a function that will let User A know if it is possible to schedule a meeting
 with User B or not. This decision will be made based on User B’s meeting schedule. If the new meeting’s
time overlaps with an existing meeting in User B’s schedule, then the new meeting can not be scheduled.

 */


