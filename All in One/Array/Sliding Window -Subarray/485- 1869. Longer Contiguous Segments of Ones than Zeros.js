var checkZeroOnes = function (s) {
    if (s == null || s.length == 0) return false;

    let longSubstr1 = 0;
    let longSubstr0 = 0;

    let count1 = 0;
    let count0 = 0;

    for (let end = 0; end < s.length; end++) {
        let char = s.charAt(end);

        if (char == '1') count1++;
        else count1 = 0;

        if (char == '0') count0++;
        else count0 = 0;

        longSubstr1 = Math.max(longSubstr1, count1);
        longSubstr0 = Math.max(longSubstr0, count0);
    }
    return longSubstr1 > longSubstr0;

};

//1 step ahead of 485. Max Consecutive Ones.js
////similar to 1446. Max Consecutive Characters || Easy.js 