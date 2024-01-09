import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { logo } from "../../assets/index"
import { navLinksdata } from '../../constants';
import Media from '../banner/Media';
import { API_URL, IMG_URL } from '../../Config';
import axios from 'axios';
const Navbar = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/introduction/personal-info`); // Replace with your API endpoint
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  const [showMenu, setShowMenu] = useState(false)
  return (
    <div className="w-full h-24 sticky top-0 z-50 bg-white mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-black">
      {
        data && data.map((d) => (
          <div key={d}>
            <Link to="/">
            <h1 className='text-2xl font-bold m-3 ml-5 uppercase tracking-widest'>{d.name}</h1>
              {/* <img src={`${IMG_URL}/${d.profilePic}`} alt="logo" className='w-20 h-20 ml-10 object-cover xs:w-15 xs:ml-5 rounded-full' /> */}
            </Link>
          </div>
        ))}
      <div>
        <ul className="items-center hidden gap-6 mr-10 mdl:inline-flex lg:gap-10 ">
          {navLinksdata.map(({ _id, title, link }) => (
            <li
              className="text-lg font-normal tracking-wide text-black duration-300 cursor-pointer hover:text-designColor"
              key={_id}
            >
              <Link
                activeClass="active"
                to={link}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
        <span
          onClick={() => setShowMenu(!showMenu)}
          className="inline-flex items-center justify-center w-10 h-10 mr-4 text-xl bg-black rounded-full cursor-pointer mdl:hidden text-designColor"
        >
          <FiMenu />
        </span>
        {showMenu && (
          <div className="w-[80%] h-screen overflow-scroll absolute top-0 left-0 bg-gray-900 p-4 scrollbar-hide">
            <div className="relative flex flex-col gap-8 py-2">
              <div>
                {
                  data && data.map((d) => (
                    <div key={d} className="">
                      <Link to="/">
                        <img src={`${IMG_URL}/${d.profilePic}`} alt="logo" className='w-20 h-20 ml-10 object-cover xs:w-15 xs:ml-5 rounded-full' />
                      </Link>
                    </div>
                  ))}
                <p className="mt-2 text-sm text-gray-400">
                  I'm a skilled Full Stack Developer specializing in React and Express.js,
                  crafting seamless web applications that marry front-end excellence with
                  robust back-end capabilities.
                </p>
              </div>
              <ul className="flex flex-col gap-4">
                {navLinksdata.map((item) => (
                  <li
                    key={item._id}
                    className="text-base font-normal tracking-wide text-gray-400 duration-300 cursor-pointer hover:text-designColor"
                  >
                    <Link
                      onClick={() => setShowMenu(false)}
                      activeClass="active"
                      to={item.link}
                      spy={true}
                      smooth={true}
                      offset={-70}
                      duration={500}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <h2 className="mb-4 text-base text-white uppercase font-titleFont">
                  Find me in
                </h2>
                <div className="flex gap-4">
                  <Media />
                </div>
              </div>
              <span
                onClick={() => setShowMenu(false)}
                className="absolute text-2xl text-gray-400 duration-300 cursor-pointer top-4 right-4 hover:text-designColor"
              >
                <MdClose />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Navbar