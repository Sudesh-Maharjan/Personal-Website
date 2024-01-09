import React, { useEffect, useState } from 'react' 
import BannerTitle from '../layouts/BannerTitle' 
import YvideoCard from '../layouts/YvideoCard' 
import axios from 'axios' 
import { useParams } from 'react-router-dom' 
import { API_URL } from '../../Config' 
import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";


const Yvideos = () => {
  const [data, setData] = useState([]) 
  const params = useParams() 
  const [selectedData, setSelectedData] = useState(null) 
  const [loading, setLoading] = useState(true) 
  const [currentPage, setCurrentPage] = useState(1);
  const[totalPages,setTotalPages]=useState(1)
  const limit = 9;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/media/videos/?page=${currentPage}&limit=${limit}`) 
        setData(response?.data?.videos) 
        setTotalPages(response?.data?.totalPages)

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
  }, [currentPage]) 



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
      <div className=" m-2 flex justify-end">
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage - 1) } disabled={currentPage === 1}>
                          <FaChevronLeft/>prev
                        </button>
                        <span className="p-2 flex items-center">{currentPage} of {totalPages}</span>
                        <button className="hover:bg-blue-600 hover:cursor-pointer btn-pagination bg-blue-700 w-24 rounded-lg p-3 flex items-center justify-center text-white gap-2" onClick={()=>setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>
                          next<FaChevronRight/>
                        </button>
            </div>
    </div>
  ) 
} 

export default Yvideos 
