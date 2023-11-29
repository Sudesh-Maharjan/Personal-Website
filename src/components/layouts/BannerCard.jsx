import React from 'react'

const BannerCard = ({ bimg, title, sdate, des }) => {
    return (
        <div className="container flex flex-wrap mx-auto">
            <div className="w-full ">
                <div className="w-full p-1 mx-auto  sm:w-[220px]">
                    <img className="mb-4 shadow-md  mx-auto md:w-[230px] md:h-[230px] w-[300px] h-[300px] object-cover" alt="Use any sample image here..." src={bimg} />
                    <h4 className="mb-2 text-lg font-bold"> {title} </h4>
                    {/* <h4 className="mb-2 text-lg ">{sdate}</h4>
                    <p className="text-base "> {des} </p> */}
                </div>
            </div>
        </div>

    );
}

export default BannerCard