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
    <div className="grid w-full h-auto grid-cols-1 gap-8 py-10 bg-black md:grid-cols-2 lgl:grid-cols-3">
      <div className="flex flex-col justify-center w-full h-full">
        <div className="flex gap-4 ml-6">
          <Media />
        </div>
      </div>
      <div className="flex items-center justify-center"> {/* Center the logo */}
        <img className="w-32" src={logo} alt="logo" />
      </div>
      {
        data && data.map((d) => (

          <div className="flex items-end justify-end gap-4 mr-6 " key={d.id}>
            <Link to={`mailto:${d.email}`}>
              <a className="bannerIcon">
                <AiTwotoneMail />
              </a>
              <span className="ml-3 font-serif text-lg font-medium text-white hover:text-designColor">{d.email}</span>
            </Link>
          </div>
        ))
      }
    </div>
  );
};

export default Footer;
