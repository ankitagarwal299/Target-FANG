//https://www.youtube.com/watch?v=7WYwqvOSaa8
var canCompleteCircuit = function (gas, cost) {
    let start = 0;
    let requiredFuel = 0;
    let extrafuel = 0;

    for (let i = 0; i < gas.length; i++) {
        extrafuel = extrafuel + gas[i] - cost[i];

        if (extrafuel < 0) {
            start = i + 1;

            requiredFuel = requiredFuel + extrafuel;
            extrafuel = 0;
        }
    }
    return (requiredFuel + extrafuel) >= 0 ? start : -1;

};