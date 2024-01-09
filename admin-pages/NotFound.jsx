import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found</title>
      </Helmet>
      <div className="container mx-auto my-5">
        <div className="flex justify-center">
          <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 shadow-md">
            <h1 className="text-center text-gray-700 text-3xl font-semibold mb-4">
              404 Page Not Found
            </h1>
            <Link
              to="/"
              className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Go to HomePage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
