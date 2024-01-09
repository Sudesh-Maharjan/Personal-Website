import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import FooterBottom from '../components/footer/FooterBottom'
import MyJourney from '../components/resume/MyJourney'

const MyJourneyPage = () => {
  return (
    <>
      <Navbar />
      <div className="items-center justify-center w-full max-w-screen-xl mx-auto">
        <MyJourney/>



      </div>
      <Footer />
      <FooterBottom />

    </>
  )
}

export default MyJourneyPage