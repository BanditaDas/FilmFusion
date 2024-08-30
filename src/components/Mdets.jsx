import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import { asyncloadmovie, removemovie } from '../store/actions/movieActions'
import Loading from './Loading'
import Horcards from './templates/Horcards'
import Cards from './templates/Cards'

function Mdets() {
  
  const { pathname } = useLocation()
  
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  
  const { info } = useSelector(state => state.movie)
  useEffect(() => {
    dispatch(asyncloadmovie(id))
    return () => {
      dispatch(removemovie())
    }
  }, [id])



  return info ? (
    <div style={{
      background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,0.7)), 
      url(https://image.tmdb.org/t/p/original/${info.detail.backdrop_path || info.detail.poster_path })`,
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
      className='w-full h-fit px-5 '>

      <Link to={`${pathname}/trailer`} className="icon h-14 w-14 bg-[#6556CD] absolute top-[35%] left-[10%] text-white flex items-center justify-center rounded-full text-2xl ">
        <i className="ri-play-large-fill pl-1 "></i>
      </Link>

      <nav className='w-full h-[10vh] text-zinc-300 flex gap-10 items-center text-2xl'>
        <Link onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5 font-black"></Link>

        <a target='_blank' href={info.detail.homepage}>
          <i className="ri-links-line hover:text-[#6556CD] font-black"></i>
        </a>
        <a target='_blank' href={`https://www.wikidata.org/wiki/${info.externalid.wikidata_id}`}>
          <i className="ri-earth-line hover:text-[#6556CD] font-black "></i>
        </a>
        <a target='_blank' className='hover:text-[#6556CD] font-black ' href={`https://www.imdb.com/title/${info.externalid.imdb_id}/`}>imdb</a>

      </nav>

      <div className="w-full p-10 flex gap-10">
        <img className='img shadow-[8px_17px_38px_2px_rgba(0,0,0,.5)] h-[50vh] object-cover rounded-lg' src={`https://image.tmdb.org/t/p/original/${info.detail.poster_path || info.detail.backdrop_path || info.detail.profile_path}`} alt="" />

        <div className="content">
          <h1 className='text-5xl font-semibold text-white'>{info.detail.name || info.detail.original_name || info.detail.original_title || info.detail.title}

            <small className='text-2xl text-zinc-300 ml-2'>({info.detail.release_date.split("-")[0]})</small>
          </h1>

          <p className='text-white text-md mt-2'>{info.detail.overview}</p>

          <h1 className='text-zinc-100 text-2xl font-semibold italic mt-3'>{info.detail.tagline}</h1>

          <div className="flex items-center text-zinc-100 gap-5 mt-5 ">
            <span className=" bg-[#6556CD] text-sm font-semibold text-white w-[5vh] h-[5vh] flex justify-center items-center rounded-full scale-[1.3]">
              {(info.detail.vote_average * 10).toFixed()}%
            </span>

            <h1>{info.detail.release_date}</h1>
            <h1>{info.detail.genres.map((g) => g.name).join(", ")}</h1>
            <h1>{info.detail.runtime}min</h1>
          </div>

          <h1 className='text-white text-xl mt-2'>Language</h1>

          <p className='text-white text-md mt-2'>{info.translations.join(", ")}</p>


        </div>
      </div>

      <div className='w-[80%] px-10 mb-10'>
        <div className="mt-5 flex flex-col gap-10">

          {info.watchproviders && info.watchproviders.flatrate && <div className='flex gap-10 items-center'>

            <h1 className='text-white text-2xl w-[17%]'>Available on Platform</h1>
            {info.watchproviders.flatrate.map((w, i) => <img title={w.provider_name} className='w-[7vh] h-[7vh] object-fit rounded-xl' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />)}

          </div>}


          {info.watchproviders && info.watchproviders.rent && <div className='flex gap-10 items-center'>

            <h1 className='text-white text-2xl w-[17%]'>Available on rent</h1>
            {info.watchproviders.rent.map((w, i) => <img title={w.provider_name} className='w-[7vh] h-[7vh] object-fit rounded-xl' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />)}

          </div>}


          {info.watchproviders && info.watchproviders.buy && <div className='flex gap-10 items-center'>

            <h1 className='text-white text-2xl w-[17%]'>Available to Buy</h1>
            {info.watchproviders.buy.map((w, i) => <img title={w.provider_name} className='w-[7vh] h-[7vh] object-fit rounded-xl' key={i} src={`https://image.tmdb.org/t/p/original/${w.logo_path}`} alt="" />)}

          </div>}
        </div>
      </div>

      <hr className='mb-5 border-none h-[1px] bg-zinc-500'/>



      <Cards data={info.credits} title="people"/>

      <hr className='mb-5 mt-10 border-none h-[1px] bg-zinc-500'/>

      <h1 className='text-3xl font-semibold text-white pl-5 mb-10 mt-10'>Recommendations & Similer</h1>

      <Horcards data={info.recommendations.length > 0 ? info.recommendations : info.similer} />

        <Outlet />

    </div>
  ) : <Loading />
}

export default Mdets