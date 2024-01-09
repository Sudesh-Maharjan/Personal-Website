// UpdateForm.js
import React, { useState } from 'react';
import axios from 'axios';
const UpdateForm = ({ country, onUpdate, onClose }) => {
  const [updatedName, setUpdatedName] = useState(country.name);
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/international/${country.id}`,
        { name: updatedName }
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating international country:', error);
      alert('Failed to update international country. Please try again.');
    }
  };
  return (
    <div>
      <h3>Update Country</h3>
      <label>
        New Country Name:
        <input type="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
      </label>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};
export default UpdateForm;