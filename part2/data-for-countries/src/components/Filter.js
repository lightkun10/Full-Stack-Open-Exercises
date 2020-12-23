import React from 'react';

const Filter = ({ filterTerm, handleFilterChange }) => {
  return (
    <div className="filter-section">
      find countries <input value={filterTerm} onChange={handleFilterChange}></input>
    </div>
  )
}

export default Filter;