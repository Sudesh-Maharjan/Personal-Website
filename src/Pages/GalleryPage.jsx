import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Gallery from '../components/gallery/Gallery'
import Footer from '../components/footer/Footer'
import FooterBottom from '../components/footer/FooterBottom'
import Publications from '../components/publications/Publications'

const GalleryPage = () => {
    return (
        <>

            <Navbar />
            <div className="items-center justify-center w-full max-w-screen-xl mx-auto">
                <Gallery />


            </div>
            <Footer />
            <FooterBottom />

        </>
    )
}

export default GalleryPage
