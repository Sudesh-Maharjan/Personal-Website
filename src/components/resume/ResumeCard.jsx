import React from "react";

const ResumeCard = ({ title, subTitle, resumeCardImg, des }) => {
  return (
    <div className="flex w-full h-1/3 group">
      <div className="w-10 h-[6px] bgOpacity mt-16 relative">
        <span className="absolute flex items-center justify-center w-5 h-5 bg-black rounded-full -top-2 -left-3 bg-opacity-60">
          <span className="inline-flex w-3 h-3 duration-300 rounded-full bg-bodyColor group-hover:bg-green-400"></span>
        </span>
      </div>
      <div className="flex flex-col justify-center w-full gap-6 p-4 duration-300 rounded-lg bg-neutral-600 bg-opacity-80 hover:bg-opacity-100 lgl:px-10 lgl:gap-10 ">
        <div className="flex flex-col justify-between gap-4 lgl:flex-row lgl:gap-0 lgl:items-center">
          <div>
            <h3 className="text-xl font-semibold text-white md:text-2xl group-hover:text-designColor duration-30">
              {title}
            </h3>
            <p className="mt-2 text-sm text-white duration-300 group-hover:text-white">
              {subTitle}
            </p>
            {/* <p className="mt-10 text-sm font-medium text-white duration-300 md:text-base group-hover:text-white">
          {des}
        </p> */}
          </div>
          {/* <div className="flex justify-end w-1/4 rounded-lg">
            <img src={resumeCardImg} alt=" " className="" />
            <p className="flex items-center justify-center px-4 py-2 text-sm font-medium bg-black bg-opacity-25 rounded-lg text-designColor">
              {result}
            </p>
          </div> */}
        </div>
        
      </div>
    </div>
  );
};

export default ResumeCard;
