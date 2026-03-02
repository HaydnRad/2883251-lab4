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

async function getCountry(countryName) {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    return await response.json();
}

async function searchCountry(countryName) {
    console.log("thing called");
    try {
        // Show loading spinner
        // TODO

        // Fetch country data
        const country = (await getCountry(countryName))[0];
        
        // Update DOM
        countryInfo.innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        // Fetch bordering countries
        // TODO

        // Update bordering countries section
        // TODO
    } catch (error) {
        // Show error message
        console.error(error); // TODO: not use the console
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