import React, { useEffect, useState } from 'react';
import BannerCard from '../layouts/BannerCard';
import BannerTitle from '../layouts/BannerTitle';
import { API_URL, IMG_URL } from '../../Config';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NewsBanner = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/news`); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <BannerTitle
        title="news" />
      <div className="container grid w-full grid-cols-1 gap-2 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-4">
        {
          data && data?.map((d,index) => (
            <Link to={`/news/${d._id}`} key={index}>
            <BannerCard
              bimg={`${IMG_URL}/${d.image}`}
              title={d.name}
            />
            </Link>
          ))
        }
      </div>
    </div>
  );
};

export default NewsBanner;
