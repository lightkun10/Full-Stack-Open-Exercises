import React, { useState, useEffect } from 'react';
import Languages from './Languages';
import WeatherData from './WeatherData';

import axios from 'axios';

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const api_key = process.env.REACT_APP_API_KEY;

  const hook = () => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country["capital"]}`)
      .then((response) => {
        console.log('promise fulfilled')
        console.log(response);
        setWeather(response['data']['current'])
        setLoading(false)
      }).catch((error) => {
        console.log(error);
      })
  }
  useEffect(hook, []);

  // TODO: Add environment variables
  

  return (
    <div className="result-section__country__detail">
      <h1>{country['name']}</h1>
      <div>capital {country['capital']}</div>
      <div>population {country['population']}</div>

      <Languages languages={country['languages']} />

      <img
        alt='country flag'
        src={country['flag']}
        width="200px"
        height="200px">
      </img>

      <h2>Weather in {country['capital']}</h2>
      <WeatherData weather={weather} />
    </div>
  )
}

export default CountryDetail;