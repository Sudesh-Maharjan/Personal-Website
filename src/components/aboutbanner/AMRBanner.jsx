import React from 'react'
import { ambannerImg } from "../../assets/index" 

const AMRBanner = () => {
  return (
    <div className="relative flex items-center justify-center w-full lgl:w-1/2">
      <img
        className="w-[300px] h-[400px] lgl:w-[350px] lgl:h-[480px] z-10"
        src={ambannerImg}
        alt="ambannerImg"
      />
      {/* <div className="absolute bottom-0 w-[350px] h-[300px] lgl:w-[500px] lgl:h-[500px] bg-gradient-to-r from-[#989fac] to-[#265fa4] drop-shadow-2xl flex justify-center items-center"></div> */}
    </div>
  ) 
}

export default AMRBanner