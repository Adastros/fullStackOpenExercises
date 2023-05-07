import CountryListItem from "./CountryListItem.js";

const CountryList = ({ filterCountries, onClickShowCountryInfoHandler }) => {
  const countryItems = filterCountries.map((country) => {
    return (
      <CountryListItem
        key={country.name.common}
        country={country}
        onClickShowCountryInfoHandler={onClickShowCountryInfoHandler}
      />
    );
  });

  return <ul>{countryItems}</ul>;
};

export default CountryList;
