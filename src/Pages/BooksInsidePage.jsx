import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'
import BooksInside from '../components/publications/BooksInside'

const BooksInsidePage = () => {
    return (
        <>
            <Navbar />
            <div className="items-center justify-center w-full max-w-screen-xl mx-auto">
                <BooksInside />


            </div>
            <Footer />

        </>
    )
}

export default BooksInsidePage