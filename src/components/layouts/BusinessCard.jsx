import React from 'react'
import { Link } from 'react-router-dom'

const BusinessCard = ({ title, sdate, edate, img, desc, link }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
      };
    return (
        <section className="flex flex-col items-center w-full gap-10 pt-10 pb-10 xs:p-4 xl:gap-0 lgl:flex-row font-titleFont border-b-black">
            <div className="mx-auto bg-white rounded-xl overflow-hidden shadow-md w-full sm:w-80 md:w-96 lg:w-2/3 xl:w-full">
                <div className="p-4">
                    <h2 className="font-bold text-2xl mb-2 sm:text-3xl">{title}</h2>
                    <div className=" flex flex-auto gap-8">
                        <p className="text-gray-600 mb-2">Started at: {formatDate(sdate)}</p>|
                        <p className="text-gray-600 mb-2">Ended at: {formatDate(edate)}</p>
                    </div>

                </div>
                <div className="p-4 bg-cover bg-center h-72 sm:h-96">
                    <img
                        className="w-full h-full object-cover"
                        src={img}
                        alt="News"
                    />
                </div>
                <div className="p-4">
                    <p className="text-gray-700 mb-3">
                        {desc}
                    </p>
                    <Link
                        to={link}
                        className="text-blue-500 hover:underline transition duration-300">
                        Link Here If any
                    </Link>
                </div>
            </div>
        </section>
    )
}
export default BusinessCard 
