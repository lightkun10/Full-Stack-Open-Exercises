import React from 'react';

const CountriesData = ({ country }) => {
    return (
        <li key={country.name}>{country.name}</li>
    )
}

export default CountriesData;