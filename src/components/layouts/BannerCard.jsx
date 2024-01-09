import React from 'react'
import { calculateTimeAgo } from './utils';

const BannerCard = ({ bimg, title}) => {
    const capitalizedTitle = title.charAt(0).toUpperCase() + title.slice(1);
    return (
        <div className="flex justify-center items-center ">
                <div className=" p-1 w-auto h-auto flex flex-col items-start">
                    <img className="mb-4 shadow-md  mx-auto w-[420px] h-[380px]  rounded-lg object-cover" alt="Use any sample image here..." src={bimg} />
                    <h4 className="mb-2 ml-6 text-lg font-bold"> {capitalizedTitle} </h4>
                    {/* <p className="text-gray-600 mb-2">{calculateTimeAgo(udate)}</p> */}

                    {/* <h4 className="mb-2 text-lg ">{sdate}</h4>
                    <p className="text-base "> {des} </p> */}
                </div>
        </div>

    );
}

export default BannerCard