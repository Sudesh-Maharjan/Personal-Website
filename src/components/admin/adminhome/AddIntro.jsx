import React, { useState } from 'react';
import axios from 'axios';
const AddIntro = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    image: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    // If the input is a file input, use the files array
    const inputValue = type === 'file' ? files[0] : value;
    setFormData({ ...formData, [name]: inputValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform any necessary form validation here
    try {
      // Create a FormData object to handle file uploads
      const formDataObject = new FormData();
      formDataObject.append('name', formData.name);
      formDataObject.append('description', formData.description);
      formDataObject.append('location', formData.location);
      formDataObject.append('startDate', formData.startDate);
      formDataObject.append('endDate', formData.endDate);
      formDataObject.append('image', formData.image);
      // Send the form data (including the file) to your backend using axios
      await axios.post('http://localhost:5000/api/business', formDataObject);
      // If the request is successful, set the success state
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div>
      <h1>Simple Form</h1>
      {isSubmitted && <div style={{ color: 'green' }}>Form submitted successfully!</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleInputChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};
export default AddIntro;