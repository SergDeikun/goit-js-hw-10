import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fechCountries } from './js/fetchCountries';
import { renderList, renderCounrty } from './js/markupTemleates';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(handleSearchInput, DEBOUNCE_DELAY));

function handleSearchInput(e) {
  const nameOfCountry = e.target.value.trim();

  if (nameOfCountry === '') {
    refs.countryList.innerHTML = '';
    refs.countryInfo.innerHTML = '';
    return;
  }

  fechCountries(nameOfCountry)
    .then(countrys => {
      if (countrys.length > 10) {
        refs.countryList.innerHTML = '';
        refs.countryInfo.innerHTML = '';
        return Notify.info('Too many matches found. Please enter a more specific name.');
      }

      if (countrys.length > 2 && countrys.length <= 10) {
        const list = countrys.map(country => renderList(country));
        refs.countryList.innerHTML = list.join(' ');
        return (refs.countryInfo.innerHTML = '');
      }

      if ((countrys.length = 1)) {
        const info = countrys.map(country => renderCounrty(country));
        refs.countryInfo.innerHTML = info.join(' ');
        refs.countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryList.innerHTML = '';
      refs.countryInfo.innerHTML = '';
    });
}
