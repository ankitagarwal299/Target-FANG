

function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
    /*  
    Math.random() -0.5 generate negative or positive number,so sorting function reorders elements randomly.
    not all permutations have same probablity.
    */

}


//correct way
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * i + 1);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }

    for (let i = 0; i < arr.length; i++) {
        let j = 1 + Math.floor(Math.random() - arr.length - i);

        /* 
        1+  random number generate in between 0 - 1, so to consider 1 we need +1 
        arr.length-i  not to count indexes before i 
        eg[1,2,3] if i=1 index then we dont need to consider i=0 for random generation
        
        */
    }


}

let count = {
    '123': 0,
    '132': 0,
    '213': 0,
    '231': 0,
    '321': 0,
    '312': 0
}

//count of occurrences of al possible permutations
for (let i = 0; i < 10000000; i++) {
    let arr = [1, 2, 3];

    shuffle(arr);
    count[arr.join('')]++;
}

//show count of all possible permutatiolns
for (let key in count) {
    console.log(key, count[key]);
}








