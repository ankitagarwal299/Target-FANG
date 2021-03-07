const api =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

let getMoviesNames = function () {
    return new Promise((resolve, reject) => {
        const moviesDB = [];
        fetch(api + '1')
            .then(
                (response) => {
                    return response.json();
                },
                (error) => {
                    console.log(error);
                }
            )
            .then(
                (response) => {
                    const totalPages = response.total_pages;
                    const results = response.results;

                    for (let i = 0; i < results.length; i++) {
                        moviesDB.push(results[i].title);
                    }

                    const promiseArr = [];
                    for (let i = 2; i < totalPages; i++) {
                        promiseArr.push(fetch(api + i));
                    }

                    return Promise.all(promiseArr);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then(
                (response) => {
                    const promiseRespArr = [];
                    for (let i = 0; i < response.length; i++) {
                        promiseRespArr.push(response[i].json());
                    }

                    return Promise.all(promiseRespArr);
                },
                (error) => {
                    console.log(error);
                }
            )
            .then(
                (response) => {
                    for (let i = 0; i < response.length; i++) {
                        // moviesDB.push(response[i].title);
                        response[i].results.forEach((item) => {
                            moviesDB.push(item.title);
                        })
                    }

                    return resolve(moviesDB);
                },
                (error) => {
                    console.log(error);
                }
            );
    });
};


//-----------------------
getMoviesNames()
    .then(
        (response) => {
            response.slice(0, 10).forEach((movie) => {
                console.log(movie);
            })
        },
        (error) => {
            console.log(error);
        }
    )
    .catch((err) => {
        console.log("Hello", err);
    });
