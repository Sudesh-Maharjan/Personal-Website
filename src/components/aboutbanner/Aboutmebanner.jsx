import React from 'react'
import AMLBanner from './AMLBanner' 
import AMRBanner from './AMRBanner' 
import BannerTitle from '../layouts/BannerTitle' 

const AboutmeBanner = () => {
    return (
        <div id="aboutmebanner" >
            <BannerTitle
                title="About Me" 
                 />


            <section id="home" className="flex flex-col items-center w-full gap-10 pt-10 pb-20 xs:p-4 xl:gap-0 lgl:flex-row font-titleFont ">

                <AMLBanner />
                <AMRBanner />
            </section>

        </div>
    ) 
}

export default AboutmeBanner