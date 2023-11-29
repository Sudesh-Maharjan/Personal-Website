import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { API_URL } from '../../../Config';

const AdminMedia = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    icon: null,
  });
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/url`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({
      name: item.name,
      url: item.url,
      icon: null,
    });
    toggleFormVisibility();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData();
    formDataForRequest.append('name', formData.name);
    formDataForRequest.append('url', formData.url);

    try {
      if (editItem) {
        await axios.put(`${API_URL}/url/${editItem._id}`, formDataForRequest, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire('Success!', 'Social media link updated successfully!', 'success');
        setEditItem(null);
      } else {
        await axios.post(`${API_URL}/url/create`, formDataForRequest, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire('Success!', 'Social media link added successfully!', 'success');
      }

      fetchData();
      resetForm();
      toggleFormVisibility(); // Hide the form after submission
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
        await axios.delete(`${API_URL}/url/${itemId}`);
        Swal.fire('Deleted!', 'Social media link deleted successfully!', 'success');
        fetchData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      url: '',
      icon: null,
    });
    setEditItem(null); // Reset the editItem state
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Media</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mb-2 md:mb-0"
        >
          Add Link
        </button>
        {/* Add other buttons as needed */}
      </div>

      <div className="flex flex-wrap justify-center">
        {data.map((item) => (
          <div
            key={item._id}
            className="bg-white p-4 rounded-lg shadow-md mb-4 mx-2 sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
          >
            {/* Content of the card */}
            <div className="flex flex-col items-center mb-2">
              <h2 className="text-xl font-bold">{item.name}</h2>
              {/* Conditionally render URL based on screen size */}
              {window.innerWidth > 640 && (
                <p className="text-gray-500">{item.url}</p>
              )}
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleEditClick(item)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

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
                  Social Media Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="formInput w-full p-2 border rounded mt-1"
                  />
                </label>
                <label className="block text-sm font-medium text-gray-600 mt-4">
                  URL
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
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

      {loading ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
};

export default AdminMedia;
