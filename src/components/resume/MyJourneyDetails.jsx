import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState } from 'react';
import { useEffect } from 'react';
import BannerTitle from '../layouts/BannerTitle';
import { Link, useParams } from 'react-router-dom';
import BookCard from '../layouts/BookCard';
import BannerCard from '../layouts/BannerCard';
import { API_URL, IMG_URL } from '../../Config';
import FooterBottom from '../footer/FooterBottom';
const MyJourneyDetails = () => {
const {id} = useParams();
  const [PDetails, setPDetails] = useState({});
 const [load, setLoad] = useState(true);
   

   useEffect(() => {
      const fetchapi = async () => {
        try {
          const url = `${API_URL}/memory/${id}`;
          const res = await fetch(url);
          const data = await res.json();
          setPDetails(data);
  
         //  const yearsWithImages = year.map((yearData) => ({
         //   ...yearData,
         //   randomImage: array[Math.floor(Math.random() * array.length)],
         // }));
  
         // setPDetails(yearsWithImages)
         setLoad(false);
        } catch (error) {
          console.error("Error fetching API:", error);
         setLoad(false);
 
        }
      };
      fetchapi();
    }, [id]);
  return (
    <>
         <Navbar/>
<div className="font-poppins text-4xl text-start m-6 ml-20">{PDetails.year}</div>

<div className="flex justify-center items-center flex-col min-h-screen ">
         <div className="container rounded-xl flex justify-center items-center flex-col">
      {/* Loader */}
      {load &&(
        <div role="status" className='flex justify-center mt-40'>
    <svg aria-hidden="true" className="inline w-406 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  )}
{/* End Loader */}


{/* Gallery Items */}
{PDetails.year && PDetails.galleryItems && PDetails.galleryItems.length > 0 && (
  <>
 <div>
      <BannerTitle title="Gallery" />

        <div className="grid grid-cols-2 gap-4 xs:p-4 md:grid-cols-3 lg:grid-cols-4 lgl:grid-cols-5 hover:cursor-pointer">
          {PDetails?.galleryItems?.map((item) => (
            <div key={item._id}>
              <img
                className="h-[210px] w-[250px] max-w-full rounded-lg"
                src={`${IMG_URL}/${item.image}`}
                alt={item.image} 
              />
            </div>
          ))}
        </div>
      </div>
    
      </>
      )}
    
      </div>
    
{PDetails.year && PDetails.publishedItems && PDetails?.publishedItems?.length > 0 && (
  <>
  <BannerTitle title="Publications"/>
   <div className="container grid w-full grid-cols-1 gap-2 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-4">
          {PDetails?.publishedItems?.map((item, index) => (
            <Link to={item.url} target="_blank" key={index}>
              <BannerCard
                bimg={`${IMG_URL}/${item.photo?.split("\\")[1]}`}
                title={item.name}
                des={item.description}
              />
            </Link>
          ))}
        </div>

  </>
)}


{/* Published Items end */}
{/* filteredEducation Items */}
{PDetails.year && PDetails.galleryItems && PDetails.filteredEducation.length > 0 && (
<>
<BannerTitle title="Education"/>


      <div className="">
        {
      
       PDetails && PDetails?.filteredEducation?.map((Data, i) => (
        <div key={i} className="table-div-journey ">
<table className=''>
<thead className='xs:flex xs:flex-col sm:block md:block'>
<tr className=''>
    <th className='table-inner flex-1'>Degree</th>
    <th className='table-inner flex-1'>Institution</th>
    <th className='table-inner flex-1'>Field Of Study</th>
    <th className='table-inner flex-1'>Graduation Year</th>
  </tr>
<tr className=''>
    <td className='table-inner'>{Data.degree}</td>
    <td className='table-inner'>{Data.institution}</td>
    <td className='table-inner'>{Data.fieldOfStudy}</td>
    <td className='table-inner'>{Data.graduationYear}</td>
  </tr>
  </thead>
</table>
</div>
        ))

        }

      </div>
      </>
          )}
{/* filteredEducation Items end */}
{/* filteredAcheivement Items */}
{PDetails.year && PDetails.galleryItems && PDetails.filteredEducation.length > 0 && (
<>
<BannerTitle title="Achievements" />


      <div className="">
        {
      
       PDetails && PDetails?.filteredAcheivement?.map((Data, i) => (

          <div key={i} className="table-div-journey">

            {

<table key={i} className=''>
<tr className=''>
    <th className='table-inner'>Title</th>
    <th className='table-inner'>Issuer</th>
    <th className='table-inner'>Year</th>
  </tr>
<tr className=''>
    <td className='table-inner'>{Data.title}</td>
    <td className='table-inner'>{Data.issuer}</td>
    <td className='table-inner'>{Data.year}</td>
  </tr>

</table>
    

            }
          </div>

        ))

        }

      </div>
      </>
)}
{/* filteredAcheivement Items end */}
{/* filteredTraining Items */}
{PDetails.year && PDetails.galleryItems && PDetails.filteredTraining.length > 0 && (
<>
<BannerTitle title="Training" />


      <div className="">
        {
      
       PDetails && PDetails?.filteredTraining?.map((Data, i) => (

          <div key={i} className="table-div-journey">

            {

     <table key={i} className=''>
<tr className=''>
    <th className='table-inner'>Title</th>
    <th className='table-inner'>Institution</th>
    <th className='table-inner'>Year</th>
  </tr>
<tr className=''>
    <td className='table-inner'>{Data.title}</td>
    <td className='table-inner'>{Data.institution}</td>
    <td className='table-inner'>{Data.year}</td>
  </tr>

</table>

            }
          </div>

        ))

        }

      </div>
      </>
)}
{/* filteredTraining Items end */}
{/* filteredExperience Items */}
{PDetails.year && PDetails.galleryItems && PDetails.filteredExperience.length > 0 && (
<>
<BannerTitle title="Experience" />
 <h3 className='text-3xl mb-5 ml-5 text-details'>
       {

           PDetails.year
          
       }
         </h3>

      <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {
      
       PDetails && PDetails?.filteredExperience?.map((Data, i) => (

          <div key={i} className="">

            {

              <div className="  rounded-md  w-[300px] h-[300px] flex flex-row justify-center">
               <div className=" flex flex-col bg-slate-100 rounded-md cursor-pointer product-container ">
                <div className=" opacity-60  rounded-md ">
             
                {/* <img
                  src={`${Data.photo}`}
                  alt={`${Data.photo}`}
                  className=" cursor-pointer shadow-slate-100 rounded-sm"
                /> */}
                 </div>
                 <span className='text-details'>{Data._id}</span>
                 <span className='text-details'>{Data.title}</span>
                 <span className='text-details'>{Data.date}</span>
                 </div>
              </div>

            }
          </div>

        ))

        }

      </div>
      </>
)}
{/* filteredExperience Items end */}





    
      </div>
      <Footer/>
      <FooterBottom/>

    </>
  )
}

export default MyJourneyDetails
