import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Sidenav() {

  
  return (
    <div className=" w-[20%] h-full border-r-[1px] border-zinc-500 p-10">
        <h1 className='text-3xl text-white font-bold'>
            <i className="text-[#6556CD] ri-movie-2-line mr-2"></i>
            <span className='ml-4 text-2xl'>FilmFusion</span>
        </h1>
        <nav className='flex text-zinc-400 flex-col text-lg gap-7'>
            <h1 className='text-white font-semibold text-2xl mt-10 mb-3 ml-3' >New Feeds</h1>
            <Link to="/trending" className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg text-zinc-400 hover:text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#281c75] hover:to-[#6557ba] '>
            <i className="ri-fire-fill"></i>Trending</Link>
            <Link to="/popular"  className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg  text-zinc-400 hover:text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#281c75] hover:to-[#6557ba] '>
            <i className="ri-bard-fill"></i>Popular</Link>
            <Link to="/movie" className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg  text-zinc-400 hover:text-white hover:text-whitefont-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#281c75] hover:to-[#6557ba] '>
            <i className="ri-film-fill"></i>Movies</Link>
            <Link to="/tv" className=' flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg   text-zinc-400 hover:text-white font-semibold bg-gradient-to-r  hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#281c75] hover:to-[#6557ba] '>
            <i className="ri-tv-2-fill"></i>Tv Shows</Link>
            <Link to="/people" className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg  text-zinc-400 hover:text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#281c75] hover:to-[#6557ba] '>
            <i className="ri-team-fill"></i>People</Link>
        </nav>
        <hr className='border-none h-[1px] bg-zinc-500 mt-5'/>
        <nav className='flex text-zinc-400 text-lg gap-3 mt-10'>
            <Link className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg text-zinc-400 hover:text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#5b4fac] hover:to-[#241a69] '>
            <i className="ri-information-line"></i>About</Link>
            <Link  className='flex justify-start items-center gap-2 p-3 cursor-pointer rounded-lg  text-zinc-400 hover:text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-300 hover:from-[#241a69] hover:to-[#5b4fac] '>
            <i className="ri-phone-fill"></i>Contact</Link>
            
            
        </nav>

    </div>
  )
}

export default Sidenav