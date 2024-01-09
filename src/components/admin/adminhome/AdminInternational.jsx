import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { API_URL } from '../../../Config';

const AdminInternational = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({ name: '', purposeOfTrip: '', year: '' });
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/international`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      purposeOfTrip: item.purposeOfTrip,
      year: item.year,
    });
    toggleFormVisibility();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editItem) {
        await axios.put(`${API_URL}/international/${editItem.id}`, formData);
        Swal.fire('Success!', 'International data updated successfully!', 'success');
        setEditItem(null);
      } else {
        await axios.post(`${API_URL}/international`, formData);
        Swal.fire('Success!', 'International data added successfully!', 'success');
      }

      fetchData();
      resetForm();
      toggleFormVisibility();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId) => {
    const isConfirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (isConfirmed.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/international/${itemId}`);
        Swal.fire('Deleted!', 'International data deleted successfully!', 'success');
        fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({ name: '', purposeOfTrip: '', year: '' });
    setEditItem(null);
  };
  const toggleForm1 = () => {
    resetForm()
  
    setShowForm(!showForm);
  };


  const toggleFormVisibility = () => {
  
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin International</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          onClick={toggleForm1}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mb-2 md:mb-0"
        >
          Add Country
        </button>
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border">Name</th>
            <th className="py-2 px-4 border">Purpose of Visit</th>
            <th className="py-2 px-4 border">Year</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border">{item.name}</td>
              <td className="py-2 px-4 border">{item.purposeOfTrip}</td>
              <td className="py-2 px-4 border">{item.year}</td>
              <td className="py-2 px-4 border">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  aria-label="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                  aria-label="Delete"
                >
                  <RiDeleteBin6Line />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Popup open={showForm} onClose={toggleFormVisibility} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <div className="modal-header">
              <button onClick={() => { close(); setEditItem(null); }} className="float-right text-gray-500">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="mt-9">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">
                  Country Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="formInput w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-600">
                  Purpose of visit
                  <input
                    type="text"
                    name="purposeOfTrip"
                    value={formData.purposeOfTrip}
                    onChange={handleInputChange}
                    required
                    className="formInput w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-600">
                  Year
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    className="formInput w-full p-2 border rounded mt-1"
                  />
                </label>
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    {editItem ? 'Save' : 'Add'}
                  </button>
                  {editItem && (
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition duration-300 ml-4"
                      onClick={() => { close(); setEditItem(null); }}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </Popup>

      {loading ? <p>Loading...</p> : null}
    </div>
  );
};

export default AdminInternational;
