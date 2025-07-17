class PriorityQueue {
    storage = []; // Array to store the elements in the heap

    // Constructor takes a comparator function to define heap behavior (min-heap or max-heap)
    constructor(comparator) {
        this.compare = comparator;
    }

    // Getter to return the size of the priority queue
    get size() {
        return this.storage.length;
    }

    // Helper function to check if a given index exists in the storage (i.e., not undefined)
    _exists(index) {
        return this.storage[index] != undefined;
    }

    // Helper function to swap two elements in the heap based on their indices
    _swap(i, j) {
        let item = this.storage;
        [item[i], item[j]] = [item[j], item[i]]; // Destructuring assignment to swap values
    }

    // Helper function to get the parent index of a node at a given index
    getParent(index) {
        // For even indices, the parent is at (index - 2) / 2, for odd indices it's (index - 1) / 2
        if (index % 2 == 0) {
            return (index - 2) / 2;
        } else {
            return (index - 1) / 2;
        }
    }

    // Method to add a new element to the heap
    add(item) {
        this.storage.push(item); // Add the new item at the end of the array
        let index = this.size - 1; // Get the index of the newly added item

        // Bubble up to maintain heap property
        while (index > 0) {
            let parent = this.getParent(index); // Get the parent index
            if (this.compare(this.storage[index], this.storage[parent]) < 0) {
                // If the child is smaller than the parent, swap them
                this._swap(index, parent);
                index = parent; // Move up to the parent index
            } else {
                break; // Stop if the heap property is restored
            }
        }
    }

    // Helper function to get the appropriate child index for swapping in heapify down process
    getChild(index) {
        let leftChildIndex = 2 * index + 1;  // Left child index
        let rightChildIndex = 2 * index + 2; // Right child index

        // Check if we should swap with the left child (if it exists and is smaller than the current element)
        let shouldSwapWithLeft = this._exists(leftChildIndex) && this.compare(this.storage[leftChildIndex], this.storage[index]) < 0;

        // Check if we should swap with the right child (if it exists and is smaller than the current element)
        let shouldSwapWithRight = this._exists(rightChildIndex) && this.compare(this.storage[rightChildIndex], this.storage[index]) < 0;

        // If no swapping is required, return undefined
        if (!shouldSwapWithLeft && !shouldSwapWithRight) return undefined;

        // If both children should be swapped, pick the smaller of the two
        if (shouldSwapWithLeft && shouldSwapWithRight) {
            if (this.compare(this.storage[leftChildIndex], this.storage[rightChildIndex]) < 0) {
                return leftChildIndex;
            } else {
                return rightChildIndex;
            }
        } else if (shouldSwapWithLeft) {
            return leftChildIndex; // Only swap with the left child
        } else if (shouldSwapWithRight) {
            return rightChildIndex; // Only swap with the right child
        }
    }

    // Method to remove and return the element with the highest priority (root of the heap)
    poll() {
        // Base case: if there's only one element or no element, return it directly
        if (this.size == 0 || this.size == 1) return this.storage.pop();

        // Swap the first (root) element with the last one, then pop the last one (to remove the root)
        this._swap(0, this.size - 1);
        let item = this.storage.pop(); // Remove and store the last element

        let index = 0; // Start from the root
        // Bubble down to restore the heap property
        while (index < this.size) {
            let child = this.getChild(index); // Get the child to swap with

            if (!child) break; // Stop if no children should be swapped

            this._swap(index, child); // Swap the current element with the chosen child
            index = child; // Move down to the child's index
        }

        return item; // Return the removed element
    }

    // Method to return the element with the highest priority without removing it
    peek() {
        if (this.size === 0) return undefined; // Return undefined if the queue is empty
        return this.storage[0]; // Return the root of the heap (highest priority element)
    }
}

// Example Usage:

// Default: Min-Heap (smaller numbers have higher priority)
const pqMin = new PriorityQueue((a, b) => a - b);
pqMin.add(10);
pqMin.add(31);
pqMin.add(2);
pqMin.add(3);
pqMin.add(4);
pqMin.add(5);
pqMin.add(6);

console.log(pqMin.poll());  // Output: 2
console.log(pqMin.poll());  // Output: 3
console.log(pqMin.poll());  // Output: 4
console.log(pqMin.poll());  // Output: 5
console.log(pqMin.poll());  // Output: 6

// Max-Heap (larger numbers have higher priority)
const pqMax = new PriorityQueue((a, b) => b - a); // Custom comparator for max-heap
pqMax.add(5);
pqMax.add(3);
pqMax.add(8);
pqMax.add(1);
console.log(pqMax.peek());  // Output: 8 (largest number)
console.log(pqMax.poll());  // Output: 8
console.log(pqMax.peek());  // Output: 5

// Priority Queue for custom objects (e.g., based on priority property)
const tasks = [
    { task: "Task A", priority: 2 },
    { task: "Task B", priority: 1 },
    { task: "Task C", priority: 3 }
];
const pqTasks = new PriorityQueue((a, b) => a.priority - b.priority); // Comparator based on priority
tasks.forEach(task => pqTasks.add(task));

console.log(pqTasks.peek());   // Output: { task: "Task B", priority: 1 } (lowest priority)
console.log(pqTasks.poll());   // Output: { task: "Task B", priority: 1 }
console.log(pqTasks.peek());   // Output: { task: "Task A", priority: 2 }
