const CountryListItem = ({ country, onClickShowCountryInfoHandler }) => {
  return (
    <li>
      {country.name.common}
      <button
        onClick={onClickShowCountryInfoHandler}
        data-selected-country={JSON.stringify(country)}
      >
        Show Info
      </button>
    </li>
  );
};

export default CountryListItem;
