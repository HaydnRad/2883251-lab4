// Used defer in the html tag, so this should be fine
const countryInput = document.getElementById('country-input');
const searchButton = document.getElementById('search-btn');
const loadingSpinner = document.getElementById('loading-spinner');
const countryInfo = document.getElementById('country-info');
const borderingCountries = document.getElementById('bordering-countries');
const errorDisplay = document.getElementById('error-message');

console.log("script loaded");

// Required: Use async/await OR .then() for API calls
// Required: Use try/catch OR .catch() for error handling

async function getCountryByName(countryName) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    if (!response.ok) 
        throw await response.json();
    return response.json();
}

async function getCountryByCode(countryCode) {
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${countryCode}`);
    if (!response.ok) 
        throw response.statusText;
    return response.json();
}

async function searchCountry(countryName) {
    try {
        // Show loading spinner
        // TODO

        // Fetch country data
        const countries = await getCountryByName(countryName)
        if (countries.length === 0) 
            throw "Country not found";

        const country = countries[0];
        
        // Update DOM
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        let bordering = [];
        for (const b of country.borders) {
            bordering.push(getCountryByCode(b));
        }
        
        // Update bordering countries section
        borderingCountries.innerHTML = '';
        for (const b of bordering) {
            const c = (await b)[0];
            borderingCountries.innerHTML += `
                <p>${c.name.common}</p>
                <img src="${c.flags.svg}" alt="${c.name.common} flag">
            `;
        }

        
    } catch (error) {
        // Show error message
        errorDisplay.innerHTML = `
            ${(error.status != undefined && error.status == 404) ? "Could not find country" : toString(error)}
        `;
    } finally {
        // Hide loading spinner
        // TODO
    }
}

// Event listeners
searchButton.addEventListener('click', () => {
    const country = countryInput.value;
    searchCountry(country);
});

countryInput.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter') return;

    const country = countryInput.value;
    searchCountry(country);
})