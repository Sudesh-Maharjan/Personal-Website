import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import React Router Link
import { API_URL } from '../../../Config';
import axios from 'axios';

const AdminNavbar = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${API_URL}/introduction/personal-info`); 
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    return (
        <nav aria-label="menu nav" className="fixed top-0 z-20 w-full h-auto px-1 pt-2 pb-1 mt-0 bg-gray-800 md:pt-1">
            <div className="flex flex-wrap items-center">
                <div className="flex justify-center flex-shrink text-white md:w-1/3 md:justify-start">
                    <Link to="/" aria-label="Home"> {/* Use Link for navigation */}
                        <span className="pl-2 text-xl"><i className="em em-grinning" /></span>
                    </Link>
                </div>
                <div className="flex justify-center flex-1 px-2 text-white md:w-1/3 md:justify-start">
                    {/* <span className="relative w-full">
                        <input
                            aria-label="search"
                            type="search"
                            id="search"
                            placeholder="Search"
                            className="w-full px-2 py-3 pl-10 leading-normal text-white transition bg-gray-900 border border-transparent rounded appearance-none focus:outline-none focus:border-gray-400"
                        />
                        <div className="absolute search-icon" style={{ top: '1rem', left: '.8rem' }}>
                            <svg className="w-4 h-4 text-white pointer-events-none fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                            </svg>
                        </div>
                    </span> */}
                </div>
                <div className="flex content-center justify-between w-full pt-2 md:w-1/3 md:justify-end">
                    <ul className="flex items-center justify-between flex-1 list-reset md:flex-none">
                        <li className="flex-1 md:flex-none md:mr-3">
                            <Link to="/" className="inline-block px-4 py-2 text-white no-underline" onClick={closeDropdown}>
                                View Site
                            </Link>
                        </li>
                        <li className="flex-1 md:flex-none md:mr-3">
                            <Link to="/link" className="inline-block px-4 py-2 text-gray-400 no-underline hover:text-gray-200 hover:text-underline" onClick={closeDropdown}>
                                Link
                            </Link>
                        </li>
                        <li className="flex-1 md:flex-none md:mr-3">
                            <div className="relative inline-block">
                            {data && data.map((d) => (
                                <button onClick={toggleDropdown} className="px-2 py-2 text-white drop-button">
                                    <span className="pr-2"><i className="em em-robot_face" /></span> Hi, {d.name}
                                    <svg className="inline h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </button>
                                ))}
                                {isDropdownOpen && (
                                    <div className="absolute right-0 z-30 p-3 mt-3 overflow-auto text-white bg-gray-800 dropdownlist">
                                        {/* <input
                                            type="text"
                                            className="p-2 text-gray-600 drop-search"
                                            placeholder="Search.."
                                            id="myInput"
                                        /> */}
                                        <Link to="/profile" className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                                            <i className="fa fa-user fa-fw" /> Profile
                                        </Link>
                                        <Link to="/settings" className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                                            <i className="fa fa-cog fa-fw" /> Settings
                                        </Link>
                                        <div className="border border-gray-800" />
                                        <Link to="/logout" className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                                            <i className="fas fa-sign-out-alt fa-fw" /> Log Out
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
