import React from 'react'

const AddICountry = () => {
  return (
    <div>
      <div className="grid grid-cols-3">
        <div className="col-start-2 border border-black-300 shadow-xl mt-20 py-20 px-10 bg-white rounded-md">
          <input type="text" placeholder="Username" name="username" className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5" />
          <input type="password" placeholder="Password" name="password" className="rounded-md block w-full border border-black-200 py-3 px-2 mb-5" />
          <button type="submit" className="block w-full bg-green-700 text-white rounded-md py-3 px-2 mb-5">Login</button>
          <div className="w-full text-center">
            <a href="#" className="text-gray-400 hover:underline">forgot password?</a>
          </div>
        </div>
      </div>


    </div>
  )
}

export default AddICountry
