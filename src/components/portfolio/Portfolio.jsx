import React from 'react'
import { pf1, pf2, pf3 } from "../../assets/index";
import { Link } from 'react-router-dom';
import BannerTitle from '../layouts/BannerTitle';


const Portfolio = () => {
    return (

        <>
            <div className="flex flex-col items-center justify-center w-auto bg-white">
                <BannerTitle
                title="Portfolio"
                />
                <div className="container grid w-full grid-cols-1 gap-2 mx-auto mb-5 sm:grid-cols-1 md:grid-cols-3 lgl:grid-cols-3">
                    <Link to="#">
                        <img className="justify-between w-full h-auto p-3 rounded-md cursor-pointer hover:shadow-md hover:scale-105" src={pf1} alt="" />

                    </Link>
                    <Link to="#">
                        <img className="justify-between w-full h-auto p-3 rounded-md cursor-pointer hover:shadow-md hover:scale-105" src={pf2} alt="" />
                    </Link>
                    <Link to="#">
                        <img className="justify-between w-full h-auto p-3 rounded-md cursor-pointer hover:shadow-md hover:scale-105" src={pf3} alt="" />
                    </Link>
                </div>
            </div>
        </>

    )
}

export default Portfolio

