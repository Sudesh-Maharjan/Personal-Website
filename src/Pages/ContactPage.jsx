import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import FooterBottom from '../components/footer/FooterBottom'
import Yvideos from '../components/videos/Yvideos'

const ContactPage = () => {
  return (
    <>
      <Navbar />
      <div className="items-center justify-center w-full max-w-screen-xl mx-auto">
        <Yvideos/>



      </div>
      <Footer />
      <FooterBottom />

    </>
  )
}

export default ContactPage
