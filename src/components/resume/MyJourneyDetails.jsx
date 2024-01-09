


import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import BannerCard from '../layouts/BannerCard';
import { API_URL, IMG_URL } from '../../Config';
import FooterBottom from '../footer/FooterBottom';
import { FaUserGraduate } from 'react-icons/fa';
const MyJourneyDetails = () => {
  const { id } = useParams();
  const [activeSection, setActiveSection] = useState(null);
  const [PDetails, setPDetails] = useState({});
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const fetchapi = async () => {
      try {
        const url = `${API_URL}/memory/${id}`;
        const res = await fetch(url);
        const data = await res.json();
        setPDetails(data);
        console.log(PDetails)
        const sections = ['Gallery', 'Publication', 'Education', 'Experience', 'Achievement', 'Training', 'InternationalTravel', 'NationalTravel'];
        const defaultActiveSection = sections.find(section => PDetails?.memory?.year && PDetails[`filtered${section}`]?.length > 0);
        setActiveSection(defaultActiveSection);
        // console.log('Default active section:', defaultActiveSection);
        setLoad(false);
      } catch (error) {
        console.error("Error fetching API:", error);
        setLoad(false);
      }
    };
    fetchapi();
  }, [id]);
  const handleSectionToggle = (section) => {
    setActiveSection((prevSection) => (prevSection === section ? null : section));
  };
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const headerHeight = 100;
    if (sectionElement) {
      const offset = sectionElement.getBoundingClientRect().top + window.scrollY - headerHeight;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };
  return (
    <>
      <Navbar />
      <div className="font-poppins text-4xl text-center m-3 ">Year: {PDetails?.memory?.year}</div>
      <div className="flex flex-col p-4 md:items-center lg:items-start lg:fixed bg-footer text-white h-full top-24">
        {PDetails?.memory?.year &&
          PDetails.galleryItems.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Gallery' ? 'text-yellow-300' : ''}`}
              onClick={() => {
                handleSectionToggle('Gallery');
                scrollToSection('gallerySection'); // Adjust the sectionId accordingly
              }}>Gallery</p>
          )
        }
        {PDetails?.memory?.year &&
          PDetails.publishedItems.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Publication' ? 'text-yellow-300' : ''}`}
              onClick={() => {
                handleSectionToggle('Publication');
                scrollToSection('publicationSection'); // Adjust the sectionId accordingly
              }}>Publication</p>
          )
        }
        {PDetails?.memory?.year &&
          PDetails.filteredEducation.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Education' ? 'text-yellow-300' : ''}`}
              onClick={() => {
                handleSectionToggle('Education');
                scrollToSection('educationSection'); // Adjust the sectionId accordingly
              }}>Education</p>
          )
        }
        {PDetails?.memory?.year &&
          PDetails.filteredAcheivement.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Achievement' ? 'text-yellow-300' : ''}`} onClick={() => {
              handleSectionToggle('Achievement');
              scrollToSection('achievementSection'); // Adjust the sectionId accordingly
            }}>Achievement</p>
          )
        }
        {PDetails?.memory?.year &&
          PDetails.filteredTraining.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Training' ? 'text-yellow-300' : ''}`} onClick={() => {
              handleSectionToggle('Training');
              scrollToSection('trainingSection'); // Adjust the sectionId accordingly
            }}>Training</p>
          )}
        {PDetails?.memory?.year &&
          PDetails.filteredExperience.length > 0 && (
            <p className={`myjourney-sidebar ${activeSection === 'Experience' ? 'text-yellow-300' : ''}`} onClick={() => {
              handleSectionToggle('Experience');
              scrollToSection('experienceSection'); // Adjust the sectionId accordingly
            }
            }>Experience</p>
          )
        }
        {PDetails?.memory?.year &&
      PDetails.filteredInternationalCountry.length > 0 && (
  <p className={`myjourney-sidebar ${activeSection === 'InternationalTravel' ? 'text-yellow-300' : ''}`} onClick={() => {
        handleSectionToggle('InternationalTravel');
        scrollToSection('internationalSection'); // Adjust the sectionId accordingly
      }}>International</p>
    )
  }
  {PDetails?.memory?.year &&
      PDetails.filteredNationalCountry.length > 0 && (
  <p className={`myjourney-sidebar ${activeSection === 'NationalTravel' ? 'text-yellow-300' : ''}`} onClick={() => {
        handleSectionToggle('NationalTravel');
        scrollToSection('nationalSection'); // Adjust the sectionId accordingly
      }}>National</p>
    )
  }
      </div>
      <div className="flex justify-center items-center flex-col rounded-md">
        <div className="container rounded-xl flex justify-center items-center flex-col">
          {/* Loader */}
          {load && (
            <div role="status" className='flex justify-center'>
              <svg aria-hidden="true" className="inline w-406 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          )}
          {/* End Loader */}
        </div>
        {/* Gallery Items */}
        {PDetails?.memory?.year && PDetails.galleryItems && PDetails.galleryItems.length > 0 && (
          <>
            <div id="gallerySection" className='my-8 shadow-md p-4  xs:w-[300px] md:w-[630px] lg:w-[1110px]'>
              <h1 className='text-blue-800 font-bold text-4xl mx-5'>Gallery</h1>
              <div className=" grid xs:grid-cols-1 gap-4 xs:p-4 md:grid-cols-3 lg:grid-cols-4 lgl:grid-cols-5 hover:cursor-pointer ">
                {PDetails?.galleryItems?.map((item) => (
                  <div key={item.id} className='flex justify-center items-center'>
                    <img
                      className="xs:h-[200px]  md:h-[180px] md:w-[290px] rounded-lg object-cover"
                      src={`${IMG_URL}/${item.image}`}
                      alt={item.image}
                    />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Gallery Items End */}
        {/* Published Items */}
        {PDetails?.memory?.year && PDetails.publishedItems && PDetails?.publishedItems?.length > 0 && (
          <>
            <div id='publicationSection' className="my-8 shadow-lg xs:w-[300px] md:w-[630px] lg:w-[1110px]">
              <h1 className='text-blue-800 font-bold text-3xl m-5 mx-7 text-start'>Publication</h1>
              <div className="container grid grid-cols-1 gap-2 mx-auto sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-2">
                {PDetails?.publishedItems?.map((item, index) => (
                  <Link to={item.url} target="_blank" key={index}>
                    <BannerCard
                      bimg={`${IMG_URL}/${item.photo?.split("\\")[1]}`}
                      title={item.name}
                      des={item.description}
                     className="xs:h-[200px]  md:h-[180px] md:w-[290px] rounded-lg object-cover"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
        {/* Published Items end */}
        {/* filteredEducation Items */}
        {PDetails?.memory?.year && PDetails.galleryItems && PDetails?.filteredEducation?.length > 0 && (
          <>
            <div id="educationSection" className=" my-8 shadow-md p-4">
              <h4 className='text-blue-800 font-bold text-4xl mx-5'>Education</h4>
              <div className=" xs:w-[300px] gap-24 md:w-[600px] lg:w-[1080px] ">
                {
                  PDetails && PDetails?.filteredEducation?.map((Data, i) => (
                    <div key={i} className="table-div-journey shadow-lg border-2 m-5 p-5 rounded-lg">
                      <div className=' rounded-lg  shadow-sm'>
                        <FaUserGraduate className='m-4' />
                        <div className='m-4'>
                          <span className='text-xl font-bold'>Field Of Study</span>
                          <p className='text-xl'>{Data.fieldOfStudy.charAt(0).toUpperCase() + Data.fieldOfStudy.slice(1)}</p>
                          <div className="my-3"></div>
                          <span className='text-xl font-bold'>Institute</span>
                          <p className='text-xl '>{Data.institution.charAt(0).toUpperCase() + Data.institution.slice(1)}</p>
                          <div className="my-3"></div>
                          <span className='text-xl font-bold'>Degree</span>
                          <p className=''>{Data.degree.charAt(0).toUpperCase() + Data.degree.slice(1)}</p>
                          {/* <p className='font-bold text-2xl text-white'>Graduation Year</p>
      <p className='text-white'>{Data.graduationYear}</p> */}
                        </div>
                      </div>
                      <div className="h-1 w-auto bg-black"></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}
        {/* filteredEducation Items end */}
        {/* filteredAcheivement Items */}
        {PDetails?.memory?.year && PDetails.galleryItems && PDetails?.filteredAcheivement?.length > 0 && (
          <>
            <div id='achievementSection' className="  xs:w-[300px]  my-10 md:w-[600px] lg:w-[1110px] shadow-md p-4">
              <h1 className='text-blue-800 font-bold text-4xl mx-5'>Achievement</h1>
              <div className="">
                {
                  PDetails && PDetails?.filteredAcheivement?.map((Data, i) => (
                    <div key={i} className="table-div-journey shadow-lg border-2 m-5 p-5 rounded-lg">
                      {
                        <div key={i} className=''>
                          <FaUserGraduate className='my-2' />
                          <div className=''>
                            <span className='text-xl font-bold'>Title</span>
                            <div className='text-xl '>{Data.title.charAt(0).toUpperCase() + Data.title.slice(1)}</div>
                            <div className="my-3"></div>
                            <span className='text-xl font-bold'>Issuer</span>
                            <div className='text-xl'>{Data.issuer.charAt(0).toUpperCase() + Data.issuer.slice(1)}</div>
                            <div className="my-3"></div>
                            <span className='text-xl font-bold'>Year</span>
                            <div className='text-xl'>{Data.year}</div>
                          </div>
                        </div>
                      }
                      <div className="h-1 w-auto bg-black my-3 "></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}
        {/* filteredAcheivement Items end */}
        {/* filteredTraining Items */}
        {PDetails?.memory?.year && PDetails.galleryItems && PDetails.filteredTraining.length > 0 && (
          <>
            <div id='trainingSection' className="  xs:w-[300px] my-8 md:w-[600px] lg:w-[1110px] shadow-md p-4">
              <h4 className='text-blue-800 font-bold text-4xl mx-5'>Training</h4>
              <div className="">
                {
                  PDetails && PDetails?.filteredTraining?.map((Data, i) => (
                    <div key={i} className=" shadow-lg border-2 m-5 p-5 rounded-lg">
                      <FaUserGraduate className='my-2' />
                      {
                        <div key={i} className=''>
                          <div className=''>
                            <span className='text-xl font-bold'>Training Title</span>
                            <div className='text-xl'>{Data.title.charAt(0).toUpperCase() + Data.title.slice(1)}</div>
                            <div className="my-3"></div>
                            <span className='text-xl font-bold'>Institution</span>
                            <div className='text-xl'>{Data.institution.charAt(0).toUpperCase() + Data.institution.slice(1)}</div>
                            <div className="my-3"></div>
                            <span className='text-xl font-bold'>Year</span>
                            <div className=''>{Data.year}</div>
                          </div>
                        </div>
                      }
                      <div className="h-1 w-auto bg-black"></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}
        {/* filteredTraining Items end */}
        {/* filteredExperience Items */}
        {PDetails?.memory?.year && PDetails.galleryItems && PDetails.filteredExperience.length > 0 && (
          <>
            <div id='experienceSection' className=" my-8  xs:w-[300px] md:w-[600px] lg:w-[1100px] shadow-md p-4">
              <h1 className='text-blue-800 font-bold text-4xl mx-5'>Experience</h1>
              <div>
                {
                  PDetails && PDetails?.filteredExperience?.map((Data, i) => (
                    <div key={i} className="shadow-lg border-2 m-5 p-5 rounded-lg">
                      <FaUserGraduate className='my-2' />
                      {
                        <div className="  rounded-md  flex flex-col justify-center lg:w-[468px] ">
                          <span className='font-bold text-xl'>Job Title</span>
                          <p className='text-xl'> {Data.jobTitle.charAt(0).toUpperCase() + Data.jobTitle.slice(1)}</p>
                          <div className="my-2"></div>
                          <span className='font-bold text-xl'>Company</span>
                          <p className='text-xl '> {Data.company.charAt(0).toUpperCase() + Data.company.slice(1)}</p>
                          <div className="my-2"></div>
                          <span className='font-bold text-xl'>Start Date</span>
                          <p className='text-xl'> {Data.startDate.slice(0, 10)}</p>
                          <div className="my-2"></div>
                          <span className='font-bold text-xl'>Description</span>
                          <p className='text-xl '> {Data.description.charAt(0).toUpperCase() + Data.description.slice(1)}</p>
                        </div>
                      }
                      <div className="h-1 w-auto bg-black"></div>
                    </div>
                  ))
                }
              </div>
            </div>
          </>
        )}
        {/* filteredExperience Items end */}


           {/* Travels Items */}
           {PDetails?.memory?.year && PDetails.galleryItems &&PDetails.filteredInternationalCountry.length > 0 && (
          <>
            <div id='internationalSection' className="my-8 xs:w-[300px] md:w-[600px] lg:w-[1100px] shadow-md p-4">
      <h1 className='text-blue-800 font-bold text-4xl mx-5'>International Travel</h1>
      <div>
        {PDetails && PDetails?.filteredInternationalCountry?.map((Data, i) => (
          <div key={i} className="shadow-lg border-2 m-5 p-5 rounded-lg">
            <FaUserGraduate className='my-2' />
            <div className="rounded-md flex flex-col justify-center lg:w-[468px]">
              {/* Add your travel data rendering logic here */}
              <span className='font-bold text-xl'>Place</span>
              <p className='text-xl'> {Data.name}</p>
              <span className='font-bold text-xl'>Purpose Of Trip</span>
              <p className='text-xl'> {Data.purposeOfTrip}</p>
              <span className='font-bold text-xl'>Year</span>
              <p className='text-xl'> {Data.year}</p>
              {/* Add more details if needed */}
            </div>
            <div className="h-1 w-auto bg-black"></div>
          </div>
        ))}
      </div>
    </div>
          </>
        )}
        {/* Travels Items end */}


         {/* National Travels Items */}
         {PDetails?.memory?.year && PDetails.galleryItems &&PDetails.filteredNationalCountry.length > 0 && (
          <>
            <div id='nationalSection' className="my-8 xs:w-[300px] md:w-[600px] lg:w-[1100px] shadow-md p-4">
      <h1 className='text-blue-800 font-bold text-4xl mx-5'>National Travel</h1>
      <div>
        {PDetails && PDetails?.filteredNationalCountry?.map((Data, i) => (
          <div key={i} className="shadow-lg border-2 m-5 p-5 rounded-lg">
            <FaUserGraduate className='my-2' />
            <div className="rounded-md flex flex-col justify-center lg:w-[468px]">
              {/* Add your travel data rendering logic here */}
              <span className='font-bold text-xl'>Place</span>
              <p className='text-xl'> {Data.name}</p>
              <span className='font-bold text-xl'>Purpose Of Trip</span>
              <p className='text-xl'> {Data.purposeOfTrip}</p>
              <span className='font-bold text-xl'>Year</span>
              <p className='text-xl'> {Data.year}</p>
              {/* Add more details if needed */}
            </div>
            <div className="h-1 w-auto bg-black"></div>
          </div>
        ))}
      </div>
    </div>
          </>
        )}
        {/* Travels Items end */}
      </div>
      <Footer />
      <FooterBottom />
    </>
  )
}
export default MyJourneyDetails