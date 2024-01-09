import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';
import axios from 'axios';
import { API_URL } from '../../../Config';
const AdminContact = () => {
  const [contactData, setContactData] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const { id } = useParams(); // Get the contact ID from the URL params
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/contactlist`);
      setContactData(response.data.contacts);
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };
  const handleDeleteClick = (contact) => {
    setSelectedContact(contact);
    setShowDeleteConfirmation(true);
  };
  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${API_URL}/deletecontact/${selectedContact.id}`);
      fetchData();
      Swal.fire({
        icon: 'success',
        title: 'Contact deleted successfully!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
      // Reload the page after successful deletion
      window.location.reload();
    } catch (error) {
      console.error('Error deleting contact:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Something went wrong!',
        position: 'top',
        toast: true,
        showConfirmButton: false,
        timer: 3000,
      });
    } finally {
      setShowDeleteConfirmation(false);
      setSelectedContact(null);
    }
  };
  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
    setSelectedContact(null);
  };
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Contact List</h1>
      <div className="overflow-x-auto">
        {contactData.length > 0 ? (
          <table className="min-w-full border border-collapse border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Full Name</th>
                <th className="py-2 px-4 border">Email</th>
                <th className="py-2 px-4 border">Contact Number</th>
                <th className="py-2 px-4 border">Message</th>
                <th className="py-2 px-4 border">Received At</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((contact) => (
                <tr key={contact.id}>
                  <td className="py-2 px-4 border">{contact.id}</td>
                  <td className="py-2 px-4 border">{contact.fullName}</td>
                  <td className="py-2 px-4 border">{contact.email}</td>
                  <td className="py-2 px-4 border">{contact.contactNumber}</td>
                  <td className="py-2 px-4 border">{contact.message}</td>
                  <td className="py-2 px-4 border">{contact.receivedAt}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleDeleteClick(contact)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition duration-300"
                    >
                      Delete
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
      <Popup open={showDeleteConfirmation} onClose={handleCancelDelete} modal closeOnDocumentClick>
        {(close) => (
          <div className="h-auto p-6 bg-white shadow-2xl w-96">
            <p className="mb-4">Are you sure you want to delete this contact?</p>
            <div className="flex justify-end">
              <button
                onClick={handleDeleteConfirmation}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300 mr-2"
              >
                Yes
              </button>
              <button
                onClick={handleCancelDelete}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
              >
                No
              </button>
            </div>
          </div>
        )}
      </Popup>
    </div>
  );
};
export default AdminContact;