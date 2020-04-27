import React from 'react';

const Filter = ({ searchTerm, handleFilterChange }) => {
    return (
        <div>
            find countries
            <input value={searchTerm}
                onChange={handleFilterChange}></input>
        </div>
    )
}

export default Filter;