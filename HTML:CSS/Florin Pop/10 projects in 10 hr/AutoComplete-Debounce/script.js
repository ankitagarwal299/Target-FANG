

let efficientSearch = debounce((e) => {
    if ((!e.target.value?.length)) return;

    document.getElementById('searchTerm').innerHTML = `List Matching ${e.target.value}`;
    let ul = document.getElementById('matches');

    getList(e.target.value)
        .then((response) => {
            ul.innerHTML = '';
            if (response.length == 0) {
                let li = document.createElement('li');
                li.textContent = "NO MATCHES";
                ul.appendChild(li);
            } else {
                response.forEach(item => {
                    let li = document.createElement('li');
                    li.textContent = item;
                    ul.appendChild(li);
                })
            }

        }).catch((error) => {
            console.log(error);
        }
        )


}, 2000);



function getList(search) {
    return new Promise((resolve, reject) => {
        let regEx = new RegExp('^' + search, 'i');//learn this stpe for regex

        let matches = terms.filter((item) => {
            return regEx.test(item);//learn this stpe for regex
        });

        console.log(matches);
        resolve(matches);
    });
}

function debounce(callback, delay) {
    let timerID = null;
    return function (...args) {
        var context = this;

        if (timerID) {//if timer is set, and fn is called reset timer
            clearTimeout(timerID);
        }

        timerID = setTimeout(function () {
            callback(...args);
        }, delay);

    }
}

let terms = ["apple", "acorn", "bee", "beet", "beef", "bunny", "cookie", "corn", "corndog", "dog", "dogma", "echo", "elephant"];

let search = document.getElementById('search');
search.addEventListener('input', efficientSearch)


