import React from 'react'
import searchicon from '../Assets/search.png'
import SearchPage from '../Page/SearchPage'
import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <div className='navbar w-full h-full bg-opacity-50 bg-gray-900 flex'>
        <ul className='flex justify-center w-[70%]'>
            <li className='text-2xl font-medium mx-5 '>Home</li>
            <li className='text-2xl font-medium mx-5 '>Images</li>
            <li className='text-2xl font-medium mx-5 '>About Us</li>
            <li className='text-2xl font-medium mx-5 '>Contact Us</li>
        </ul>
        <div className="search w-[30%]">
            <div className="searchbox flex justify-between border rounded-2xl w-2/3">

            <label htmlFor="" className='mx-2 text-2xl'>Search for the image  </label>
            <Link to='/search'>    <img src={searchicon} alt="" srcset="" className='mx-2 filter invert' /></Link> 
            </div>
        </div>
    </div>
  )
}

export default Navbar