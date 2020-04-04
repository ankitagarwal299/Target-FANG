var button = document.querySelector("button");
var input = document.querySelector("#input");

const btnStream$ = Rx.Observable.fromEvent(button, "click");

//----------------------------
const inputStream$ = Rx.Observable.fromEvent(input, "keyup");

inputStream$.subscribe(function (e) {
  console.log(e.target.value);
});

btnStream$.subscribe(
  function (e) {
    console.log("Clicked");
  },
  function (error) {
    console.log(error);
  },
  function () {
    console.log("Completed");
  }
);

const numbers = [33, 44, 55, 66, 77, 88];

const numbers$ = Rx.Observable.from(numbers);

numbers$.subscribe(
  (v) => {
    console.log(v);
  },
  (error) => {
    console.log(error);
  },
  (completed) => {
    console.log("COmpleted");
  }
);
//-----------------

const posts = [
  { title: "Post One", body: "This is the body" },
  { title: "Post Two", body: "This is the body" },
  { title: "Post Three", body: "This is the body" },
];

var postOutput = document.querySelector("#posts");

const posts$ = Rx.Observable.from(posts);

posts$.subscribe(
  (post) => {
    console.log(post);

    document.querySelector("#posts").innerHTML += `
        <li>
          <h3>${post.title}</h3>
          <p>${post.body}</p>
          </li>
        `;
  },
  (error) => {
    console.log(error);
  },
  (completed) => {
    console.log("COmpleted");
  }
);
//---------------------------------------------
const set = new Set(["Hello", 44, { title: "My Title" }]);

const set$ = Rx.Observable.from(set);

set$.subscribe(
  (v) => {
    console.log(v);
  },
  (error) => {
    console.log(error);
  },
  (completed) => {
    console.log("COmpleted");
  }
);
