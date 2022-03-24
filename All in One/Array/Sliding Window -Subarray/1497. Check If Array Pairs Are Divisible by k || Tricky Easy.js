
var canArrange = function (arr, k) {
    if (arr == null || arr.length == 0 || k == 0) return false;

    let remFreq = {};
    for (let i = 0; i < arr.length; i++) {

        let rem = arr[i] % k;

        if (rem < 0) rem += k;//Imp

        if (remFreq[rem]) {
            remFreq[rem] += 1;
        } else {

            remFreq[rem] = 1;
        }
    }

    console.log(remFreq)
    for (let prop in remFreq) {
        console.log(prop)
        if (prop == 0) {//eg 10/10
            //remainder 0 check even
            if (remFreq[prop] % 2 != 0) return false;

        } else if (2 * prop == k) { //eg 10/2
            if (remFreq[prop] % 2 != 0) return false;
        }
        else if (remFreq[prop] != remFreq[k - prop]) {
            return false;
        }
    }


    return true;

};

//https://www.youtube.com/watch?v=BvKv-118twg
//Pepcoding