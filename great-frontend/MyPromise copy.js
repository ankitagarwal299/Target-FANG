class MyPromise {
  constructor(callbackFn) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.thenCallBacks = [];
    this.catchCallBacks = [];


    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);

    // try {
    //   callbackFn(this.resolve, this.reject);
    // } catch (err) {
    //   this.reject(err);
    // }
    try {
      callbackFn(
        (val) => this.resolve(val),
        (reason) => this.reject(reason)
      )
    } catch (err) {
      this.reject(err)
    }

  }

  //private methods
  resolve(value) {
    if (this.state == "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.thenCallBacks.forEach(cb => cb(value))
    }
  }

  //private methods
  reject(reason) {
    if (this.state == "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.catchCallBacks.forEach(cb => cb(reason))
    }
  }

  then(onResolve, onReject) {
    return new MyPromise((resolve, reject) => {

      switch (this.state) {
        case "pending":

          this.thenCallBacks.push((value) => {
            const result = onResolve ? onResolve(value) : value;
            resolve(result);
          })


          this.catchCallBacks.push((reason) => {
            const result = onReject ? onReject(reason) : reason;
            reject(result);
          });

          break;

        case "fulfilled":

          const result = onResolve ? onResolve(this.value) : this.value;
          resolve(result);

          break;

        case "rejected":


          const err = onReject ? onReject(this.reason) : this.reason;
          reject(err);


          break;
      }

    })

  }

  catch(onReject) {
    if (this.state == "pending") return;

    return this.then(null, onReject);
  }
}

let p1 = new MyPromise((resolve, reject) => {
  if (1 == 2) {
    setTimeout(() => {
      resolve(42)
    }, 1000)
  } else {
    reject("errorr...........")
  }
})
  .then(val => {
    console.log("First:", val);
    return val * 2;
  })
  .then(val => {
    console.log("Second:", val);
  })
  .catch((err) => {
    console.log("Here is the result of catch callback", err)
  })

