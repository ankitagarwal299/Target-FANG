function getAllMoviesNames() {

    return new Promise(function (resolve, reject) {
        const movieDb = [];

        let response = fetch(API);
        response
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                const totalPages = res.total_pages;
                for (let i = 0; i < res.results.length; i++) {
                    movieDb.push(res.results[i].title);
                }

                const promiseArr = [];
                for (let i = 1; i < totalPages; i++) {
                    promiseArr.push(fetch(API + i));
                }

                return Promise.all(promiseArr);

            }, (err) => {
                return Promise.reject(err);
            })
            .then((allPromises) => {
                const respArr = [];
                for (let i = 0; i < allPromises.length; i++) {
                    respArr.push(allPromises[i].json());
                }

                return Promise.all(respArr);

            }, (reject) => {
                return new Promise(err);
            })
            .then((responseArr) => {

                for (let i = 0; i < responseArr.length; i++) {
                    const currPage = responseArr[i].results;
                    for (let j = 0; j < currPage.length; j++) {
                        movieDb.push(currPage[j].title);
                    }
                }
                //return movieDb
                // return new Promise((resolve, reject) => {
                //     resolve(movieDb);
                // })
                resolve(movieDb);
            }, (rejected) => {
                return new Promise(rejected);
            })/* .then((movieArr) => {
            console.log("--------------------------------");
            movieArr
                .slice(0, 10)
                .forEach(name => {

                    console.log(name);
                })
        }) */.catch((err) => {
                console.log(err);
            });



    });



}

const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";


getAllMoviesNames()
    .then(result => {
        console.log("!!!!!!!!!!!!!!!!!!!!");
        console.log(result);

    }, (reject) => {
        console.log(reject);

    }).catch(alert)

