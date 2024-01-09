import React from 'react';

const YvideoCard = ({ ysrc, ytitle}) => {
  return (
    <div className="border border-gray-100 border-solid h-60">
      <a href={ysrc} target="_blank" rel="noopener noreferrer">
        <div className="h-2/3">
          <iframe
            className="object-cover w-full h-full"
            src={ysrc}
            title={ytitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="h-1/3">
          <h3 className="text-lg font-bold text-start">{ytitle}</h3>
        </div>
      </a>
    </div>
  );
};

export default YvideoCard;
