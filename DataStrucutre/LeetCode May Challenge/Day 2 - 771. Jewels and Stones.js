//https://www.youtube.com/watch?v=9Reqqk60Nv4

var numJewelsInStones = function(JEWEL, STONE) {
    let jewelHashSet = new Set();

    let numJewels = 0;
    for (let jewel of JEWEL){
        jewelHashSet.add(jewel);
    }

    for (let stone of STONE){
       if(jewelHashSet.has(stone)){
        numJewels++;
       } 
    }
    return numJewels;
};

console.log(numJewelsInStones("aA","aAAbbbb"));
