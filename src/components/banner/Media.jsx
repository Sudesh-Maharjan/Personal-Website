// import React, { useState, useEffect } from 'react'
// import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaYoutube,FaThreads, FaInstagram, FaGitlab, FaTiktok, FaSnapchatSquare, FaRedditAlien, FaPinterest } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import axios from 'axios'
// import { API_URL } from '../../Config'

// const Media = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${API_URL}/url`)
//         setData(response.data);
//       } catch (error) {
//         console.log('Error while fetching data', error)
//       }
//     };
//     fetchData();
//   }, []);

//   const getIconForUrl = (url) => {
//     if (url.includes('facebook.com')) {
//       return <FaFacebookF />
//     }
//     else if (url.includes('twitter.com')) {
//       return <FaTwitter />
//     }
//     else if (url.includes('linkedin.com')) {
//       return <FaLinkedinIn />
//     }
//     else if (url.includes('github.com')) {
//       return <FaGithub />
//     }
//     else if (url.includes('gitlab.com')) {
//       return <FaGitlab />
//     }
//     else if (url.includes('youtube.com')) {
//       return <FaYoutube />
//     }
//     else if (url.includes('threads.net')) {
//       return <FaThreads />
//     }
//     else if (url.includes('instagram.com')) {
//       return <FaInstagram />
//     }
//     else if (url.includes('tiktok.com')) {
//       return <FaTiktok />
//     }
//     else if (url.includes('snapchat.com')) {
//       return <FaSnapchatSquare />
//     }
//     else if (url.includes('reddit.com')) {
//       return <FaRedditAlien />
//     }
//     else if (url.includes('pinterest.com')) {
//       return <FaPinterest />
//     }

//     return null
//   }

//   return (
//     <div className="flex flex-col justify-between gap-6 xl:flex-row lgl:gap-0">
//       <div>
//         <h2 className="mb-4 text-base uppercase font-titleFont">Find me in</h2>
//         {/* <div className="flex gap-4"> */}
//         <div className="grid w-full grid-cols-4 gap-2">
//           {data.map((item, index) => (
//             <Link to={item.url} key={index} target='_blank' className="bannerIcon">
//               {getIconForUrl(item.url)}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Media





import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaYoutube, FaInstagram, FaGitlab, FaTiktok, FaSnapchatSquare, FaRedditAlien, FaPinterest } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';
import { FaLink } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../Config';

const Media = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/url`);
        setData(response.data);
      } catch (error) {
        console.log('Error while fetching data', error);
      }
    };
    fetchData();
  }, []);

  const iconsMap = [
    { keyword: 'facebook.com', icon: <FaFacebookF /> },
    { keyword: 'twitter.com', icon: <FaTwitter /> },
    { keyword: 'linkedin.com', icon: <FaLinkedinIn /> },
    { keyword: 'github.com', icon: <FaGithub /> },
    { keyword: 'gitlab.com', icon: <FaGitlab /> },
    { keyword: 'youtube.com', icon: <FaYoutube /> },
    { keyword: 'instagram.com', icon: <FaInstagram /> },
    { keyword: 'tiktok.com', icon: <FaTiktok /> },
    { keyword: 'snapchat.com', icon: <FaSnapchatSquare /> },
    { keyword: 'reddit.com', icon: <FaRedditAlien /> },
    { keyword: 'pinterest.com', icon: <FaPinterest /> },
    { keyword: 'threads.net', icon: <TbBrandThreads /> },
  ];

  const getIconForUrl = (url) => {
    const matchingIcon = iconsMap.find((item) => url.includes(item.keyword));
    return matchingIcon ? matchingIcon.icon : <FaLink />;
  };

  return (
    <div className="flex flex-col justify-between gap-6 xl:flex-row lgl:gap-0">
      <div>
        <h2 className="mb-4 text-base uppercase font-titleFont">Find me in</h2>
        <div className="flex gap-4">
          {data.map((item, index) => (
            <Link to={item.url} key={index} target='_blank' className="bannerIcon">
              {getIconForUrl(item.url)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;

