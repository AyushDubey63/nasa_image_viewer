import React from 'react'
import Navbar from '../Components/Navbar'
import ImagesList from '../Components/ImagesList'

function Home() {
  return (
    <div>
        <div className="container w-full h-full">
            <Navbar/>
            <ImagesList/>
        </div>
    </div>
  )
}

export default Home