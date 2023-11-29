import React, { useEffect, useState } from 'react' 
import { Link } from 'react-router-dom'  // Import Link
import BannerCard from '../layouts/BannerCard' 
import BannerTitle from '../layouts/BannerTitle' 
import { API_URL, IMG_URL } from '../../Config' 
import axios from 'axios' 

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() 
}
const ServiceBanner = () => {
  const [data, setData] = useState([]) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/servicecategories`) 
        setData(response.data) 
      } catch (error) {
        console.error('Error fetching data:', error) 
      }
    } 
    fetchData() 
  }, []) 

  return (
    <div>
      <BannerTitle title="What Services I'm Providing" />
      <div className="container grid w-full grid-cols-1 gap-2 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-4">
        {data.map((item, index) => (
          <Link to={`/service/${item._id}`} key={index}>
            <BannerCard
              bimg={`${IMG_URL}/${item.categoryImage}`}
              title={capitalizeFirstLetter(item.name)}
              des={item.description}
            />
          </Link>
        ))}
      </div>
    </div>
  ) 
} 

export default ServiceBanner 
