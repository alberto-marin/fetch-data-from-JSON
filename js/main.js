const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const places = [];

// fetch returns a promise
// the raw data that is coming back from fetch it doesn't know what kind of data it is (text, image, audio, html...)
// We know is JSON,
fetch(endpoint)
  .then(blobResponse => blobResponse.json()) // returns another promise
  .then(data => places.push(...data));
// how to put the data into places array? spread into a function
//  The spread syntax allows an expression to be expanded in places where multiple arguments (for function calls) or multiple elements (for array literals) or multiple variables  (for destructuring assignment) are expected.
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Spread_operator
function findMatches(wordToMatch, places) {
  return places.filter(place => {
    // figure out if the city or state matches what was searched
    // we need a regular expression. g stands for global and i for insensitive
    const regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  // console.log(this.value); this.value is whatever the person search
  const matchPlaces = findMatches(this.value, places);
  // console.log(matchPlaces);
  const html = matchPlaces.map(place => {
    // to highlight we replace whatever it searchs for the value highlighted (.hl)
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const cityState = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${cityState}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `
  }).join(''); // map return an array. Convert to string with join('')
  suggestions.innerHTML = html;
}
const searchInpunt = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInpunt.addEventListener('change', displayMatches);
searchInpunt.addEventListener('keyup', displayMatches);
