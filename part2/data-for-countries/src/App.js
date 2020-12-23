import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import CountryDetail from './components/CountryDetail';
// import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [filterTerm, setFilterTerm] = useState("");

  const hook = () => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        console.log("Promise fulfilled");
        console.log(response);
        setCountries(response.data);
      })
      .catch((error) => {
        console.log("Promise rejected");
        console.log(error);
      });
  }

  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value);
  }

  const filteredResult = !filterTerm 
    ? countries
    : countries.filter((country) => country.name.toLowerCase().includes(filterTerm.toLowerCase()));

  const displayResult = () => {
    if (filteredResult.length > 10) { 
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if (filteredResult.length === 1) {
      return (
        <CountryDetail country={filteredResult[0]} />
      )
    } else {
      return (
        <div className="result-section__countries">
          {filteredResult.map((country) => 
            <div key={country.name}>{country.name}</div>
          )}
        </div>
      )
    }
  }
  
  console.log(filteredResult)
  return (
    <div className="main">
      <div className="filter-section">
        <Filter filterTerm={filterTerm} handleFilterChange={handleFilterChange} />
      </div>

      <div className="result-section">
        {displayResult()}
      </div>
    </div>
  );
}

export default App;
