import React from 'react'

const TravelTitle = ({ title}) => {
    return (
        <div className='flex flex-col justify-center gap-4 font-titleFont'>
            <div className='mt-8 text-4xl text-white capitalize md:text-5xl'>{title}</div>
            <div className='w-28 h-0.5 mb-8 shrink-0 border-t-2 border-t-[#49A078] border-solid'></div>
        </div>
    );
}

export default TravelTitle