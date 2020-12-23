const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



//initial get fav movies
getMovies(APIURL);

async function getMovies(url) {
    const resp = await fetch(url);
    const respData = await resp.json();

    showMovies(respData.results);
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { poster_path, title, vote_average, overview } = movie;

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');

        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h4>Overview:</h4> 
            ${overview} 
        </div>
        `;

        main.appendChild(movieEl);
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        search.value = "";
        getMovies(SEARCHAPI + searchTerm);
    }
})


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
            for (let i = 1; i < respJson.total_pages; i++) {
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

getAllMovieNames(APIURL);
