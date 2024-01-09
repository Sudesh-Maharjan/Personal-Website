import React from 'react';
const InternationalCountryList = ({ countries, onDelete, onUpdate }) => {
  return (
    <div>
      <h2>International Countries</h2>
      <ul>
        {countries.map((country) => (
          <li key={country.id}>
            {country.name}{' '}
            <button onClick={() => onDelete(country.id)}>Delete</button>
            <button onClick={() => onUpdate(country)}>Update</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default InternationalCountryList;