const API = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";

function getAllMovieNames() {
    const movies = [];

    return new Promise((resolve, reject) => {
        fetch('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=')
            .then((response) => {
                if (!response.ok) {
                    return new Error("Network issues");
                }
                return response.json();
            })
            .then((response) => {


                for (let i = 0; i < response.result; i++) {
                    movies.push(response.result[i].title);
                }

                const promiseArr = [];
                for (let i = 2; i < response.total_pages; i++) {
                    promiseArr.push(fetch(API + i));
                }

                return Promise.all(promiseArr);

            }).then((response) => {
                const promiseArr = [];
                for (let i = 0; i < response.length; i++) {
                    promiseArr.push(response[i].json());
                }

                return Promise.all(promiseArr);
            }).then((response) => {
                for (let i = 0; i < response.length; i++) {
                    for (let j = 0; j < response[i].results.length; j++) {
                        movies.push(response[i].results[j].title);
                    }

                }

                return resolve(movies);
                /* if you return then also it will work and .then in next handler */
                //return movies
            })
            .catch((errors) => {
                console.log(errors);
            });
    })
}

getAllMovieNames()
    .then((response) => {
        response.slice(0, 10).forEach(name => console.log(name));
    }).catch((error) => {
        console.log(error);

    })