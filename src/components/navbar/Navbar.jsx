import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { logo } from "../../assets/index"
import { navLinksdata } from '../../constants';
import Media from '../banner/Media';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false)
  return (

    <div className="w-full h-24 sticky top-0 z-50 bg-white mx-auto flex justify-between items-center font-titleFont border-b-[1px] border-b-black">
      <div>
        <Link to="/">
          <img src={logo} alt="logo" className='h-10 ml-10 w-50' />
        </Link>
      </div>
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
                <Link to="/">

                  <img className="h-10 w-50 " src={logo} alt="logo" />
                </Link>
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
                  <Media/>
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