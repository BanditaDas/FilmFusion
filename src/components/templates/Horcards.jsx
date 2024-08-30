import React from 'react'
import { Link } from 'react-router-dom'
import na from "/na.jpg";

function Horcards({data}) {
  
  return (

      <div className="w-[100%] h-[52vh] flex overflow-x-auto overflow-y-hidden mb-5 px-5">

        {data && data.length > 0 ? data.map((d,i)=>(
          <Link to={`/${d.media_type}/details/${d.id}`} key={i} className="min-w-[15%] h-full mr-5 pb-5 ">
            <img className='w-full h-[80%] object-cover rounded-lg' src={d.poster_path || d.backdrop_path ? `https://image.tmdb.org/t/p/original/${d.poster_path || d.backdrop_path}` : na} alt="" />
            <div className="text-white pt-3 h-[45%]">
              <h1 className=' text-xl font-semibold '>{d.name || d.original_name || d.original_title || d.title}</h1>
            </div>
            
          </Link>
        )): <h1 className='text-3xl text-white fint-black text-center mt-5'>Nothing to Show</h1>} 

      </div>
  )
}

export default Horcards