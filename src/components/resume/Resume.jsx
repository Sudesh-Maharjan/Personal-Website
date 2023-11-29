import React, { useState } from 'react';
import Title from '../layouts/Title';
import Education from './Education';
import Skills from './Skills';
import Achievement from './Achievement';
import Experience from './Experience';
import MyJourney from './MyJourney';
import Travels from './Travels';
import Seminars from './Seminars';
import Trainnings from './Trainnings';

const sections = [
  { id: 'myJourney', label: 'My Journey', component: <MyJourney />, show: true },
  { id: 'experience', label: 'Experience', component: <Experience />, show: true },
  { id: 'skills', label: 'Skills', component: <Skills />, show: true },
  { id: 'seminars', label: 'Seminars', component: <Seminars />, show: false },
  { id: 'education', label: 'Education', component: <Education />, show: true },
  { id: 'achievements', label: 'Achievements', component: <Achievement />, show: true },
  { id: 'trainings', label: 'Trainings', component: <Trainnings />, show: true },
  { id: 'travels', label: 'Travels', component: <Travels />, show: true },
];

const Resume = ({ data }) => {
  const [activeSection, setActiveSection] = useState(sections[0].id);

  // Assuming data is an array with a single profile object
  const profile = data && data.length > 0 ? data[0] : {};

  return (
    <section id="resume" className="w-full py-20 border-b-[1px] border-b-black">
      <div className="flex items-center justify-center text-center">
        <Title title="YEARS OF EXPERIENCE" des="My Resume" />
      </div>
      <div className='flex items-center justify-center'>
        <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-2 xl:grid-cols-4">
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
      <div className="mt-5 text-center">
        {/* Your download resume link */}
      </div>
      {sections.find((section) => section.id === activeSection)?.show ? (
        sections.find((section) => section.id === activeSection)?.component
      ) : (
        <div className="mt-5 text-center">No data available for this section</div>
      )}
    </section>
  );
};

export default Resume;
