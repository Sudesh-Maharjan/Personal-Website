import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { API_URL } from '../../../Config';

const AdminTravel = () => {
  const [nationalData, setNationalData] = useState([]);
  const [internationalData, setInternationalData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
  });
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchNationalData();
    fetchInternationalData();
  }, []);

  const fetchNationalData = async () => {
    try {
      const response = await axios.get(`${API_URL}/national`);
      setNationalData(response.data);
    } catch (error) {
      console.error('Error fetching national data:', error);
    }
  };

  const fetchInternationalData = async () => {
    try {
      const response = await axios.get(`${API_URL}/international`);
      setInternationalData(response.data);
    } catch (error) {
      console.error('Error fetching international data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditClick = (item, isNational) => {
    setEditItem(item);
    setFormData({
      name: item.name,
    });
    toggleFormVisibility();
  };

  const handleSubmit = async (e, isNational) => {
    e.preventDefault();
  
    try {
      console.log('Submitting form data:', formData);
      if (editItem) {
        // Handle edit for national or international based on the flag
        await axios.put(`${API_URL}/${isNational ? 'national' : 'international'}/${editItem._id}`, {
          name: formData.name,
        });
        Swal.fire('Success!', 'Travel destination updated successfully!', 'success');
        setEditItem(null);
      } else {
        // Handle add for national or international based on the flag
        await axios.post(`${API_URL}/${isNational ? 'national' : 'international'}/create`, {
          name: formData.name,
        });
        Swal.fire('Success!', 'Travel destination added successfully!', 'success');
      }

      isNational ? fetchNationalData() : fetchInternationalData();
      resetForm();
      toggleFormVisibility(); // Hide the form after submission
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async (itemId, isNational) => {
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
        // Handle delete for national or international based on the flag
        await axios.delete(`${API_URL}/${isNational ? 'national' : 'international'}/${itemId}`);
        Swal.fire('Deleted!', 'Travel destination deleted successfully!', 'success');
        isNational ? fetchNationalData() : fetchInternationalData();
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
    });
    setEditItem(null); // Reset the editItem state
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">National and International Travel</h1>

      {/* National Travel Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">National Travel</h2>
        <div className="mb-4">
          <button
            onClick={() => {
              setEditItem(null);
              toggleFormVisibility();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add New Place
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="py-2 px-4 border">Place Name</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {nationalData.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEditClick(item, true)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, true)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* International Travel Table */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">International Travel</h2>
        <div className="mb-4">
          <button
            onClick={() => {
              setEditItem(null);
              toggleFormVisibility();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
          >
            Add New Place
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-300">
          {/* Table headers */}
          <thead>
            <tr>
              <th className="py-2 px-4 border">Country Name</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {internationalData.map((item) => (
              <tr key={item._id}>
                <td className="py-2 px-4 border">{item.name}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEditClick(item, false)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id, false)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Form Popup */}
      <Popup open={showForm} onClose={toggleFormVisibility} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <div className="modal-header">
              <button onClick={() => { close(); setEditItem(null); }} className="float-right text-gray-500">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={(e) => handleSubmit(e, editItem ? true : false)}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">
                  Destination Name
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
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
    </div>
  );
};

export default AdminTravel;
