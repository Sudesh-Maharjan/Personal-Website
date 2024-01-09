import React from 'react'

const BookCard = ({ bkimg, title, des }) => {
    return (
        <div className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
            <div className="overflow-hidden rounded shadow-lg">
                <img className="w-full" src={bkimg} alt="book card photo" />
                <div className="px-6 py-4">
                    <div className="mb-2 text-xl font-bold">{title}</div>
                    <p className="text-base text-gray-700">
                        {des}
                    </p>
                </div>
                {/* <div className="px-6 py-4">
                    <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#photography</span>
                    <span className="inline-block px-3 py-1 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#travel</span>
                    <span className="inline-block px-3 py-1 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">#winter</span>
                </div> */}
            </div>
        </div>

    );
}

export default BookCard
