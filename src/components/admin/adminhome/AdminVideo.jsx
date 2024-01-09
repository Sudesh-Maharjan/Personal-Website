import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import Swal from 'sweetalert2'
import { API_URL } from '../../../Config'
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";


const AdminVideo = () => {
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    url: '',
  });
  const [editItem, setEditItem] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
  const[totalPages,setTotalPages]=useState(1)
  const limit = 10;

  useEffect(() => {
    fetchData()
  }, [currentPage])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/media/videos/?page=${currentPage}&limit=${limit}`) 
      
      setData(response?.data?.videos);
      setTotalPages(response?.data?.totalPages)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setFormData({
      title: item.title,
      type: item.type,
      url: item.url,
    });
    toggleFormVisibility()
  };

  const handleAddMedia = async () => {
    if (!typeIsValid()) {
      return;
    }

    try {
      await axios.post(`${API_URL}/media/videos`, formData)
      Swal.fire('Success!', 'Video added successfully!', 'success')
      fetchData()
      resetForm()
      toggleFormVisibility()
    } catch (error) {
      console.error('Error adding media:', error.message)
      Swal.fire('Error!', 'Failed to add video.', 'error')
    }
  };

  const handleEditMedia = async () => {
    if (!typeIsValid()) {
      return;
    }

    try {
      await axios.put(`${API_URL}/media/videos/${editItem.id}`, formData)
      Swal.fire('Success!', 'Video updated successfully!', 'success')
      setEditItem(null)
      fetchData()
      resetForm()
      toggleFormVisibility()
    } catch (error) {
      console.error('Error updating media:', error.message)
      Swal.fire('Error!', 'Failed to update video.', 'error')
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
        await axios.delete(`${API_URL}/media/videos/${itemId}`)
        Swal.fire('Deleted!', 'Video deleted successfully!', 'success');
        fetchData()
      } catch (error) {
        console.error('Error deleting video:', error)
        Swal.fire('Error!', 'Failed to delete video.', 'error')
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      type: '',
      url: '',
    });
    setEditItem(null);
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
  };

  const typeIsValid = () => {
    if (!formData.type || (formData.type !== 'Facebook' && formData.type !== 'YouTube')) {
      Swal.fire('Error!', 'Please select a valid type (Facebook or YouTube).', 'error')
      return false
    }
    return true
  }

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Video</h1>

      <div className="flex justify-start mb-4">
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add Video
        </button>
      </div>

      <Popup open={showForm} onClose={toggleFormVisibility} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <div className="modal-header">
              <button onClick={() => { close(); setEditItem(null); }} className="float-right text-gray-500">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={editItem ? handleEditMedia : handleAddMedia} className="mt-9">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600">
                  Title:
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
                  Type:
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="formInput w-full p-2 border rounded mt-1"
                    required
                  >
                    <option value="" disabled>Select a type</option>
                    <option value="Facebook">Facebook</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </label>
                <label className="block text-sm font-medium text-gray-600 mt-4">
                  URL:
                  <input
                    type="text"
                    name="url"
                    value={formData.url}
                    onChange={handleInputChange}
                    className="formInput w-full p-2 border rounded mt-1"
                    required
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

      <div className="overflow-x-auto">
        <table className="min-w-full border border-collapse border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border">SN</th>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">URL</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={item.id}>
                <td className="py-2 px-4 border">{index + 1}</td>
                <td className="py-2 px-4 border">{item.title}</td>
                <td className="py-2 px-4 border">{item.type}</td>
                <td className="py-2 px-4 border">{item.url}</td>
                <td className="py-2 px-4 border">
                  <button
                    onClick={() => handleEditClick(item)}
                    className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-600 transition duration-300"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className=" m-2 flex justify-end">
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage - 1) } disabled={currentPage === 1}>
                          <FaChevronLeft/>prev
                        </button>
                        <span className="p-2 flex items-center">{currentPage} of {totalPages}</span>
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                          next<FaChevronRight/>
                        </button>
            </div>
    </div>
  )
}

export default AdminVideo
