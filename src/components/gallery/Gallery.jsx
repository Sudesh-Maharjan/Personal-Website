import React, { useEffect, useState } from 'react';
import BannerTitle from '../layouts/BannerTitle';
import axios from 'axios';
import { API_URL, IMG_URL } from '../../Config';
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Modal from 'react-modal';
import { IoMdClose } from "react-icons/io";

const Gallery = () => {

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)', // Center the modal horizontally and vertically
      maxWidth: '95vw', // Adjust the maximum width of the modal
      maxHeight: '95vh', // Adjust the maximum height of the modal
      overflow: 'hidden', // Hide overflow to remove scroll
    },
  };

  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const[totalPages,setTotalPages]=useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const limit = 10;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery/?page=${currentPage}&limit=${limit}`); // Replace with your actual API endpoint for gallery data
        setData(response?.data?.galleryItems);
        setTotalPages(response?.data?.totalPages)
        setLoad(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoad(false);
      }
    };
    fetchData();
  }, [currentPage]);

  
  const openModal = (image) => {
    setSelectedImage(image);
  };

  // Function to close the modal
  const closeModal = () => {
    setSelectedImage(null);
  };


  return (
    <div>
      <BannerTitle title="Gallery" />
      {/* Loader */}
      {load && (
        <div role="status" className='flex justify-center mt-28'>
          <svg aria-hidden="true" className="inline w-406 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      )}
      {/* End Loader */}

      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
        style={modalStyles} // Apply custom styles
      >
        {/* {selectedImage && (
          <div>
            <img
              className="w-full h-auto rounded-lg"
              src={`${IMG_URL}/${selectedImage.image}`}
              alt={selectedImage.photo}
            />
            <button onClick={closeModal} className='bg-slate-800'>Close</button>
          </div>
        )} */}
      </Modal>
      <div className=" overflow-y-auto flex justify-center items-center">
        <div className="grid xs:grid-cols-1 gap-4 xs:p-4 md:grid-cols-3 lg:grid-cols-4 lgl:grid-cols-5">
          {data.map((item) => (
            <div key={item.id} className='relative hover:cursor-pointer transform transition-transform hover:scale-105'>
              <img
                className="w-full h-[220px] rounded-lg object-cover"
                src={`${IMG_URL}/${item.image}`}
                alt={item.photo}
                onClick={() => openModal(item)}
              />
              <div className="bg-black opacity-60 text-white text-center absolute top-[180px] p-2 w-[237px] rounded-b-lg">
              <h2 className='opacity-100 font-bold'>{item.title.charAt(0).toUpperCase() + item.title.slice(1)}</h2>

              </div>
            </div>
          ))}
        </div>


      </div>
      <Modal
        isOpen={selectedImage !== null}
        onRequestClose={closeModal}
        contentLabel="Enlarged Image"
        className="flex justify-center  items-center"
      >
        {selectedImage && (
          <div className='text-center object-cover w-[700px] flex flex-col mt-32 relative'>
            <IoMdClose  onClick={closeModal} className='text-3xl absolute cursor-pointer right-0 m-1 bg-white rounded-md'/>

            <img
              className="rounded-lg"
              src={`${IMG_URL}/${selectedImage.image}`}
              alt={selectedImage.photo}
            />
          </div>
        )}
      </Modal>
      <div className=" m-2 flex justify-end">
                        <button className="hover:bg-gray-500 hover:cursor-pointer btn-pagination bg-gray-600 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage - 1) } disabled={currentPage === 1}>
                          <FaChevronLeft/>prev
                        </button>
                        <span className="p-2 flex items-center">{currentPage} of {totalPages}</span>
                        <button className="hover:bg-gray-500 hover:cursor-pointer btn-pagination bg-gray-600 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                          next<FaChevronRight/>
                        </button>
            </div>
           
    </div>
  );
}
export default Gallery;