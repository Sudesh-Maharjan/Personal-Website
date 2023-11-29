import React from 'react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const NewsCard = ({ title, pdate, udate, img, desc, link }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    const calculateTimeAgo = (updateTime) => {
        const now = new Date()
        const updateDate = new Date(updateTime)
        const timeDifference = now - updateDate
        const minutes = Math.floor(timeDifference / (1000 * 60))

        if (minutes < 1) {
            return 'Updated just now'
        } else if (minutes < 60) {
            return `Updated ${minutes} minutes ago`
        } else if (minutes < 1440) {
            const hours = Math.floor(minutes / 60)
            return `Updated ${hours} hours ago`
        } else if (minutes < 10080) {
            const days = Math.floor(minutes / 1440)
            return `Updated ${days} days ago`
        } else if (minutes < 40320) {
            const weeks = Math.floor(minutes / 10080)
            return `Updated ${weeks} weeks ago`
        } else if (minutes < 525600) {
            const months = Math.floor(minutes / 40320)
            return `Updated ${months} months ago`
        } else {
            const years = Math.floor(minutes / 525600)
            return `Updated ${years} years ago`
        }
    }

    return (
        <section className="flex flex-col items-center w-full gap-10 pt-10 pb-10 xs:p-4 xl:gap-0 lgl:flex-row font-titleFont border-b-black">
            <div className="mx-auto bg-white rounded-xl overflow-hidden shadow-md w-full sm:w-80 md:w-96 lg:w-2/3 xl:w-full">
                <div className="p-4">
                    <h2 className="font-bold text-2xl mb-2 sm:text-3xl">{title}</h2>
                    <div className="flex flex-auto gap-4">
                        <p className="text-gray-600 mb-2">Posted at: {formatDate(pdate)}</p>|
                        <p className="text-gray-600 mb-2">{calculateTimeAgo(udate)}</p>
                    </div>
                </div>
                <div className="p-4 bg-cover bg-center h-72 sm:h-96">
                    <img className="w-full h-full object-cover" src={img} alt="News" />
                </div>
                <div className="p-4">
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
            </div>
        </section>
    )
}

export default NewsCard 
