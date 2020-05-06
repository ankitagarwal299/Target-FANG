function knows(a, b) {
  return true;
}

var relation = function (knows) {
  return function (n) {
    let candidate = 0;

    for (let i = 0; i < n; i++) {
      if (knows(candidate, i)) {
        candidate = i; //here we found celebrity
      }
    }

    //Confirm again -1. Check all candidates know celebrity and 2. Check celebrity dont know any of them.
    for (let i = 0; i < n; i++) {
        if(i!=candidate && knows(candidate,i) || !knows(i, candidate)) return -1;
    }
  };
};

let findCelebrity = relation(knows);

console.log(findCelebrity(5));
