import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BannerTitle from '../layouts/BannerTitle';
import Title from '../layouts/Title';
import Education from './Education';
import Skills from './Skills';
import Achievement from './Achievement';
import Experience from './Experience';
import Trainings from './Trainnings';
import Travels from './Travels';
import Trainnings from './Trainnings';
import { API_URL } from '../../Config';

const Resume = () => {
  const [activeSection, setActiveSection] = useState('experience');
  const [profile, setProfile] = useState(null);
  const [internationalTravels, setInternationalTravels] = useState([]);
  const [nationalTravels, setNationalTravels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch personal info
        const personalInfoResponse = await axios.get(`${API_URL}/introduction/personal-info`);
        if (personalInfoResponse.data && personalInfoResponse.data.length > 0) {
          setProfile(personalInfoResponse.data[0]);
        }

        // Fetch international travels
        const internationalResponse = await axios.get(`${API_URL}/international`);
        setInternationalTravels(internationalResponse.data);
        console.log("inter",internationalTravels)

        // Fetch national travels
        const nationalResponse = await axios.get(`${API_URL}/national`);
        setNationalTravels(nationalResponse?.data);
        console.log("national",nationalTravels)
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };

    fetchData();
    {
      console.log("hello world")
  
    }
  }, []);

  if (!profile) {
    // You might want to show a loading spinner or message here while data is being fetched.
    return <div>Loading...</div>;

   
  }

  const sections = [
    { id: 'experience', label: 'Experience', component:<Experience experience={profile?.experience} />, show: !!profile?.experience?.length },
    { id: 'skills', label: 'Skills', component: <Skills skills={profile?.skills} />, show: !!profile?.skills?.length },
    { id: 'seminars', label: 'Seminars', component: null, show: false }, // You can add the component here
    { id: 'education', label: 'Education', component: <Education education={profile?.education} />, show: !!profile?.education?.length },
    { id: 'achievements', label: 'Achievements', component: <Achievement achievement={profile?.achievement} />, show: !!profile?.achievement?.length },
    { id: 'trainings', label: 'Trainings', component: <Trainnings trainings={profile?.training} />, show: !!profile?.training?.length },
    { id: 'travels', label: 'Travels', component: <Travels travels={nationalTravels} />, show: !!nationalTravels?.length || !!internationalTravels.length  },
    { id: 'myJourney', label: 'My Journey', component: null, show: false } // You can add the component here
    
  ];
  

  return (
    
    <section id="resume" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex items-center justify-center text-center">
        <BannerTitle title="My Resume" />
      </div>
      <div className='flex items-center justify-center'>
        <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4 items-center justify-center">
          {sections.map((section) => (
            section.show && (
              <li
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={
                  activeSection === section.id
                    ? 'border-designColor text-designColor resumeLi rounded-lg'
                    : 'border-transparent resumeLi'
                }
              >
                {section.label}
              </li>
            )
          ))}
        </ul>
      </div>
      
      {/* <div className="mt-5 text-center">
        <a
          href={resumeDownloadLink}
          target="_blank"
          className="text-designColor border border-designColor text-center rounded-lg px-4 py-2 hover:bg-designColor hover:text-white transition duration-300"
          download
        >
          Download Resume
        </a>
      </div> */}
      {sections.find((section) => section.id === activeSection)?.show ? (
        sections.find((section) => section.id === activeSection)?.component
      ) : (
        <div className="mt-5 text-center">No data available for this section</div>
      )}
    </section>
  );
};

export default Resume;
