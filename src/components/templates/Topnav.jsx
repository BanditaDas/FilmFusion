import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../utils/axios';
import na from "/na.jpg"

function Topnav() {
    const [query, setquery] = useState("")

    const [search, setsearch] = useState([])

    const Getsearch = async() => {
        try{
          const data = await axios.get(`/search/multi?query=${query}`)
          setsearch(data.data.results)
        }catch(e){
          console.log(e);
        }
      }
    
      useEffect(()=>{
        Getsearch();
      },[query])
    
  return (
    <div className='w-full h-[10vh] relative flex justify-center items-center gap-5 '>
        <i className="text-zinc-400 text-2xl ri-search-line"></i>
        <input onChange={(e)=> setquery(e.target.value)} 
        value={query} className='w-[50%] text-white mx-10 p-5 text-xl outline-none border-none bg-transparent' type="text" placeholder='Search Here...' />

        {query.length > 0 && (
            <i onClick={() => setquery("")} className="ri-close-fill text-zinc-400 text-2xl cursor-pointer"></i>
        )}

        <div className="z-[100] absolute w-[50%] max-h-[40vh] bg-zinc-700 top-[90%] left-[25%] rounded-lg overflow-auto ">

            {search.map((s,i)=>(
                <Link to={`/${s.media_type}/details/${s.id}`} key={i} className='w-[100%] px-5 py-4 text-zinc-400 font-semibold flex justify-start items-center text-lg border-b-[1px] border-zinc-600 hover:bg-zinc-800 hover:text-white duration-300'>
                    <img className='w-[9vh] h-[12.5vh] object-fit rounded-lg mr-10' src={
                        s.poster_path || s.backdrop_path || s.profile_path ?
                        `https://image.tmdb.org/t/p/original/${s.poster_path || s.backdrop_path || s.profile_path}` 
                        : na} alt="" />
                    <span>{s.name || s.original_name || s.original_title || s.title
                    }</span>
                </Link> 
            ))}
        </div>
    </div>
  )
}

export default Topnav