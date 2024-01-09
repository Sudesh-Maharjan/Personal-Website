import React from 'react'

const MyJourneyCard = ({title,subTitle,country,des}) => {
  return (
    <div className="flex w-full h-1/3 group">
      <div className="w-10 h-[6px] bgOpacity mt-16 relative">
        <span className="absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-2 -left-3 bg-opacity-60">
          <span className="inline-flex w-3 h-3 duration-300 rounded-full bg-bodyColor group-hover:bg-designColor"></span>
        </span>
      </div>
      <div className="flex flex-col justify-center w-full gap-6 p-4 duration-300 bg-black rounded-lg bg-opacity-20 hover:bg-opacity-30 lgl:px-10 lgl:gap-10 shadow-shadowOne">
        <div className="flex flex-col justify-between gap-4 lgl:flex-row lgl:gap-0 lgl:items-center">
          <div>
            <h3 className="text-xl font-semibold duration-300 md:text-2xl group-hover:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-400 duration-300 group-hover:text-white">
              {subTitle}
            </p>
          </div>
          <div>
            <p className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-black bg-opacity-25 rounded-lg text-designColor shadow-shadowOne">
              {country}
            </p>
          </div>
        </div>
        <p className="text-sm font-medium text-gray-400 duration-300 md:text-base group-hover:text-gray-300">
          {des}
        </p>
      </div>
    </div>
  );
}

export default MyJourneyCard