import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL, IMG_URL } from '../../../Config';
import axios from 'axios';
import { IoMdExit } from "react-icons/io";
// import { signout } from '../../../auth';
const AdminNavbar = () => {
  const history = useNavigate();
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
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);
//handel logout
  const handleLogout = () => {
    const confirmLogout = window.confirm('Do you want to logout?');
    
    if (confirmLogout) {
      history('/signin');
      
    }else{
      console.log('Logout canceled. No action taken.');
    }
      // signout(() => {
      // });
    
  };


  return (
    <nav aria-label="menu nav" className="fixed top-0 z-20 w-full h-auto px-1 pt-2 pb-1 mt-0 bg-gray-800 md:pt-1">
      {data && data.map((d) => (
        <div key={d} className="flex flex-wrap items-center">
          <div className="flex justify-center flex-shrink text-white md:w-1/3 md:justify-start">
            <>
              <img src={`${IMG_URL}/${d.profilePic}`} alt="logo" className='w-10 h-10 ml-10 object-cover xs:w-15 xs:ml-5 rounded-full' />

              <Link to="/">
                <span className="pl-2 text-xl"><i className="em em-grinning" /></span>
              </Link>
            </>

          </div>
          <div className="flex justify-center flex-1 px-2 text-white md:w-1/3 md:justify-start"></div>

          <div className="flex content-center justify-between w-full pt-2 md:w-1/3 md:justify-end" key={d.id}>
            <ul className="flex items-center justify-between flex-1 list-reset md:flex-none">
              <li className="flex-1 md:flex-none md:mr-3">
                <Link to="/" className="inline-block px-4 py-2 text-white no-underline" onClick={closeDropdown}>
                  View Site
                </Link>
              </li>
              {/* <li className="flex-1 md:flex-none md:mr-3">
                <Link to="/link" className="inline-block px-4 py-2 text-gray-400 no-underline hover:text-gray-200 hover:text-underline" onClick={closeDropdown}>
                  Link
                </Link>
              </li> */}
              <li className="flex-1 md:flex-none md:mr-3">
                <div className="relative inline-block" ref={dropdownRef}>
                  <button onClick={toggleDropdown} className="px-2 py-2 text-white drop-button">
                    <span className="pr-2"><i className="em em-robot_face" /></span> Hi, {d.name}
                    <svg className="inline h-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                  </button>

                  {/* {isDropdownOpen && (
                    <div className="absolute right-0 z-30 p-3 mt-3 overflow-auto text-white bg-gray-800 dropdownlist"> */}
                      {/* <Link to="/profile" className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                        <i className="fa fa-user fa-fw" /> Profile
                      </Link>
                      <Link to="/settings" className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                        <i className="fa fa-cog fa-fw" /> Settings
                      </Link> */}
                      {/* <div className="border border-gray-800" />
                      <Link to="/signin" onClick={() => signout(() => { navigate('/signin') })} className="block p-2 text-sm text-white no-underline hover:bg-gray-800 hover:no-underline">
                        <i className="fas fa-sign-out-alt fa-fw" /> Log Out
                      </Link>
                    </div>
                  )} */}

                </div>
              </li>
              <li>
                <div className="" >
                  <div className="btn btn-danger hover:cursor-pointer"
                  >
                    <IoMdExit className='text-white text-2xl mr-4' onClick={handleLogout} />
                  </div>

                </div>
              </li>

            </ul>
          </div>

        </div>
      ))}
    </nav>
  );
};

export default AdminNavbar;
