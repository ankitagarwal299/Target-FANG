//DIY:249 Group Shifted Strings
//https://www.youtube.com/watch?v=uEXJSRLqoKY&t=611s

function groupShiftedString(messages) {
    if (messages == null || messages.length == 0) return [];
    var groupHashMap = new Map();

    function getHash(word) {
        let hash = "";
        if (word.length == 1) return ".";
        for (let i = 1; i < word.length; i++) {
            let diff = word[i].charCodeAt() - word[i - 1].charCodeAt();//important point
            if (diff < 0) {
                diff += 26;
            }
            hash = hash + diff + "#";
        }
        return hash;
    }

    for (let i = 0; i < messages.length; i++) {
        let key = getHash(messages[i]);
        if (groupHashMap.has(key)) {
            groupHashMap.get(key).push(messages[i])
        } else {
            groupHashMap.set(key, [messages[i]]);
        }
    }

    let result = [];

    for (let value of groupHashMap.values()) {
        result.push(value);
    }

    return result;
}

console.log(groupShiftedString(["lmn", "mno", "azb", "bac", "yza", "bdfg"]));

/*
OUTPUT
['lmn', 'mno', 'yza']
['azb', 'bac']
['bdfg']
 */