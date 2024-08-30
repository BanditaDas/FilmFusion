import React from 'react'
import { Link } from 'react-router-dom'

function Header({data}) {
  return (
    <div style={{
        background:`linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.7)), 
        url(https://image.tmdb.org/t/p/original/${data.poster_path || data.backdrop_path})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
    }} 
    
    className=' w-full h-[75vh] flex flex-col justify-end items-start p-5'>
      <h1 className='text-5xl font-bold text-white'>{data.name || data.original_name || data.original_title || data.title}</h1>
      <p className='text-white w-1/2 py-4'>{data.overview.slice(0,200)}...
        <Link to={`/${data.media_type}/details/${data.id}`} className='text-blue-400'>more</Link>
      </p>
      <p className='text-white w-1/2 flex gap-x-3 '>
        <i className="text-[#7f6fe1] ri-megaphone-fill "></i> {data.release_date || "Not Available"}
        <i className="text-[#7f6fe1] ri-album-fill "></i> {data.media_type.toUpperCase()}
      </p>
      <Link to={`/${data.media_type}/details/${data.id}/trailer`} className='rounded-lg text-white font-semibold bg-gradient-to-r hover:shadow-xl hover:shadow-violet-900 hover:scale-105 duration-500 from-[#281c75] to-[#6557ba] hover:from-[#6557ba] hover:to-[#281c75] gap-2 p-3 mt-3'>Watch Trailer</Link>
    </div>
  )
}

export default Header