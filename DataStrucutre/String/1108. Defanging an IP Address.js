var defangIPaddr = function (address) {
  let result = "";
  for (let i = 0; i < address.length; i++) {
    if (address[i] == ".") {
        result = result + '[.]'
    } else {
      result = result + address[i];
    }
  }
};

console.log(defangIPaddr("255.100.50.0"));

//https://www.youtube.com/watch?v=bJTgBNT3LbA&list=PLi9RQVmJD2fYXgBAUfaN5MXgYPUTbzqeb&index=110


var defangIPaddr = function (address) {
    address = address.replace(/\./gi, "[.]");
    return address;
};