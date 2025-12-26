
class MyPromise {

  constructor(executor) {
    this.state = "pending";
    this.value = undefined;
    this.reason = undefined;
    this.onSuccessCallback = [];
    this.onRejectCallback = [];

    try {
       // executor((val) => this.resolve(val), (err) => this.reject(err));
        // executor(resolve(val), reject(err)); cannot identify function outside constructor
      executor(
        (val) => this.resolve(val),
        (reason) => this.reject(reason)
      )
      //Arrow functions preserve the this context of the class. Without them, this.resolve might lose its binding and not refer to the correct instance.
    } catch (err) {
      this.reject(err)
    }
  }


  //private methods
  resolve(value) {
    if (this.state === "pending") {
      this.state = "fulfilled";
      this.value = value;
      this.onSuccessCallback.forEach((cb) => cb(value));
    }
  }


  //private methods
  reject(reason) {
    if (this.state === "pending") {
      this.state = "rejected";
      this.reason = reason;
      this.onRejectCallback.forEach((cb) => cb(reason));
    }
  }

  then(onResolve, onReject) {
    return new MyPromise((resolve, reject) => {

      const handleResolve = (value) => {
        try {
          const result = onResolve ? onResolve(value) : value;
          resolve(result);
        } catch (err) {
          reject(err);
        }
      }

      const handleReject = (reason) => {
        try {
          const result = onReject ? onReject(reason) : reason;
          reject(result);
        } catch (err) {
          reject(err);
        }
      }


      switch (this.state) {
        case "pending":
          this.onSuccessCallback.push(handleResolve);//value will pass when they are excuted
          this.onRejectCallback.push(handleReject);//err will pass when they are excuted
          break;

        case "fulfilled":
          handleResolve(this.value)
          break;

        case "rejected":
          handleReject(this.reason)
          break;

        default:
          throw new Error("State is not defined")
      }
    })
  }

  catch(onReject) {
    return this.then(null, onReject);
  }
}

let p1 = new MyPromise((resolve, reject) => {

  if (1 == 1) {
     console.log("Promise resolved.......")
    resolve(10);
  } else {
    reject("Promise rejected.......")
  }
})
  .then((res => {
    return res * 2
  }))
  .then((res => console.log("then log", res)))
  .catch((err => console.log("catch log", err)))