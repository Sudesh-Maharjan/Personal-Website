import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Banner from '../components/banner/Banner'
import Resume from '../components/resume/Resume'
import AboutmeBanner from '../components/aboutbanner/Aboutmebanner'
import Bbanner from '../components/businessBanner/Bbanner'
import ServiceBanner from '../components/service/ServiceBanner'
import Footer from '../components/footer/Footer'
import FooterBottom from '../components/footer/FooterBottom'
import Portfolio from '../components/portfolio/Portfolio'
import { useEffect } from 'react'

const HomePage = () => {
  

  
  return (
    <>

      <Navbar />
      <div className="max-w-screen-xl mx-auto sm:px-4">

        <Banner  />
        <AboutmeBanner />
        <ServiceBanner />
        <Bbanner />
        <Resume />
        <Portfolio/>
      </div>
      <Footer />
      <FooterBottom />
    </>
  )
}

export default HomePage
