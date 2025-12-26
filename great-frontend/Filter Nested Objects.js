// //Filter nested object in Javascript


function filterNestedObjectInPlace(obj, filterFn) {

  for (const key in obj) {

    const val = obj[key];

    if (typeof val == "object") {
      filterNestedObjectInPlace(obj[key], filterFn)
      if (Object.keys(val).length == 0) {
        delete obj[key]
      }
    } else {
      if (filterFn(key, val) == false) {//test it
        delete obj[key]
      }
    }
  }

  return obj
}



const obj = {
  a: 1,
  b: {
    c: "Hello World",
    d: [{"jh":2}],
    e: {
      f: {
        g: -4,
      },
    },
    h: "Good Night Moon",
  },
};

const filterfn = (key, s) => typeof s === "string";


console.log(JSON.stringify(filterNestedObjectInPlace(obj, filterfn)))

