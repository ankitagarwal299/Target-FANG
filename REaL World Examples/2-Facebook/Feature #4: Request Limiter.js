class RequestLimiter {
    constructor() {
        this.cache = new Map();
    }

    // requestApprover(timestamp, request) {
    //     if (!this.cache.has(request) || timestamp - this.cache.get(request) >= 5) {
    //         this.cache.set(request, timestamp);
    //         console.log("Request Accepted");
    //         return true;
    //     } else {
    //         console.log("Request Rejected");
    //         return false;
    //     }
    // }

    requestApprover(timestamp, request) {
        if (this.cache.has(request)) {
            if (timestamp - this.cache.get(request) < 5) {
                console.log("Request Rejected");
                return false;
            }
        }
        this.cache.set(request, timestamp);
        console.log("Request Accepted");
        return true;
    }
}


var obj = new RequestLimiter()
obj.requestApprover(1, "send_message")
obj.requestApprover(2, "block")
obj.requestApprover(3, "send_message")
obj.requestApprover(8, "block")
obj.requestApprover(10, "send_message")
obj.requestApprover(11, "send_message")


//DIY: Logger Rate Limiter
//	359	Logger Rate Limiter leetcode
class Logger {
    constructor()
}
