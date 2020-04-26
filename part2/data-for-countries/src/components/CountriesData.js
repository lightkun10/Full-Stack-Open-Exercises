import React, { useState } from 'react';
import CountryData from './CountryData'

const CountriesData = ({ country }) => {
    const [showDetails, setShowDetails] = useState(false)

    const filterShowDetails = !showDetails
        ? null
        : <CountryData country={country} />

    return (
        <div key={country.name}>
            {country.name}
            <button onClick={() => setShowDetails(!showDetails)}>
                {!showDetails ? "show" : "hide"}
            </button>
            {filterShowDetails}
        </div>
    )
}

export default CountriesData;