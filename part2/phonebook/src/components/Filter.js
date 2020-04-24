import React from 'react';

const Filter = ({ searchTerm, handleFilterChange }) => {
    return (
        <div>
            filter shown with <input value={searchTerm} onChange={handleFilterChange} />
        </div>
    )
}


export default Filter;