import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { AiTwotoneMail } from 'react-icons/ai';
import { logo } from '../../assets/index';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Config';
import Media from '../banner/Media';
const Footer = () => {
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
    <div className="bg-footer flex justify-center items-center flex-col h-96 ">
      <div className="flex flex-col justify-centerm-4">
        <div className="flex justify-center">
          <Media />
        </div>
      </div>
      <div className="m-4">
      {
        data && data.map((d) => (
          <div className="flex flex-col items-center justify-center" key={d.id}>
            <div className="text-4xl  uppercase tracking-wide m-4 text-white ">{d.name}</div>
            <p className='text-white text-xl'>   {Array.isArray(d.words)
    ? d.words.map((word, index) => (
        (index === 0 ? '' : ', ') + word.charAt(0).toUpperCase() + word.slice(1)
      )).join('')
    : typeof d.words === 'string'
    ? d.words.charAt(0).toUpperCase() + d.words.slice(1)
    : ''}</p>
            <Link to={`mailto:${d.email}`} className='mt-4'>
              {/* <a className="bannerIcon m-3">
                <AiTwotoneMail />
              </a> */}
              <span className=" font-serif text-lg font-medium text-white hover:text-black">{d.email}</span>
            </Link>
          </div>
        ))
      }
      </div>
      <div className="flex items-center justify-center m-2"> {/* Center the logo */}
      <Link to='/contacts'>
       <button className='h-14 w-52  bg-white font-bold p-5 flex justify-center items-center hover:text-white hover:bg-black'>Get Connected</button>
       </Link>
      </div>
    </div>
  );
};
export default Footer;