var maxDistToClosest = function (seats) {
    let prevSeat = null;
    let dist = -Infinity;

    for (let i = 0; i < seats.length; i++) {
        if (seats[i] == 1) {
            if (prevSeat == null) {
                dist = i;
            } else {
                dist = Math.max(dist, Math.floor((i - prevSeat) / 2));
            }

            prevSeat = i;//in both case , update prevseat
        }
    }
    dist = Math.max(dist, seats.length - 1 - prevSeat);
    return dist;

};
//https://www.youtube.com/watch?v=93LkD_YwU8M