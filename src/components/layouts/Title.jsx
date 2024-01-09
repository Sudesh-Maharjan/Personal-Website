import React from 'react'

const Title = ({title, des}) => {
  return (
    <div className="flex flex-col items-center gap-4 justtify-center font-titleFont mb-14 xs:p-4">
      <h3 className="text-sm font-light tracking-wide uppercase text-designColor">
       {title}
      </h3>
      <h1 className="text-4xl font-bold capitalize md:text-5xl text-Black">{des}</h1>
      <div className='w-28 h-0.5 shrink-0 border-t-2 border-t-designColor border-solid'></div>
    </div>
  );
}

export default Title