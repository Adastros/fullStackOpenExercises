import { useState, useEffect } from "react";
import servCom from "./services/serverCom";
import Searchbar from "./Searchbar";
import CountryBoard from "./CountryBoard";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [onSearchbarFilter, setOnSearchbarFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();

  useEffect(() => {
    servCom.getAllCountries().then((response) => setCountries(response.data));
  }, []);

  const onSearchbarChange = (e) => {
    setOnSearchbarFilter(e.target.value);
    setSelectedCountry();
  };

  const filterCountries = () => {
    let filteredCountries = [];

    if (onSearchbarFilter) {
      filteredCountries = countries.filter((country) => {
        return country.name.common
          .toLowerCase()
          .includes(onSearchbarFilter.toLowerCase());
      });
    }

    return filteredCountries;
  };

  const onClickShowCountryInfoHandler = (e) => {
    const selectedCountry = JSON.parse(e.currentTarget.dataset.selectedCountry);

    setSelectedCountry(selectedCountry);
  };

  return (
    <div>
      Find countries:{" "}
      <Searchbar
        onSearchbarFilter={onSearchbarFilter}
        onSearchbarChange={onSearchbarChange}
      />
      <CountryBoard
        filterCountries={filterCountries()}
        selectedCountry={selectedCountry}
        onClickShowCountryInfoHandler={onClickShowCountryInfoHandler}
      />
    </div>
  );
};

export default App;
