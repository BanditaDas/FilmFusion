import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadperson, removeperson } from '../store/actions/personActions'
import Loading from './Loading'
import Horcards from './templates/Horcards'
import Dropdown from './templates/Dropdown'

function Pdets() {

  
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const [cat, setcat] = useState("movie")
  
  const { info } = useSelector(state => state.person)
  
  document.title = "PEOPLE | " + cat.toLocaleUpperCase()
  useEffect(() => {
    dispatch(asyncloadperson(id))
    return () => {
      dispatch(removeperson())
    }
  }, [id])
  





  return info ? (
    <div className="px-5 pb-10 w-full h-fit bg-zinc-900 flex flex-col">
      <nav className='w-full h-[10vh] text-zinc-300 flex gap-10 items-center text-2xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5 font-black"></Link>

      </nav>

      <div className="w-full flex px-10">

        <div className="w-fit">
          <img className='img shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path || info.detail.profile_path}`} alt="" />

          <hr className='mb-5 mt-10 border-none h-[1px] bg-zinc-500 ' />

          <div className="text-2xl text-zinc-500 flex gap-x-5 ">
            <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
              <i className="ri-earth-line hover:text-[#6556CD] font-black w-fit"></i>
            </a>
            {info.externalid.facebook_id &&
              <a target='_blank' href={`https://www.facebook.com/${info.externalid.facebook_id}`}>
                <i className="ri-facebook-circle-fill hover:text-[#6556CD] font-black "></i>
              </a>
            }
            {info.externalid.instagram_id &&
              <a target='_blank' href={`https://www.instagram.com/${info.externalid.instagram_id}`}>
                <i className="ri-instagram-line hover:text-[#6556CD] font-black "></i>
              </a>
            }
            {info.externalid.twitter_id &&
              <a target='_blank' href={`https://www.twitter.com/${info.externalid.twitter_id}`}>
                <i className="ri-twitter-x-fill hover:text-[#6556CD] font-black "></i>
              </a>
            }
            {info.externalid.youtube_id &&
              <a target='_blank' href={`https://www.youtube.com/${info.externalid.youtube_id}`}>
                <i className="ri-youtube-fill hover:text-[#6556CD] font-black "></i>
              </a>
            }
          </div>

          <h1 className='text-xl text-zinc-400 font-semibold mt-3'>Known for : {info.detail.known_for_department}</h1>
          <h1 className='text-xl text-zinc-400 font-semibold mt-3'>Birthday : {info.detail.birthday}</h1>

          {info.detail.deathday &&
            <h1 className='text-xl text-zinc-400 font-semibold mt-3'>Deathday : {info.detail.deathday}</h1>}

          <h1 className='text-xl text-zinc-400 font-semibold mt-3'> Gender : {info.detail.gender === 1 ? "Female" : "Male"}</h1>

        </div>

        <div className="w-[80%] ml-[5%]">
          <h1 className='text-5xl text-zinc-300 font-black mt-3'>{info.detail.name}</h1>

          <h1 className='text-lg text-zinc-400 font-semibold mt-5 mb-7'>{info.detail.biography}</h1>

          {info.combinedCredits.cast &&
            <Horcards data={info.combinedCredits.cast} />}

          <div className="w-full flex justify-between">
            <h1 className='mt-5 text-xl text-zinc-400 font-semibold'>
              Acting
            </h1>

            <Dropdown title="Catagory" options={["tv", "movie"]} func={(e) => setcat(e.target.value)} />
          </div>

          <div className="list-disc w-full h-[50vh] overflow-x-hidden overflow-y-auto shadow-lg shadow-[rgba(255,255,255,0.3)] mt-5 border-2 border-zinc-700 p-5 text-zinc-400">

            {info[cat + "Credits"].cast.map((c, i) => (
              <li key={i} className='hover:text-white duration-300 cursor-pointer p-5 rounded hover:bg-[#19191d]'>
                <Link to={`/${cat}/details/${c.id}`} className=''>
                  <span>
                    {c.name || c.title || c.original_name || c.original_title}
                  </span>
                  <span className='block ml-5'>Character Name : {c.character}</span>
                </Link>
              </li>
            ))}
          </div>

        </div>

      </div>


    </div>
  ) : <Loading />
}

export default Pdets