import React, { useEffect, useState } from 'react' 
import BannerTitle from '../layouts/BannerTitle' 
import YvideoCard from '../layouts/YvideoCard' 
import axios from 'axios' 
import { useParams } from 'react-router-dom' 
import { API_URL } from '../../Config' 

const Yvideos = () => {
  const [data, setData] = useState([]) 
  const params = useParams() 
  const [selectedData, setSelectedData] = useState(null) 
  const [loading, setLoading] = useState(true) 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/media/videos`) 
        setData(response.data) 

        // Assuming you want to select the first item from the fetched data
        if (response.data.length > 0) {
          setSelectedData(response.data[0]) 
        }

        setLoading(false)  // Data is loaded, set loading to false
      } catch (error) {
        console.error('Error fetching data:', error) 
        setLoading(false)  // Set loading to false in case of an error
      }
    } 
    fetchData() 
  }, []) 



  return (
    <div className="max-w-screen-lg mx-auto">
      <BannerTitle title="Media" />
      <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {
          data && data?.map((d,i)=>{
            return  <YvideoCard
            ysrc={d.videoId}
            ytitle={d.title}
          
          />

          })
        }
       
       
      </div>
    </div>
  ) 
} 

export default Yvideos 
