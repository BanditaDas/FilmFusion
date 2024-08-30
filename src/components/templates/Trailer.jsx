import React, { useEffect } from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Notfound from '../Notfound'

function Trailer() {
    const navigate = useNavigate()
    const {pathname} =useLocation()
    const cat = pathname.includes("movie") ? "movie" : "tv"
    const ytvid = useSelector(state => state[cat].info.videos)

    useEffect(() => {
        document.body.classList.add('overflow-hidden');
        return () => {
          document.body.classList.remove('overflow-hidden');
        };
      }, []);
    
    
    return ytvid !== "undefined" ? (
        <div className='absolute z-[100] top-[0] left-[0] w-full h-screen flex items-center justify-center bg-[rgba(0,0,0,.8)] '>



            <Link onClick={() => navigate(-1)} className="absolute hover:text-[#6556CD] ri-close-large-line mr-5 font-black text-white text-2xl right-[0%] top-[3.7%]"></Link>


            <ReactPlayer
            controls
            height={700}
            width={1420}
            url={`https://www.youtube.com/watch?v=${ytvid.key}`} />
                
        </div>
    ) : <Notfound />
}

export default Trailer