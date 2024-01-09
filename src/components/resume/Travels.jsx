import React, { useEffect, useState } from 'react';
import { itravel1, itravel2, itravel3, itravel4, itravel5, ntravel1, ntravel2, ntravel3, ntravel4, ntravel5} from '../../assets'
import axios from 'axios';
import { API_URL } from '../../Config';
import TravelTitle from '../layouts/TravelTitle';

const Travels = () => {
  const [icountries, setICountries] = useState([]);
  const [ncountries, setNCountries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const internationalResponse = await axios.get(`${API_URL}/international`);
        setICountries(internationalResponse.data);

        const nationalResponse = await axios.get(`${API_URL}/national`);
        setNCountries(nationalResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Array of possible image sizes
  const imageSizes = [
    { width: 150, height: 100 }, // Small size
    { width: 200, height: 140 }, // Medium size
    { width: 250, height: 150 }, // Large size
    { width: 300, height: 170 }, // Extra Large size

  ];

  // Function to get a random image size
  const getRandomImageSize = () => {
    const randomIndex = Math.floor(Math.random() * imageSizes.length);
    return imageSizes[randomIndex];
  };

  return (
    <>
    {
      icountries.length>0?
      <>
        <div className=" sm:h-auto h-96 xs:block lg:flex flex justify-center mt-[50px] sm:mt-10 md:mt-15 bg-neutral-600">
        <div className="xs:flex xs:flex-col xs:justify-center xs:items-center xs:w-auto lg:items-start lg:w-[350px] h-[250px] ml-[20px] mt-[25px]">
          <TravelTitle  className="text-white" title="International Visit" />

          <div className="flex flex-wrap -mt-8">
            <ul >
              {icountries.map((country) => (
                <div key={country.id} className="">
                <span className='text-white text-xl' key={country.id}>{country.name} - </span>
                <span className='text-white' key={country.id}>{country.purposeOfTrip} - </span>
                <span className='text-white' key={country.id}>{country.year}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
        <div className="xs:items-center xs:justify-center xs:mt-0 md:mt-20 mb-7e lg:ml-[200px] block">
          <div className="flex items-end justify-center up-image-container sml:justify-around">
            
              <img
               
                src={itravel1} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
              <img
               
                src={itravel2} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
              <img
               
                src={itravel3} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
            
          </div>
          <div className="flex items-center justify-around down-image-container xs:flex-col mdl:flex-row">
          
              <img
                
                src={itravel4} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:w-[300px] xs:mt-[20px] lg:w-[200px] lg:m-[10px] cursor-pointer"
              />
              <img
                
                src={itravel5} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:w-[300px] xs:mt-[20px] lg:w-[200px] lg:m-[10px] cursor-pointer"
              />
           
          </div>
        </div>
      </div>

      </>:null

    }
    
      <>
      {
        ncountries.length>0?
        <>
         <div className=" sm:h-auto h-96 xs:block lg:flex flex justify-center mt-[50px] sm:mt-10 md:mt-15 bg-neutral-600">
        <div className="xs:items-center xs:justify-center mt-20 mb-7e lg:mr-[200px] block">
          <div className="flex items-end justify-center up-image-container sml:justify-around">
           
              <img
            
                src={ntravel1} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
              <img
            
                src={ntravel2} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
              <img
            
                src={ntravel3} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:hidden mdl:flex lg:w-[150px] lg:mx-[10px] cursor-pointer lg:block"
              />
      
          </div>
          <div className="flex items-center justify-around down-image-container xs:flex-col mdl:flex-row">
            
              <img
                
                src={ntravel4} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:w-[300px] xs:mt-[20px] lg:w-[200px] lg:m-[10px] cursor-pointer"
              />
              <img
                
                src={ntravel5} // Replace with your image source
                alt=""
                width={getRandomImageSize().width}
                height={getRandomImageSize().height}
                className="xs:w-[300px] xs:mt-[20px] lg:w-[200px] lg:m-[10px] cursor-pointer"
              />
            
          </div>
        </div>
        <div className="xs:flex xs:flex-col xs:justify-center xs:items-center xs:w-auto lg:items-start lg:w-[350px] h-[250px] ml-[20px] mt-[25px]">
          <TravelTitle title="National Visit" />

          <div className="flex flex-wrap ">
            <ul >
              {ncountries.map((country) => (
                <div key={country.id} className="">
                <span className='text-white' >{country.name} - </span>
                <span className='text-white'  >{country.purposeOfTrip} - </span>
                <span className='text-white' >{country.year}</span>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
        </>:null

      }
      </>
     

     
    </>
  );
};

export default Travels;
