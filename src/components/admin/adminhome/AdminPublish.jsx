import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { API_URL } from '../../../Config';
import { FaEdit, FaTrash } from 'react-icons/fa';

const AdminPublish = () => {
  const [formData, setFormData] = useState({
    name: '',
    publishedDate: '',
    url: '',
    serviceCategory: '',
    description: '',
    photo: null,
  });

  const [serviceCategories, setServiceCategories] = useState([]);
  const [publishedItems, setPublishedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState('create');
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serviceCategoriesResponse = await axios.get(`${API_URL}/servicecategories`);
        setServiceCategories(serviceCategoriesResponse.data);
        const publishedItemsResponse = await axios.get(`${API_URL}/publish/published-items`);
        setPublishedItems(publishedItemsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('publishedDate', formData.publishedDate);
    data.append('url', formData.url);
    data.append('serviceCategory', formData.serviceCategory);
    data.append('description', formData.description);
    data.append('photo', formData.photo);

    try {
      if (modalAction === 'create') {
        await axios.post(`${API_URL}/publish/published-items`, data);
      } else if (modalAction === 'update') {
        await axios.put(`${API_URL}/publish/published-items/${selectedItemId}`, data);
      }
      setIsModalOpen(false);
      setModalAction('create');
      setSelectedItemId(null);
      // Refresh published items
      const publishedItemsResponse = await axios.get(`${API_URL}/publish/published-items`);
      setPublishedItems(publishedItemsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = (id) => {
    const selectedItem = publishedItems.find((item) => item.id === id);
    setFormData({
      name: selectedItem.name,
      publishedDate: selectedItem.publishedDate,
      url: selectedItem.url,
      serviceCategory: selectedItem.serviceCategory,
      description: selectedItem.description,
      photo: null, // Set to null to avoid accidental file upload
    });
    setModalAction('update');
    setSelectedItemId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/publish/published-items/${id}`);
      // Refresh published items
      const publishedItemsResponse = await axios.get(`${API_URL}/publish/published-items`);
      setPublishedItems(publishedItemsResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = () => {
    setModalAction('create');
    setIsModalOpen(true);
    setSelectedItemId(null);
    // Optionally, you can reset the form data when the "Add" button is clicked
    setFormData({
      name: '',
      publishedDate: '',
      url: '',
      serviceCategory: '',
      description: '',
      photo: null,
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Published Items</h2>
      <button
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
        onClick={handleAdd}
      >
        Add Publish
      </button>
      <table className="mt-4 w-full border-t border-b border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-r">Name</th>
            <th className="py-2 px-4 border-r">Published Date</th>
            <th className="py-2 px-4 border-r">URL</th>
            <th className="py-2 px-4 border-r">Service Category</th>
            <th className="py-2 px-4 border-r">Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {publishedItems.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-4 border-r">{item.name}</td>
              <td className="py-2 px-4 border-r">{item.publishedDate}</td>
              <td className="py-2 px-4 border-r">{item.url}</td>
              <td className="py-2 px-4 border-r">{item?.ServiceCategory?.name}</td>
              <td className="py-2 px-4 border-r">{item.description}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                  onClick={() => handleUpdate(item.id)}
                >
                  <FaEdit />
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 ml-2"
                  onClick={() => handleDelete(item.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
          content: {
            width: '100%',
            maxWidth: '500px',
            margin: 'auto',
          },
        }}
      >
        <span className="close text-2xl" onClick={() => setIsModalOpen(false)}>
          &times;
        </span>
        <h2 className="text-xl font-bold mb-4">{modalAction === 'create' ? 'Create' : 'Update'} Published Item</h2>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="publishedDate">
              Published Date:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="publishedDate"
              type="text"
              name="publishedDate"
              value={formData.publishedDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="url">
              URL:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="url"
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="serviceCategory">
              Service Category:
            </label>
            <select
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="serviceCategory"
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              required
            >
              <option value="">Select a Service Category</option>
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description:
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="photo">
              Image:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="photo"
              type="file"
              onChange={handleFileChange}
             
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {modalAction === 'create' ? 'Create' : 'Update'}
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AdminPublish;