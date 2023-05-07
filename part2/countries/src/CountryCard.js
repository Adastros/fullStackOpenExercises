import Weather from "./Weather";

const CountryCard = ({ country }) => {
  const imgStyle = {
    height: 200,
    width: 300,
  };

  return (
    <div>
      <h1>{country.name.common}</h1>
      <img
        alt={`${country.name.common}'s flag`}
        src={country.flags.svg}
        style={imgStyle}
      />
      <p>Continent: {country.continents}</p>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => {
          return (
            <li key={`${country.name.common}_${language}}`}>{language}</li>
          );
        })}
      </ul>
      <Weather country={country} />
    </div>
  );
};

export default CountryCard;
