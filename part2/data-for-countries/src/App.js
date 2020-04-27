import React, { useState, useEffect } from 'react';
import axios from 'axios'

import Filter from './components/Filter'
import CountryData from './components/CountryData'
import CountriesData from './components/CountriesData';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const hook = () => {
    // console.log('"At first, there\'s nothing."')
    // console.log('"...then Effect-hooks do its thing."')

    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log("Promise fulfilled");
        setCountries(response.data);
      });
  };

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the country query result.
  const filteredResult = !searchTerm
    ? countries
    : countries.filter((country) => country.name.toLowerCase().includes(searchTerm.toLowerCase()));

  /* How can I display the desired filteredResult? */
  const displayResult = () => {
    if (filteredResult.length > 10) {
      return (
        <div>Too many matches, specify another filter</div>
      )
    }
    else if (filteredResult.length === 1) {
      return (
        <CountryData country={filteredResult[0]} />
      )
    }
    else {
      return (
        <div>
          {filteredResult.map(country =>
            <CountriesData key={country.name} country={country} />
          )}
        </div>
      )
    }
  }

  return (
    <div>
      <Filter searchTerm={searchTerm} handleFilterChange={handleFilterChange} />

      {displayResult()}
    </div>
  );
}

export default App;
