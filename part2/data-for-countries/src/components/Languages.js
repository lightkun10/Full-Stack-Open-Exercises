import React from 'react';

const Languages = ({ languages }) => {
    return (
        <div>
            <h2>languages</h2>
            <ul>
                {languages.map(lang => <li key={lang.name}>{lang.name}</li>)}
            </ul>
        </div>
    )
}

export default Languages;