var nextGreatestLetter = function (letters, target) {
    if (letters == null || letters.length == 0 || target == null ||
        target.charCodeAt() < "a".charCodeAt() || target.charCodeAt() > "z".charCodeAt()) return "";

    let nextletter = letters[0];//important, if not found then wrap around store 1st elem

    let start = 0;
    let end = letters.length - 1;

    while (start <= end) {
        let midIndex = start + Math.floor((end - start) / 2);

        if (letters[midIndex] > target) {

            nextletter = letters[midIndex];
            end = midIndex - 1;//continue searching left

        } else {
            start = midIndex + 1;
        }

    }
    return nextletter;
};