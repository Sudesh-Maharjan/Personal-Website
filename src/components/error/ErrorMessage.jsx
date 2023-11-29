import React from 'react'
import { Link } from 'react-router-dom'

const ErrorMessage = () => {
    return (
        <div className="">
            <div className="flex items-center justify-center w-9/12 py-10 m-auto min-h-min">
                <div className="p-8 overflow-hidden bg-white shadow-2xl sm:rounded-lg">
                    <div className="pt-8 text-center border-t border-gray-200">
                        <h1 className="font-bold text-purple-400 text-9xl">404</h1>
                        <h1 className="py-8 text-6xl font-medium">oops! Page not found</h1>
                        <p className="px-12 pb-8 text-2xl font-medium">Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
                        <Link to="/">

                            <button className="px-6 py-3 mr-6 font-semibold text-white rounded-md bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-orange-500">
                                HOME
                            </button>
                        </Link>
                        <Link to="/contact">

                            <button className="px-6 py-3 font-semibold text-white rounded-md bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-500">
                                Contact Us
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ErrorMessage
