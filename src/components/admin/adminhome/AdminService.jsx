import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';
import { API_URL, IMG_URL } from '../../../Config';

const AdminService = () => {
    const [services, setServices] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // State for Add modal form data
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        categoryImage: null,
    });

    // State for Edit modal form data
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        description: '',
        categoryImage: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/servicecategories`);
            setServices(response.data);
        } catch (error) {
            console.error('Error fetching service data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/servicecategories/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting service:', error);
        }
    };

    // Handlers for Add modal form
    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setAddFormData({ ...addFormData, [name]: value });
    };

    const handleAddImageChange = (e) => {
        setAddFormData({
            ...addFormData,
            categoryImage: e.target.files[0],
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataObject.append('name', addFormData.name);
            formDataObject.append('description', addFormData.description);
            formDataObject.append('categoryImage', addFormData.categoryImage);

            await axios.post(`${API_URL}/servicecategories`, formDataObject, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('updated')

            setShowAddModal(false);
            fetchData();
        } catch (error) {
            console.error('Error adding service:', error);
        }
    };

    // Handlers for Edit modal form
    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({ ...editFormData, [name]: value });
    };

    const handleEditImageChange = (e) => {
        setEditFormData({
            ...editFormData,
            categoryImage: e.target.files[0],
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataObject.append('name', editFormData.name);
            formDataObject.append('description', editFormData.description);
            formDataObject.append('categoryImage', editFormData.categoryImage);
            formDataObject.append('id', editFormData.id);

            await axios.put(`${API_URL}/servicecategories/${editFormData.id}`, formDataObject, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setShowEditModal(false);
            fetchData();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Service List</h1>

            <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
                Add Service
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {services.map((service) => (
                    <div key={service.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={`${IMG_URL}/${service.categoryImage}`} alt={service.name} className="mb-4 shadow-md  mx-auto md:w-[230px] md:h-[230px] w-[300px] h-[300px] object-cover" />
                        <h2 className="text-xl font-bold mb-2">{service.name}</h2>
                        <p className="text-gray-500">{service.description || 'No description available'}</p>
                        <div className="flex mt-4 gap-2">
                            <button
                                onClick={() => {
                                    setShowEditModal(true);
                                    setEditFormData({
                                        id: service.id,
                                        name: service.name,
                                        description: service.description || '',
                                        categoryImage: null,
                                    });
                                }}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(service.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Service Modal */}
            <Popup open={showAddModal} onClose={() => setShowAddModal(false)} modal closeOnDocumentClick>
                {(close) => (
                    <div className="h-auto p-6 bg-white shadow-2xl max-w-xl mx-auto">
                        <button className="float-right text-gray-500" onClick={close}>
                            <FaTimes />
                        </button>
                        <form onSubmit={handleAddSubmit}>
                            <div className="grid gap-3 mb-6 mt-8">
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="name" className="singleFormLabel">
                                            Service Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={addFormData.name}
                                            onChange={handleAddInputChange}
                                            className="singleFormInput"
                                            placeholder="Service Name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="description" className="singleFormLabel">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={addFormData.description}
                                            onChange={handleAddInputChange}
                                            className="singleFormInput"
                                            placeholder="Description"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="singleFormLabel" htmlFor="file_input">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="categoryImage"
                                            name="categoryImage"
                                            onChange={handleAddImageChange}
                                            accept=".jpg, .png, .jpeg"
                                            className="imgUploadInput"
                                            required
                                        />
                                        <p className="singleFormLabel" id="file_input_help">
                                            Only PNG/JPG (MAX. 800x400px).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                )}
            </Popup>

            {/* Edit Service Modal */}
            <Popup open={showEditModal} onClose={() => setShowEditModal(false)} modal closeOnDocumentClick>
                {(close) => (
                    <div className="h-auto p-6 bg-white shadow-2xl max-w-xl mx-auto">
                        <button className="float-right text-gray-500" onClick={close}>
                            <FaTimes />
                        </button>
                        <form onSubmit={handleEditSubmit}>
                            <div className="grid gap-3 mb-6 mt-8">
                                <div>
                                    <div className="mb-6">
                                        <label htmlFor="name" className="singleFormLabel">
                                            Service Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditInputChange}
                                            className="singleFormInput"
                                            placeholder="Service Name"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="description" className="singleFormLabel">
                                            Description
                                        </label>
                                        <textarea
                                            type="text"
                                            id="description"
                                            name="description"
                                            value={editFormData.description}
                                            onChange={handleEditInputChange}
                                            className="singleFormInput"
                                            placeholder="Description"
                                            required
                                        />
                                    </div>
                                    <div className="mb-6">
                                        <label className="singleFormLabel" htmlFor="file_input">
                                            Upload Image
                                        </label>
                                        <input
                                            type="file"
                                            id="categoryImage"
                                            name="categoryImage"
                                            onChange={handleEditImageChange}
                                            accept=".jpg, .png, .jpeg"
                                            className="imgUploadInput"
                                        />
                                        <p className="singleFormLabel" id="file_input_help">
                                            Only PNG/JPG (MAX. 800x400px).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update Service
                            </button>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default AdminService;
