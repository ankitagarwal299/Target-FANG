//https://repl.it/repls/NextCoarseSeptagon#.replit


//debounce: 
//https://repl.it/repls/VelvetyAuthenticBuckets#debounce.test.js



//==================with Options====================================
const throttle = (fn, delay, options = { leading: true, trailing: true }) => {
    let timer = null;
    let delayfnCall = null;

    let timerSet = () => {
        /* if trailing is not explicitly disabled and delayfnCall is  */
        if (options.trailing != false && delayfnCall) {
            fn.apply(delayfnCall.context, delayfnCall.args);
            delayfnCall = null;
        timer = setTimeout(timerSet, delay);
        }else{
          timer= null;
        }
        
    }

    return function (...args) {
        /* if in the colling time , just store context for future use */
        if (timer != null) {
            delayfnCall = {
                "context": this,
                args
            }
            return;
        }
        
          /* if leading is set explicitly disabled */
          if (options.leading != false) {
              fn.apply(this, arguments);
          }else{
              delayfnCall = {
                "context": this,
                args
            }
          }
          timer = setTimeout(timerSet, delay);
        
    }
}

module.exports = throttle



//
const throttle = require('throttle.js');

const waitFor = (millis) => {
    return new Promise((resolve) => {
        setTimeout(resolve, millis);
    })
}


const run = async (input, wait, options) => {
    const result = [];      

    const funct = (char) => {
        result.push(char);
    }

    const throttled = throttle(funct, wait, options);

    let prev = 0;

    for (let [time, char] of input) {
        await waitFor(time - prev);
        prev= time;
        throttled(char)
    }

    await waitFor(wait*2);

    return result;
}




test("throttle() leading: true, trailing :true", async () => {
    const input = [[0, "A"], [50, "B"], [100, "C"], [200, "D"], [220, "E"], [400, "G"]]

    const seq = await run(input, 100, { leading: true, trailing: true })
console.log(seq)

    //expect(seq).toEqual(['A', 'B', 'C', 'E','G']);
});

test("throttle() leading: false, trailing :true", async () => {
    const input = [[0, "A"], [50, "B"], [100, "C"], [200, "D"], [210, "E"],[220, "F"], [400, "G"]]

    const seq = await run(input, 100, { leading: false, trailing: true })
console.log(seq)
    //expect(seq).toEqual(['B', 'C', 'E', 'G']);
    
});


test("throttle() leading: true, trailing :false", async () => {
    const input = [[0, "A"], [50, "B"], [100, "C"], [200, "D"], [220, "E"], [400, "G"]]

    const seq = await run(input, 100, { leading: true, trailing: false })
console.log(seq)

    //expect(seq).toEqual(['A', 'C', 'D', 'G']);
});