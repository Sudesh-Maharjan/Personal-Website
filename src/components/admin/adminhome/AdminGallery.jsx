import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaTimes, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { API_URL, IMG_URL } from '../../../Config';

const AdminGallery = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    image: null,
  });
  const [editItem, setEditItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const[totalPages,setTotalPages]=useState(1)
  const limit = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/gallery/?page=${currentPage}&limit=${limit}`); // Replace with your actual API endpoint for gallery data

      setData(response?.data?.galleryItems);
      setTotalPages(response?.data?.totalPages)
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
      title: item.title,
      date: item.date.substring(0, 10),
    });
    setShowForm(true); // Always show the form when editing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataForRequest = new FormData();
    formDataForRequest.append('title', formData.title);
    formDataForRequest.append('date', formData.date);
    if (formData.image) {
    formDataForRequest.append('image', formData.image);
    }
    console.log(formData)
    try {
      if (editItem) {
        console.log(editItem.id);
        console.log("form", formDataForRequest)
        await axios.put(`${API_URL}/gallery/${editItem.id}`, formDataForRequest, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        Swal.fire('Success!', 'Gallery item updated successfully!', 'success');
        setEditItem(null);
      } else {
        await axios.post(`${API_URL}/gallery`, formDataForRequest, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        Swal.fire('Success!', 'Gallery item added successfully!', 'success');
      }

      fetchData(); // Refresh data after successful action
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
        await axios.delete(`${API_URL}/gallery/${itemId}`);
        Swal.fire('Deleted!', 'Gallery item deleted successfully!', 'success');
        fetchData(); // Refresh data after successful action
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      image: null,
    });
    setEditItem(null);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Gallery</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300 mb-2 md:mb-0"
        >
          Add Gallery Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 py-2 px-4">Title</th>
              <th className="border border-gray-300 py-2 px-4">Date</th>
              <th className="border border-gray-300 py-2 px-4">Image</th>
              <th className="border border-gray-300 py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 py-2 px-4">{item.title}</td>
                <td className="border border-gray-300 py-2 px-4">{item.date.substring(0, 10)}</td>
                <td className="border border-gray-300 py-2 px-4">
                  {item.image && <img src={`${IMG_URL}/${item.image}`} alt={item.title} className="w-16 h-16 object-cover" />}
                </td>
                <td className="border border-gray-300 py-2 px-4">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
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
                  Title
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="formInput w-full p-2 border rounded mt-1"
                    required
                  />
                </label>
                <label className="block text-sm font-medium text-gray-600 mt-4">
                  Date
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="formInput w-full p-2 border rounded mt-1"
                    required
                  />
                </label>
                {/* Conditionally render image input only for adding new items */}
                {!editItem && (
                  <label className="block text-sm font-medium text-gray-600 mt-4">
                    Image
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setFormData({ ...formData, image: e?.target?.files[0] })}
                      className="formInput w-full p-2 border rounded mt-1"
                      required
                    />
                  </label>
                )}
                <div className="mt-6">
                  <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    {editItem ? 'Update' : 'Add'}
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
      <div className=" m-2 flex justify-end">
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage - 1) } disabled={currentPage === 1}>
                          <FaChevronLeft/>prev
                        </button>
                        <span className="p-2 flex items-center">{currentPage} of {totalPages}</span>
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                          next<FaChevronRight/>
                        </button>
            </div>

      {loading ? <p>Loading...</p> : null}
    </div>
  );
};

export default AdminGallery;
