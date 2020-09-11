const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
    setTimeout(() => {
        let output = '';
        posts.forEach((post, index) => {
            output += `<li>${post.title}</li>`;
        });

        document.body.innerHTML = output;

    }, 1000);
}

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            let error = false;

            if (!error) {
                resolve(posts);
            } else {
                reject("Error: Something went wrong");
            }
        }, 2000);
    })

}

/*
createPost({ title: 'Post Three', body: 'This is post three' })
    .then(getPosts)
    .catch((err) => console.log(err));
 */

const promise1 = Promise.resolve("Hello World");
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Good Bye!")
    }, 2000)
});

const promise4 = fetch('https://jsonplaceholder.typicode.com/users').then(res => res.json())

/* Promise.all([promise1, promise2, promise3, promise4])
    .then((values) => {
        console.log(values);
    })
    .catch((err) => {
        console.log(err);
    }) */


//Async Await
/* async function init() {
    await createPost({ title: 'Post Three', body: 'This is post three' });
    getPosts();
}
init() */

async function fetchUsers() {
    const promise4 = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await promise4.json();
}

fetchUsers()