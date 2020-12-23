import React from 'react';

const Result = ({ filtered }) => (
  <div className="result-section">
    <h2>Numbers</h2>
      {filtered.map((person) => 
        <div key={person.name}>{person.name} {person.number}</div>
      )}
  </div>
)

export default Result;