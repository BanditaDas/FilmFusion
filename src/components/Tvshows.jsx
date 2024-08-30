import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../utils/axios'
import Loading from "./Loading"
import Topnav from "./templates/Topnav"
import Dropdown from "./templates/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from "./templates/Cards"

function Tvshows() {
    const navigate = useNavigate()
    const [cat, setcat]= useState("airing_today")
    const [tvs, settvs]= useState([])
    const [pg, setpg] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "TV SHOWS | " + cat.toLocaleUpperCase()


    const GetTvs = async() => {
        try{
          const d = await axios.get(`/tv/${cat}?page=${pg}`)
          
          if(d.data.results.length > 0 ){
            settvs((prev) => [...prev, ...d.data.results])
            setpg(pg + 1)
          }else{
            sethasMore(false)
          }

        }catch(e){
          console.log(e);
        }
      }
    
      const refreshHandler = async()=>{
        if(tvs.length === 0){
          GetTvs()
        }else{
          setpg(1)
          settvs([])
          GetTvs()
        }
      }
    
    
      useEffect(()=>{
        refreshHandler()
      },[cat])


      return tvs.length > 0 ? (
        <div className='h-fit w-screen bg-zinc-900'>
            <div className="px-5 w-full flex items-center">
                <h1 className=' w-[20vw] text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=> navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5"></i>
                Tv Shows</h1>
    
                
                <Topnav />
    
                <Dropdown title="Category" options={["on_the _air","popular","top-rated","airing_today"]} func={(e)=> setcat(e.target.value)} />
                <div className="w-[2%]"></div>
                
            </div>
    
            <InfiniteScroll
              dataLength={tvs.length}
              next={GetTvs}
              hasMore={hasMore}
              loader={<h1>Loading...</h1>}
            >
    
              <Cards data={tvs} title="tv"/>
    
            </InfiniteScroll>
    
    
        </div>
      ) : <Loading />
}

export default Tvshows