import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { API_URL, IMG_URL } from "../../../Config";
import { FaEdit, FaTimes, FaTrash } from 'react-icons/fa';

const AdminBusiness = () => {
    const [businesses, setBusinesses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    // State for Add modal form data
    const [addFormData, setAddFormData] = useState({
        name: '',
        description: '',
        location: '',
        startDate: null,
        endDate: null,
        image: null,
    });

    // State for Edit modal form data
    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        description: '',
        location: '',
        startDate: null,
        endDate: null,
        image: null,
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_URL}/business`);
            setBusinesses(response.data);
        } catch (error) {
            console.error('Error fetching business data:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/business/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting business:', error);
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
            image: e.target.files[0],
        });
    };

    const handleAddSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataObject.append('name', addFormData.name);
            formDataObject.append('description', addFormData.description);
            formDataObject.append('location', addFormData.location);

            // Convert date values to strings before appending
            formDataObject.append('startDate', addFormData.startDate ? new Date(addFormData.startDate).toISOString().split('T')[0] : null);

            // Check if endDate is specified, if yes, set it to the provided date
            if (addFormData.endDate) {
                formDataObject.append('endDate', new Date(addFormData.endDate).toISOString().split('T')[0]);
            }

            formDataObject.append('image', addFormData.image);

            const response = await axios.post(`${API_URL}/business`, formDataObject, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Server Response:', response.data);

            setShowAddModal(false);
            fetchData();
        } catch (error) {
            console.error('Error adding business:', error);
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
            image: e.target.files[0],
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        try {
            const formDataObject = new FormData();
            formDataObject.append('name', editFormData.name);
            formDataObject.append('description', editFormData.description);
            formDataObject.append('location', editFormData.location);
            formDataObject.append('startDate', editFormData.startDate);
            formDataObject.append('endDate', editFormData.endDate);
            formDataObject.append('image', editFormData.image);
            formDataObject.append('id', editFormData.id);

            await axios.put(`${API_URL}/business/${editFormData.id}`, formDataObject, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(FormData)

            setShowEditModal(false);
            fetchData();
        } catch (error) {
            console.error('Error updating business:', error);
        }
    };

    return (
        <div className="container mx-auto mt-8 p-4">
            <h1 className="text-2xl font-bold mb-4">Business List</h1>

            <button
                onClick={() => setShowAddModal(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-300"
            >
                Add Business
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {businesses.map((business) => (
                    <div key={business.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={`${IMG_URL}/${business.image}`} alt={business.name} className="w-full h-32 object-cover mb-4" />
                        <h2 className="text-xl font-bold mb-2">{business.name}</h2>
                        <p className="text-gray-500">{business.description || 'No description available'}</p>
                        <p className="text-gray-500">Location: {business.location ? business.location.charAt(0).toUpperCase() + business.location.slice(1) : 'No location available'}</p>
                        <p className="text-gray-500">
                            Start Date: {business.startDate ? new Date(business.startDate).toLocaleDateString() : 'Not specified'}
                        </p>
                        <p className="text-gray-500">
                            End Date: {business.endDate ? new Date(business.endDate).toLocaleDateString() : 'Running'}
                        </p>
                        <div className="flex mt-4 gap-2">
                            <button
                                onClick={() => {
                                    setShowEditModal(true);
                                    setEditFormData({
                                        id: business.id,
                                        name: business.name,
                                        description: business.description || '',
                                        location: business.location || '',
                                        startDate: business.startDate || null,
                                        endDate: business.endDate || null,
                                        image: null, // You may want to handle images separately based on your requirements
                                    });
                                }}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition duration-300"
                            >
                                <FaEdit />
                            </button>
                            <button
                                onClick={() => handleDelete(business.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300 "
                            >
                                <FaTrash />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Business Modal */}
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
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={addFormData.name}
                                            onChange={handleAddInputChange}
                                            className="singleFormInput"
                                            placeholder="Business Name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-6 mb-6 mt-8 md:grid-cols-2 jus">
                                        <div>
                                            <label htmlFor="description" className="formLabel">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={addFormData.description}
                                                onChange={handleAddInputChange}
                                                className="formInput"
                                                placeholder="Location"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="location" className="formLabel">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={addFormData.location}
                                                onChange={handleAddInputChange}
                                                className="formInput"
                                                placeholder="Title"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="startDate">Start Date:</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={addFormData.startDate}
                                                onChange={handleAddInputChange}
                                                placeholder="Start Date"
                                                className="singleFormInput"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="endDate">End Date:</label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={addFormData.endDate}
                                                onChange={handleAddInputChange}
                                                className="singleFormInput"
                                                
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div>
                                            <label className="singleFormLabel" htmlFor="file_input">
                                                Upload file
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handleAddImageChange}
                                                accept=".jpg, .png, .jpeg"
                                                className="imgUploadInput"
                                                required
                                            />
                                            <p className="singleFormLabel" id="file_input_help">
                                                Only PNG (no background) (MAX. 800x400px).
                                            </p>
                                        </div>
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

            {/* Edit Business Modal */}
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
                                            Business Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={editFormData.name}
                                            onChange={handleEditInputChange}
                                            className="singleFormInput"
                                            placeholder="Business Name"
                                            required
                                        />
                                    </div>
                                    <div className="grid gap-6 mb-6 mt-8 md:grid-cols-2 jus">
                                        <div>
                                            <label htmlFor="description" className="formLabel">
                                                Description
                                            </label>
                                            <textarea
                                                type="text"
                                                id="description"
                                                name="description"
                                                value={editFormData.description}
                                                onChange={handleEditInputChange}
                                                className="formInput"
                                                placeholder="Location"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="location" className="formLabel">
                                                Location
                                            </label>
                                            <input
                                                type="text"
                                                id="location"
                                                name="location"
                                                value={editFormData.location}
                                                onChange={handleEditInputChange}
                                                className="formInput"
                                                placeholder="Title"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="startDate">Start Date:</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                value={editFormData.startDate?.split('T')[0]}
                                                onChange={handleEditInputChange}
                                                placeholder="Start Date"
                                                className="singleFormInput"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="endDate">End Date:</label>
                                            <input
                                                type="date"
                                                id="endDate"
                                                name="endDate"
                                                value={editFormData.endDate?.split('T')[0]}
                                                onChange={handleEditInputChange}
                                                className="singleFormInput"
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-6">
                                        <div>
                                            <label className="singleFormLabel" htmlFor="file_input">
                                                Upload file
                                            </label>
                                            <input
                                                type="file"
                                                id="image"
                                                name="image"
                                                onChange={handleEditImageChange}
                                                accept=".jpg, .png, .jpeg"
                                                className="imgUploadInput"
                                            />
                                            <p className="singleFormLabel" id="file_input_help">
                                                Only PNG (no background) (MAX. 800x400px).
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Update Business
                            </button>
                        </form>
                    </div>
                )}
            </Popup>
        </div>
    );
};

export default AdminBusiness;
