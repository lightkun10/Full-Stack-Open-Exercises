import React, { useState, useEffect } from 'react';
import Languages from './Languages'
import axios from 'axios';
import WeatherData from './WeatherData';

const CountryData = ({ country }) => {
    const [weather, setWeather] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const api_key = process.env.REACT_APP_API_KEY;

    const hook = () => {
        axios.get(
            `http://api.weatherstack.com/current?access_key=${api_key}&query=${country["capital"]}`
        ).then(response => {
            setWeather(response['data']['current'])
            setLoading(false)
        })
    }

    useEffect(hook, [])

    return (
        <div>
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
};

export default CountryData;