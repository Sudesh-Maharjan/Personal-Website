import React, { useState, useEffect } from 'react';
import AdminPersonal from '../adminhome/AdminPersonal';
import AdminMedia from '../adminhome/AdminMedia';
import AdminFieldTitle from '../adminlayout/adminfieldtitle';
import AdminPersonalUpdate from '../adminhome/AdminPersonalUpdate';
import AdminBusiness from '../adminhome/AdminBusiness';
import AdminNews from '../adminhome/AdminNews';
import AdminVideo from '../adminhome/AdminVideo';
import AdminService from '../adminhome/AdminService';
import AdminTravel from '../adminhome/AdminTravel';

const sections = [
  { id: 'personal', label: 'Personal', component: <AdminPersonal /> },
  { id: 'update', label: 'Update Personal Info', component: <AdminPersonalUpdate /> },
  { id: 'media', label: 'Social Media Url', component: <AdminMedia /> },
  { id: 'business', label: 'Business', component: <AdminBusiness /> },
  { id: 'service', label: 'Services', component: <AdminService /> },
  { id: 'travel', label: 'Travel', component: <AdminTravel /> },
  { id: 'news', label: 'News', component: <AdminNews /> },
  { id: 'video', label: 'Videos', component: <AdminVideo /> },
];

const AdminSidebar = () => {
  const [activeSection, setActiveSection] = useState(() => {
    // Retrieve active section from local storage on component mount
    return localStorage.getItem('activeSection') || sections[0].id;
  });

  const activeSectionData = sections.find((section) => section.id === activeSection);

  useEffect(() => {
    // Update local storage when active section changes
    localStorage.setItem('activeSection', activeSection);
  }, [activeSection]);

    return (
        <>
            <section id="Admin">
                <div className="fixed bottom-0 z-10 content-center w-full h-12 mt-12 bg-gray-800 shadow-xl md:relative md:h-full md:w-48">
                    <div className="content-center justify-between text-left md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 md:content-start">
                        <ul className="flex flex-row px-1 pt-3 text-center list-reset md:flex-col md:py-3 md:px-2 md:text-left">
                            {sections.map((section) => (
                                <li
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={
                                        activeSection === section.id
                                            ? 'activeSidebar'
                                            : 'notActiveSidebar'
                                    }
                                >
                                    {section.label}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <div className="flex-1 pb-24 mt-12 bg-gray-100 main-content md:mt-2 md:pb-5">
                <AdminFieldTitle title={activeSectionData?.label} />
                <div className="flex flex-wrap">
                    {activeSectionData?.component}
                </div>
            </div>

        </>
    );
}

export default AdminSidebar;
