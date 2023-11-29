import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { API_URL, IMG_URL } from '../../Config';

const RightBanner = () => {
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

      {
        data && data.map((d) => (
          <div className="relative flex items-center justify-center w-full lgl:w-1/2 " key={d.id}>

            <img
              className="w-[300px] h-[400px] lgl:w-[400px] lgl:h-[600px] z-10 object-cover"
              src={`${IMG_URL}/${d.profilePic}`}
              alt="bannerImg"
            />
            <div className="absolute bottom-0 w-[330px] h-[300px] lgl:w-[420px] lgl:h-[440px] bg-gradient-to-r from-[#989fac] to-[#265fa4] drop-shadow-2xl flex justify-center items-center"></div>
          </div>
        ))}

    </>
  );
}

export default RightBanner