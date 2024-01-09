import React from 'react'

const BannerTitle = ({ title}) => {
    return (
        <div className='flex flex-col items-center justify-center gap-4 font-titleFont '>
            <div className='mt-8 text-4xl capitalize md:text-5xl text-Black'>{title}</div>
            <div className='w-28 h-0.5 mb-8 shrink-0 border-t-2 border-t-[#49A078] border-solid'></div>
        </div>
    );
}

export default BannerTitle