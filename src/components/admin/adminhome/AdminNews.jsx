import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import { format, formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { FaEdit, FaTimes } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { API_URL } from '../../../Config';
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";


const AdminNews = () => {
  const [newsData, setNewsData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const[totalPages,setTotalPages]=useState(1)
  const limit = 10;
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    description: '',
    image: '',
  });
  const [addFormData, setAddFormData] = useState({
    name: '',
    description: '',
    image: null,
  });
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/news/?page=${currentPage}&limit=${limit}`);
      setNewsData(response?.data?.news);
      setTotalPages(response?.data?.totalPages)
    } catch (error) {
      console.error('Error fetching news data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.get(`${API_URL}/news/${id}`);
      const newsTitle = response.data.name;

      const isConfirmed = await Swal.fire({
        icon: 'warning',
        title: `Are you sure you want to delete this news "${newsTitle}"?`,
        showCancelButton: true,
        confirmButtonText: 'Sure',
        cancelButtonText: 'Cancel',
      });

      if (isConfirmed.isConfirmed) {
        await axios.delete(`${API_URL}/news/${id}`);
        fetchData();
        Swal.fire({
          icon: 'success',
          title: 'News deleted successfully!',
          position: 'top',
          toast: true,
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const handleEditClick = (news) => {
    setEditFormData(news);
    setShowEditModal(true);
    setAddFormData({
      name: '',
      description: '',
      image: null,
    });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditImageChange = (e) => {
    setEditFormData({
      ...editFormData,
      image: e.target.files[0],
    });
  };

  const handleEditEditorChange = (value) => {
    setEditFormData({
      ...editFormData,
      description: value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      formDataObject.append('name', editFormData.name);
      formDataObject.append('description', editFormData.description);
      formDataObject.append('image', editFormData.image);

      await axios.put(`${API_URL}/news/${editFormData.id}`, formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowEditModal(false);

      Swal.fire({
        icon: 'success',
        title: 'News updated successfully!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error('Error updating news:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditFormData({
      id: '',
      name: '',
      description: '',
      image: '',
    });
  };

  const handleAddInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormData({ ...addFormData, [name]: value });
  };

  const handleAddImageChange = (e) => {
    setAddFormData({
      ...addFormData,
      image: e.target.files[0],
    });
  };

  const handleAddEditorChange = (value) => {
    setAddFormData({
      ...addFormData,
      description: value,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataObject = new FormData();
      formDataObject.append('name', addFormData.name);
      formDataObject.append('description', addFormData.description);
      formDataObject.append('image', addFormData.image);

      await axios.post(`${API_URL}/news`, formDataObject, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setShowAddModal(false);

      Swal.fire({
        icon: 'success',
        title: 'News added successfully!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.error('Error adding news:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddFormData({
      name: '',
      description: '',
      image: null,
    });
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Admin News</h1>

      <div className="flex justify-start mb-4">
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        >
          Add News
        </button>
      </div>

      <div className="overflow-x-auto">
        {newsData.length > 0 ? (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border">SN</th>
                <th className="py-2 px-4 border">Date</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {newsData.map((news, index) => (
                <tr key={news.id}>
                  <td className="py-2 px-4 border">{index + 1}</td>
                  <td className="py-2 px-4 border">
                    {format(new Date(news.createdAt), 'yyyy MMM dd')} (
                    {formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}
                    )
                  </td>
                  <td className="py-2 px-4 border">{news.name}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleEditClick(news)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2 rounded hover:bg-blue-600 transition duration-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(news.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <Popup open={showEditModal} onClose={closeEditModal} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <div className="modal-header">
              <button onClick={close} className="float-right text-gray-500">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="max-w-xl mx-auto">
              <div className="mb-4">
                <label htmlFor="editName" className="block text-sm font-medium text-gray-600">
                  News Title
                </label>
                <input
                  type="text"
                  id="editName"
                  name="name"
                  value={editFormData.name}
                  onChange={handleEditInputChange}
                  required
                  className="formInput w-full p-2 border rounded mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="editDescription" className="block text-sm font-medium text-gray-600">
                  News Description
                </label>
                <ReactQuill
                  value={editFormData.description}
                  onChange={(value) => handleEditEditorChange(value)}
                  required

                  className="bg-white p-2 mt-1 h-64 overflow-y-auto"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="editImage" className="block text-sm font-medium text-gray-600">
                  News Image
                </label>
                <input
                  type="file"
                  id="editImage"
                  name="image"
                  onChange={handleEditImageChange}
                  accept=".jpg, .png, .jpeg"
                  required

                  className="imgUploadInput mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  Update News
                </button>
              </div>
            </form>
          </div>
        )}
      </Popup>

      <Popup open={showAddModal} onClose={closeAddModal} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <div className="modal-header">
              <button onClick={close} className="float-right text-gray-500">
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="max-w-xl mx-auto">
              <div className="mb-4">
                <label htmlFor="addName" className="block text-sm font-medium text-gray-600">
                  News Title
                </label>
                <input
                  type="text"
                  id="addName"
                  name="name"
                  value={addFormData.name}
                  onChange={handleAddInputChange}
                  required

                  className="formInput w-full p-2 border rounded mt-1"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="addDescription" className="block text-sm font-medium text-gray-600">
                  News Description
                </label>
                <ReactQuill
                  value={addFormData.description}
                  onChange={(value) => handleAddEditorChange(value)}
                  className="bg-white p-2 mt-1 h-64 overflow-y-auto"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="addImage" className="block text-sm font-medium text-gray-600">
                  News Image
                </label>
                <input
                  type="file"
                  id="addImage"
                  name="image"
                  onChange={handleAddImageChange}
                  accept=".jpg, .png, .jpeg"
                  className="imgUploadInput mt-1"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
                >
                  Add News
                </button>
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
    </div>
  )
}

export default AdminNews 
