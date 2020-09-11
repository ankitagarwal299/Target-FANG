let promise = new Promise((resolve, reject) => {
    // executor (the producing code, "singer")
});

function loadScript(src, callback) {
    let script = document.createElement('script');
    script.src = src;

    script.onload = () => callback(null, script);
    script.onerror = () => callback(new Error('Script load error for ', src));

    document.head.append(script);
}

function loadScript(src) {
    return new Promise((resolve, reject) => {
        let script = document.createElement(resolve, reject);
        script.src = src;

        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error('Script load error for ', src));

        document.head.append(script);
    });
}

new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
}).then((result) => {
    return result * 2;
}).then((result) => {
    return result * 2;
}).then((result) => {
    return result * 2;
})


fetch('/article/promise-chaining/user.json')
    .then(response => response.json())
    .then(user => fetch(`https://api.github.com/users/${user.name}`))
    .then(response => response.json())
    .then(githubuser => {

    })
