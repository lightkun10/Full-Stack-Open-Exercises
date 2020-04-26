import React from 'react';
import Languages from './Languages'

const CountryData = ({ country }) => {
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
        </div>
    )
};

export default CountryData;