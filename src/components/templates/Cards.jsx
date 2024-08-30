import React from 'react'
import { Link } from 'react-router-dom'
import na from "/na.jpg";


function Cards({data , title}) {
  

  return (
    <div className='flex flex-wrap w-full gap-[2vw] justify-center px-5 pt-3 '>
        {data.map((c,i)=>(
            <Link to={`/${c.media_type || title}/details/${c.id}`} className='relative w-[25vh] mt-5' key={i}>
                <img className='shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[40vh] object-cover rounded-lg' src={c.poster_path || c.backdrop_path || c.profile_path ? `https://image.tmdb.org/t/p/original/${c.poster_path || c.backdrop_path || c.profile_path }` : na} alt="" />


                <h1 className='text-xl text-zinc-300 text-semibold mt-2'>
                {c.name || c.original_name || c.original_title || c.title}
                </h1>
                {c.character && <h1 className='text-xl text-zinc-300 font-bold mt-2'>
                {c.character}
                </h1>}

                {c.vote_average && c.vote_average*10 && (
                  <div className="absolute button-33 right-[-10%] top-[-3%] text-sm font-semibold text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full">
                  {(c.vote_average *10).toFixed()}%
                </div>
                )}
    
            </Link>
        ))}
    </div>
  )
}

export default Cards