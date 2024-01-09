import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { calculateTimeAgo } from './utils';

const NewsCard = ({ title, pdate, udate, img, desc, link }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };

    return (
        <section className="flex flex-col items-center w-full gap-10 pt-10 pb-10 xs:p-4 xl:gap-0 lgl:flex-col font-titleFont border-b-black">
            <div className="mx-auto bg-white overflow-hidden shadow-md w-full sm:w-80 md:w-96 lg:w-2/3 xl:w-full">
                <div className="p-4">
                    <h2 className="font-bold text-2xl mb-2 sm:text-3xl">{title}</h2>
                    <div className="flex flex-auto gap-4">
                        <p className="text-gray-600 mb-2">Posted at: {formatDate(pdate)}</p>|
                        <p className="text-gray-600 mb-2">{calculateTimeAgo(udate)}</p>
                    </div>
                </div>
                <div className="p-4 bg-cover bg-center h-72 sm:h-96">
                    <img className="w-full h-[1000px] object-cover" src={img} alt="News" />
                </div>
            </div>
                <div className="p-4 shadow-lg">
                    <p
                        className="text-gray-700 mb-3"
                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(desc) }}
                    />
                    {link && (
                        <Link to={link} className="text-blue-500 hover:underline transition duration-300">
                            Link Here If any
                        </Link>
                    )}
                </div>
        </section>
    )
}

export default NewsCard 
