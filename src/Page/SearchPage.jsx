import React, { useEffect, useRef } from 'react'
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import { useState } from 'react';
import format from 'date-fns/format'
import axios from 'axios';



function SearchPage() {
    const [topic, setTopic] = useState('random')
    const [photos, setPhotos] = useState([])
    useEffect(()=>{
        axios.get(`https://api.unsplash.com/search/photos/?query=${topic}&client_id=2GwXPBpS00vz8cRqcEm8aaeA4bj6xAYRyrlr1sStQ80&query=${topic}&orientation=landscape&per_page=21`)
        .then(res=>{
            setPhotos(res.data.results)
        }).catch((err)=>{
            console.log(err)
        });
    },[topic])

    console.log(photos);
    let today = new Date()
    let todayDate = today.getDate
    const [list,setList] = useState([]);
    const [searchResult,setSearchResult] = useState([])
    const [date, setDate] = useState('')
    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(),0),
            key: 'selection'
        }
    ]);
    useEffect(()=>{
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=ljGx2H4P9FKIoK31ifh8DciVQufp7El4546wJdTJ&date=${date}`)
        .then(res=> setSearchResult(res.data))
        .catch((err)=> console.log(err))
    },[date])
    console.log(searchResult)
    const handleChange = (e)=>{
        setDate(e.target.value);
    }
    const handleSearch = ()=>{
        let inputValue = document.getElementById('topic').value;
        setTopic(inputValue)
    }
    
    useEffect(()=>{
        axios.get(`https://api.nasa.gov/planetary/apod?api_key=ljGx2H4P9FKIoK31ifh8DciVQufp7El4546wJdTJ&start_date=${format(state[0].startDate,"yyyy-MM-dd")}&end_date=${format(state[0].endDate,"yyyy-MM-dd")}`)
        .then(res=>{setList(res.data)})
        .catch((err)=> console.log(err))
    },[state[0].endDate])
    console.log(list)

    const [open,setOpen] = useState(false);
    const refOne = useRef(null)
  return (
    <div className=''>
        <div className="container flex">
            <div className="todayImage w-2/3 text-left">
                Search Result by Date range selected
                <div className="image">
                    <div className="imageInfo m-2 text-left text-white">
                        <img src="https://apod.nasa.gov/apod/image/2310/DesertEclipse_Daviron_960.jpg" alt="" className='border rounded-xl' />
                        <span className='text-2xl font-sans '> Image of the Day:</span> <span className='text-xl'> A Desert Eclipse</span>    <span>Date: 2023-10-02</span>
                        <p className=''>A good place to see a ring-of-fire eclipse, it seemed, would be from a desert. In a desert, there should be relatively few obscuring clouds and trees.  Therefore late December of 2019, a group of photographers traveled to the United Arab Emirates and Rub al-Khali, the largest continuous sand desert in world, to capture clear images of an unusual eclipse that would be passing over.  A ring-of-fire eclipse is an annular eclipse that occurs when the Moon is far enough away on its elliptical orbit around the Earth so that it appears too small, angularly, to cover the entire Sun. At the maximum of an annular eclipse, the edges of the Sun can be seen all around the edges of the Moon, so that the Moon appears to be a dark spot that covers most -- but not all -- of the Sun. This particular eclipse, they knew, would peak soon after sunrise.  After seeking out such a dry and barren place, it turned out that some of the most interesting eclipse images actually included a tree in the foreground, because, in addition to the sand dunes, the tree gave the surreal background a contrasting sense of normalcy, scale, and texture.  On Saturday, October 14, a new ring of fire will be visible through clear skies from a thin swath crossing both North and South America.</p>
                        ©Maxime Daviron
                    </div>
                </div>
                <div>
                    { list?
                        list.map(item=>{return(
                            <>
                                <div className="image">
                                    <div className="imageInfo m-2 text-left text-white">
                                        <img src={item.url}alt="" className='border rounded-xl' />
                                        <span className='text-2xl font-sans '> Image for You:</span> <span className='text-xl'> {item.title}</span>    <span>Date: {item.date}</span>
                                        <p>{item.explanation}</p>
                                        ©{item.copyright}
                                    </div>
                                </div>
                            </>
                )
                    }):""
                }
                </div>
            </div>
            <div className="search w-1/2 flex text-left text-2xl text-black flex-col gap-2">
                <input 
                className='text-black w-1/2 h-8 text-center outline-none text-xl border rounded-xl'
                value={`${format(state[0].startDate,"dd/MM/yyyy")} to ${format(state[0].endDate,"dd/MM/yyyy")}`} name='search'
                onClick={()=>setOpen(!open)}/>
                <label>Search by the date range</label>
                {open?<DateRangePicker
                    onChange={item => setState([item.selection])}
                    showSelectionPreview={true}
                    editableDateInputs={true}
                    moveRangeOnFirstSelection={false}
                    maxDate={new Date()}
                    months={1}
                    ranges={state}
                    direction="horizontal"
                />:''}
                <div className='flex justify-left flex-col gap-2'>
                    <input
                        className='text-black w-1/2 h-8 text-center outline-none text-xl border rounded-xl' 
                        type="date" 
                        placeholder='Search for a partiular date image'
                        onChange={handleChange}
                    />
                    <label>Search by the Date</label>
                </div>
                <input type="text" name="topic" id="topic" className=' h-8 px-2 outline-none text-xl border rounded-xl' placeholder='Search image by the topic like : space,technolgy,ofiice,general,etc'/>
                    <button className='w-14 h-8 bg-slate-300 border-white rounded-lg outline-none text-purple-600 font-sans font-medium text-2xl'
                    onClick={handleSearch}>Search</button>
                <div className="image">
                    Searh result of The Date :
                        <div className="imageInfo m-2 text-left text-white">
                            <img src={searchResult.hdurl}alt="" className='border rounded-xl' />
                            <span className='text-2xl font-sans '> Image by the date:</span> <span className='text-xl'> {searchResult.title}</span>    <span>Date: {searchResult.date}</span>
                            <p className='text-base'>{searchResult.explanation}</p>
                            ©{searchResult.copyright}
                        </div>
                </div>

                <div className="container py-1 my-3 grid gap-3 grid-cols-1">
                   <span className='text-white'>Search result by the Topic : {topic} </span> 
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

            </div>
        </div>
    </div>
  )
}

export default SearchPage