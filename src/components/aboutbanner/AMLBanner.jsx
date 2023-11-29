import axios from "axios" 
import React, { useEffect, useState } from "react" 
import { API_URL } from "../../Config" 

const AMLBanner = () => {
  const [data, setData] = useState([]) 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/introduction/personal-info`
        )  // Replace with your API endpoint
        setData(response.data) 
      } catch (error) {
        console.error("Error fetching data:", error) 
      }
    } 
    fetchData() 
  }, []) 

  return (
    <div className="flex flex-col w-full gap-20 lgl:w-1/2">
      <div className="flex flex-col">
        {data &&
          data?.map((d) => (
            <>
              <h1 className="text-[26px] font-bold  text-black mb-5">
                <span>{d.title}</span>
              </h1>

              <p className="text-base leading-6 tracking-wide font-bodyFont">
                {d.personalIntroduction}
              </p>
            </>
          ))}
      </div>
    </div>
  ) 
} 

export default AMLBanner 
