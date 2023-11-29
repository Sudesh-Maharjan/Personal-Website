import React, { useEffect, useState } from 'react';
import BannerTitle from '../layouts/BannerTitle';
import axios from 'axios'; 
import { API_URL, IMG_URL } from '../../Config';

const Gallery = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/gallery`); // Replace with your actual API endpoint for gallery data
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <BannerTitle title="Gallery" />

      <div className="h-[600px] overflow-y-auto">
        <div className="grid grid-cols-2 gap-4 xs:p-4 md:grid-cols-3 lg:grid-cols-4 lgl:grid-cols-5">
          {data.map((item) => (
            <div key={item._id}>
              <img
                className="h-[180px] w-[250px] max-w-full rounded-lg"
                src={`${IMG_URL}/${item.photo}`}
                alt={item.photo} 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
