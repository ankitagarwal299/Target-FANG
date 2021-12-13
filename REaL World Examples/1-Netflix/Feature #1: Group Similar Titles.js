//DIY: Group Anagrams
function groupTitles(titles) {
    let hashMap = {};

    for (let i = 0; i < titles.length; i++) {

        let currTitle = titles[i];
        let count = new Array(26).fill(0);

        for (let char of currTitle) {
            let index = char.charCodeAt(0) - 'a'.charCodeAt(0);
            count[index]++;
        }
        if (count in hashMap) {
            hashMap[count].push(currTitle)
        } else {
            hashMap[count] = [currTitle];
        }
    }

    let result = [];
    for (let key in hashMap) {
        result.push(hashMap[key]);
    }
    return result;

}



let titles = ["duel", "dule", "speed", "spede", "deul", "cars"];
let gt = groupTitles(titles);
let query = "spede";

for (let item of gt) {
    if (item.includes(query)) {
        console.log(item);
    }
}

//O(n×k) - T
//O(n×k) - S