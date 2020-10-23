
/* {
    "page": 1,
        "total_results": 10000,
            "total_pages": 500,
                "results": [
                    {
                        "popularity": 2340.511,
                        "vote_count": 1222,
                        "video": false,
                        "poster_path": "\/aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg",
                        "id": 337401,
                        "adult": false,
                        "backdrop_path": "\/xl5oCFLVMo4d4Pgxvrf8Jmc2IlA.jpg",
                        "original_language": "en",
                        "original_title": "Mulan",
                        "genre_ids": [
                            28,
                            12,
                            18,
                            14,
                            10752
                        ],
                        "title": "Mulan",
                        "vote_average": 7.7,
                        "overview": "When the Emperor of China issues a decree that one man per family must serve in the Imperial Chinese Army to defend the country from Huns, Hua Mulan, the eldest daughter of an honored warrior, steps in to take the place of her ailing father. She is spirited, determined and quick on her feet. Disguised as a man by the name of Hua Jun, she is tested every step of the way and must harness her innermost strength and embrace her true potential.",
                        "release_date": "2020-09-04"
                    }
                ]
} */

//Get all movie names from API
function getAllMovieNames(url) {
    let movieNameArr = [];

    //1. Get total number of pages
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((respJson) => {

            let promiseArr = [];
            for (let i = 0; i < respJson.total_pages; i++) {
                let url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=" + i;
                promiseArr.push(fetch(url));
            }

            return Promise.all(promiseArr);

        }).then((allpromises) => {
            let promiseJSONArr = [];
            for (let i = 0; i < allpromises.length; i++) {
                promiseJSONArr.push(allpromises[i].json());
            }
            return Promise.all(promiseJSONArr);

        }).then((allMoviesJSON) => {
            allMoviesJSON.forEach(promise => {
                let currPromiseArr = promise.results;
                currPromiseArr.forEach((movie) => {
                    movieNameArr.push(movie.original_title);
                })
            });

            return movieNameArr;
        }).then(movieArr => {
            //console.log(movieNameArr);
            movieArr.forEach(name => {
                //console.log(name);
            })
        })
        .catch((err) => {
            console.log(err);
        });
}

const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
getAllMovieNames(APIURL);
