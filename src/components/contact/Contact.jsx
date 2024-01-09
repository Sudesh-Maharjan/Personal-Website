import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { MdEmail } from "react-icons/md";
import { API_URL, IMG_URL } from '../../Config';
const Contact = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/introduction/personal-info`); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="xs:bg-white xs:flex-col md:flex md:flex-row md:bg-gray-200 gap-20 justify-center items-center">
        <div className="mt-12 xs:flex-col sml:flex sml:flex-col sml:my-10 lg:flex-row gap-14 justify-center items-center">
          <div className="bg-white  xs:m-9 xs:h-[300px] xs:w-[300px] sml:m-0 sml:h-[500px] sml:w-[500px] rounded-lg shadow-lg p-4">
            <div className="xs:ml-7 md:ml-16">
              <h2 className='text-3xl p-3'>Get In Touch</h2>
              <div className="p-3 flex gap-4">
                <MdEmail className='mt-1' /> dursikshya123@gmail.com
              </div>
            </div>
            <div className="">
              {
                data && data.map((d) => (
                  <div className="relative flex items-center justify-center" key={d.id}>
                    <img
                      className="xs:w-[90px] xs:mt-12 sml:w-[200px] sml:h-[300px] z-10 object-cover mt-14"
                      src={`${IMG_URL}/${d.profilePic}`}
                      alt="bannerImg"
                    />
                    <div className="rounded-lg absolute bottom-0 top-5 w-[230px] h-[150px] sml:w-[320px] sml:h-[340px] bg-gradient-to-r from-[#989FAC] to-[#265FA4] drop-shadow-2xl flex justify-center items-center"></div>
                  </div>
                ))}
            </div>
          </div>
          <div className="bg-white shadow-lg xs:m-8 xs:h-[300px] xs:w-[310px]  sml:m-0 sml:h-[500px] sml:w-[800px] rounded-lg p-6 ">
            <div className="grid grid-cols-2 xs:p-1 md:p-3 gap-5">
              <input type="text" className='h-[50px] xs:p-2 md:p-4 border-2 rounded-lg' placeholder='Full name' />
              <input type="text" className='h-[50px] xs:p-2 md:p-4 border-2 rounded-lg' placeholder='Email Address' />
            </div>
            <div className="grid grid-cols-2 p-3 gap-5">
              <input type="number" className='h-[50px] xs:p-2 md:p-4 rounded-lg border-2' placeholder='Phone number' />
              <input type="text" className='h-[50px] xs:p-2 md:p-4 rounded-lg border-2' placeholder='District, if in Nepal or Country, if Abroad' />
            </div>
            <div className="flex justify-center  md:mt-9 ">
              <input type="text" className='xs:h-[50px] md:h-[150px] md:w-[720px] p-5 rounded-lg border-2' placeholder='Leave us Comment' />
            </div>
            <button className='bg-black p-4 m-5 rounded-lg text-white xs:w-[220px]  md:w-[700px] '>Send Message</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Contact