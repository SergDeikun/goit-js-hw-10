export const renderList = ({ flags, name }) => {
  return `<li class="country-list__item">
          <img src="${flags.svg}" alt="${name.official}" width="50"/>
          <h1 class="country-list__title">${name.official}</h1>
        </li>`;
};

export const renderCounrty = ({ name, flags, capital, population, languages }) => {
  return `<div class="country-info__wrap">
      <img src="${flags.svg}" alt="${name.official}" width="50"/>
      <h1 class="country-info__title">${name.official}</h1>
    </div>
    <p><span class="country-info__text">Capital:</span> ${capital}</p>
    <p><span class="country-info__text">Population:</span> ${population}</p>
    <p><span class="country-info__text">Languages:</span> ${Object.values(languages)}</p>`;
};
