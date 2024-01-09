// InternationalCountryForm.js
import React, { useState, useEffect } from 'react';
const InternationalCountryForm = ({ onSubmit, onUpdate, selectedCountry }) => {
  const [name, setName] = useState('');
  useEffect(() => {
    // Set the form fields when selectedCountry changes (for updating)
    if (selectedCountry) {
      setName(selectedCountry.name);
    }
  }, [selectedCountry]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      alert('Please enter a country name.');
      return;
    }
    // If selectedCountry is present, it's an update; otherwise, it's an add
    if (selectedCountry) {
      onUpdate({ ...selectedCountry, name });
    } else {
      onSubmit({ name });
    }
    // Reset form fields
    setName('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Country Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <button type="submit">{selectedCountry ? 'Update' : 'Add'} Country</button>
    </form>
  );
};
export default InternationalCountryForm;