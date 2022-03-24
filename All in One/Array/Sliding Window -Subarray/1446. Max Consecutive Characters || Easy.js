var maxPower = function (s) {
    if (s == null || s.length == 0) return 0;

    let longSubstr = 0;

    let start = 0;
    for (let end = 0; end < s.length; end++) {
        if (s.charAt(start) != s.charAt(end)) {
            start = end;
        }
        longSubstr = Math.max(longSubstr, end - start + 1);
    }
    return longSubstr;
};
//Very easy did myself