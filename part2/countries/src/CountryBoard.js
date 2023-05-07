import CountryCard from "./CountryCard.js";
import CountryList from "./CountryList.js";

const CountryBoard = ({
  filterCountries,
  selectedCountry,
  onClickShowCountryInfoHandler,
}) => {
  if (!filterCountries) {
    return null;
  }

  if (filterCountries.length > 10) {
    return <div>Too many matches. Please specify another filter.</div>;
  } else if (filterCountries.length === 1) {
    return <CountryCard country={filterCountries[0]} />;
  } else if (selectedCountry) {
    return <CountryCard country={selectedCountry} />;
  } else {
    return (
      <CountryList
        filterCountries={filterCountries}
        onClickShowCountryInfoHandler={onClickShowCountryInfoHandler}
      />
    );
  }
};

export default CountryBoard;
