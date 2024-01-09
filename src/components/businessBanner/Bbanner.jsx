import React, { useEffect, useState } from 'react' 
import BannerCard from '../layouts/BannerCard' 
import BannerTitle from '../layouts/BannerTitle' 
import { API_URL, IMG_URL } from '../../Config' 
import axios from 'axios' 
import { Link } from 'react-router-dom' 

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() 
}

const Bbanner = () => {
  const [data, setData] = useState([]) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/business`) 
        setData(response.data) 
      } catch (error) {
        console.error('Error fetching data:', error) 
      }
    } 
    fetchData() 
  }, []) 

  return (
    <div>
      <BannerTitle title="Business" />
      <div className="container grid w-full grid-cols-1 gap-8 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-4 ">
        {data &&
          data?.map((d, index) => (
            <Link to={`/business/${d.id}`} key={index}> 
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:scale-105
            ">
              <div
                className="bg-cover bg-center h-[300px]"
                style={{ backgroundImage: `url(${IMG_URL}/${d.image})` }}
              >
                <div className="text-white text-center p-4 bg-black">
                </div>
              </div>
            </div>
              <h2 className='text-center font-bold text-xl m-1'>{capitalizeFirstLetter(d.name)}</h2>
            </Link>
          ))}
      </div>
    </div>
  ) 
} 

export default Bbanner 
