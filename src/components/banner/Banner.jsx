import React from "react" 
import LeftBanner from "./LeftBanner" 
import RightBanner from "./RightBanner" 
const Banner = () => {
  return (
    <section
      id="home"
      className="flex flex-col-reverse items-center w-full gap-10 pt-10 pb-10 xs:p-4 xl:gap-0 lgl:flex-row font-titleFont border-b-black"
    >
      <LeftBanner />
      <RightBanner />
    </section>
  ) 
} 

export default Banner 
