const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

let cities = [];

fetch(url)
    .then((response) => {
        if (response.status == 200) {
            return response.json();
        } else {
            throw new Error('Something went wrong from api server !');
        }
    })
    .then((response) => {
        cities = response;
      //  console.log('step 1', cities);
    })
    .catch((error) => {
        console.error(error)
    });

function findMatch(matchWord, cities) {
    //console.log('inside findMatch', cities);
    let reg = new RegExp(matchWord, 'gi');
    return cities.filter((place) => { return place.city.match(reg) || place.state.match(reg); });
};

function displayMatches() {
    const matchArray = findMatch(this.value, cities)
   // console.log('matchArray', matchArray);

    const html = matchArray.map(place => {
        return `
        <li>
            <span class = 'name'> ${place.city} , ${place.state}</span>
            <span class='population'> ${place.population}</span>
       </li>
       `
    }).join('');

    suggestions.innerHTML = html;
}

let searchInput = document.querySelector('.search');
searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches);

let suggestions = document.querySelector('.suggestions');


// console.log('before findMatch', cities)
// console.log('after findMatch', displayMatches('Wes', cities));
