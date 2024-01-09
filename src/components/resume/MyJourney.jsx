import React, { useEffect, useState } from 'react'
import BannerTitle from '../layouts/BannerTitle'
// import './MyJourney.css'
import { Link } from 'react-router-dom';
import { API_URL } from '../../Config';
const MyJourney = () => {
  const [year, setYear] = useState([]);
  const [load, setLoad] = useState(true);
  const array = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg"];
  useEffect(() => {
    const fetchapi = async () => {
      try {
        const response = await fetch(`${API_URL}/memory`);
        const result = await response.json();
        setYear(result);
        const yearsWithImages = result?.map((yearData) => ({
          ...yearData,
          randomImage: array[Math.floor(Math.random() * array.length)],
        }));
        setYear(yearsWithImages)
        setLoad(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoad(false);
      }
    };
    fetchapi();
  }, []);
  const filteredData = year?.filter(item => (
    (item?.galleryItems?.length ?? 0) > 0 ||
    (item?.publishedItems?.length ?? 0) > 0 ||
    (item?.filteredEducation?.length ?? 0) > 0 ||
    (item?.filteredAcheivement?.length ?? 0) > 0 ||
    (item?.filteredTraining?.length ?? 0) > 0 ||
    (item?.filteredExperience?.length ?? 0) > 0
  ));
  return (
    <>
      <div className=" flex items-center justify-center my-5">
        <div className="container p-10  shadow-2xl  rounded-xl">
          <BannerTitle title="My Journey" />
          {load && (
            <div role="status" className='flex justify-center'>
              <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {/* End Loader */}
          <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 w-1/1  gap-7 m-7 overflow-y-auto"
            style={{ maxHeight: "430px" }}>
            {
              filteredData.map(yearData => (
                <div key={yearData.id} className="hover:opacity-90">
                  {
                    yearData?.randomImage && (
                      <div className="bg-black relative rounded-md">
                        <div className=" flex justify-center items-end rounded-md">
                          <div className=" opacity-60  rounded-md">
                            <Link to={`/myjourneydetails/${yearData.id}`}>
                              <img
                                src={`images/${yearData.randomImage}`}
                                alt={`images/${yearData.randomImage}`}
                                className=" cursor-pointer shadow-slate-100 rounded-sm"
                              />
                            </Link>
                          </div>
                          <h5 className=" text-white text-3xl absolute opacity-100 font-semibold mb-6">{yearData.year}</h5>
                        </div>
                      </div>
                    )
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}
export default MyJourney