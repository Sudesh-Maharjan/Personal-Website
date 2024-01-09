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
      <div className="container grid w-full grid-cols-1 gap-7 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-4">
        {data.map((item, index) => (
         <Link to={`/service/${item?.id}`} key={index}>
         <div
           className="bg-cover bg-center h-[390px]"
           style={{ backgroundImage: `url(${IMG_URL}/${item?.categoryImage})` }}
         >
           {/* Add any additional content or styling here */}
           <div className="text-white text-center p-4">
             {/* <p>{item?.description.slice(0, 38)}</p> */}
           </div>
         </div>
         <h2 className='text-center font-bold text-xl'>{capitalizeFirstLetter(item?.name)}</h2>
       </Link>
        ))}
      </div>
    </div>
  ) 
} 

export default ServiceBanner 
