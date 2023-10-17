import React, { useEffect, useState } from 'react'
import axios from 'axios';
function ImagesList() {
  const [page, setPage] = useState(1)
  const [photos, setPhotos] = useState([])
  useEffect(()=>{
    axios.get(`https://api.unsplash.com/search/photos/?query=space&client_id=2GwXPBpS00vz8cRqcEm8aaeA4bj6xAYRyrlr1sStQ80&query=space&orientation=landscape&per_page=21&page=${page}`)
    .then(res=>{
        setPhotos(res.data.results)
    }).catch((err)=>{
        console.log(err)
    });
},[page])
console.log(photos);
 
  return (
    <div>
        <div className='conatiner  py-1 my-3 grid gap-3 grid-cols-3'>
        {photos.map((photo)=>{ return(
            <>
            <div className="card bg-none w-full flex flex-col border-2 rounded-lg">
                <div className="image ">
                    <img src={photo.urls.raw}
                    alt="" className='border-2  w-full rounded-lg '/>
                </div>
                <div className="imageInfo mx-2">
                    <div className="imagename flex">
                        <span className='title text-left font-sans font-medium text-3xl'>{photo.description?.slice(0, 20)}</span>
                        <span className='text-lg ml-2 pt-1 flex text-center items-center'>by @{photo.user.instagram_username}</span>
                    </div>
                    <p className="desc text-lg font-light text-left">{photo.alt_description}</p>
                    <div className="ownerInfo flex border-t-2 border-gray-600 pt-2">
                        <img src={photo.user.profile_image?.medium} alt="" srcset="" className='border rounded-full' />
                        <span className='fullName text-gray-300 text-3xl ml-2 text-center flex items-center'>{photo.user.name}</span>
                    </div>
                    
                    
                    <span className='text-left'>Likes on this post ❤: {photo.likes}</span>
                </div>
            </div>
            </>)
        })}
        </div> 
        <div className="navigation flex justify-between">
           {
            page>1?<button onClick={()=>setPage(prev=> prev -1)} className='w-24 h-14 bg-slate-300 border-white rounded-lg outline-none text-purple-600 font-sans font-medium text-2xl'>Previous</button>:""
           } 
            <button onClick={()=>setPage(prev=> prev +1)} className='w-24 h-14 bg-slate-300 border-white rounded-lg outline-none text-purple-600 font-sans font-medium text-2xl'>Next</button>
        </div>
    </div>
  )
}

export default ImagesList