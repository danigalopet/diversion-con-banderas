const countriesList = document.getElementById('countries-list');
const countryDetail = document.getElementById('country-detail');
const closeDetailButton = document.getElementById('close-detail');
const countryInfo = document.getElementById('country-info');


const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3/all');
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error('Error fetching countries:', error);
  }
};

const displayCountries = (countries) => {
  countriesList.innerHTML = '';
  countries.sort((a, b) => a.name.common.toUpperCase().localeCompare(b.name.common.toUpperCase()));
  countries.forEach(country => {
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');
    countryDiv.innerHTML = `
      <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
      <p>${country.name.common}</p>
    `;
    countryDiv.addEventListener('click', () => showCountryDetail(country));
    countriesList.appendChild(countryDiv);
  });
};

const showCountryDetail = (country) => {
  countryInfo.innerHTML = `
    <h2>${country.name.common}</h2>
    <img src="${country.flags.png}" alt="Bandera de ${country.name.common}">
    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
    <p><strong>Conduce por:</strong> ${country.car.side}</p>
  `;
  countryDetail.classList.remove('hidden');
};

const closeCountryDetail = () => {
  countryDetail.classList.add('hidden');
};

closeDetailButton.addEventListener('click', closeCountryDetail);

const init = async () => {
  const countries = await fetchCountries();
  displayCountries(countries);
};

init();