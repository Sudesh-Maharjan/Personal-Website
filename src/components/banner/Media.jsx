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
  const [load, setLoad] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/url`);
        setData(response.data);
        setLoad(false);
      } catch (error) {
        console.log('Error while fetching data', error);
        setLoad(false);
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
    <div className="flex flex-col justify-between gap-6 xl:flex-row lgl:gap-0 ">
      {load &&(
        <div role="status" className='flex justify-center mt-28'>
    <svg aria-hidden="true" className="inline w-406 h-20 text-gray-200 animate-spin dark:text-gray-600  fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>
  )}
{/* End Loader */}
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