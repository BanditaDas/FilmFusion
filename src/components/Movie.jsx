import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../utils/axios'
import Loading from "./Loading"
import Topnav from "./templates/Topnav"
import Dropdown from "./templates/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from "./templates/Cards"

function Movie() {
    const navigate = useNavigate()
    const [cat, setcat]= useState("now_playing")
    const [mov, setmov]= useState([])
    const [pg, setpg] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "MOVIES | " + cat.toLocaleUpperCase()


    const GetMov = async() => {
        try{
          const d = await axios.get(`/movie/${cat}?page=${pg}`)
          
          if(d.data.results.length > 0 ){
            setmov((prev) => [...prev, ...d.data.results])
            setpg(pg + 1)
          }else{
            sethasMore(false)
          }

        }catch(e){
          console.log(e);
        }
      }
    
      const refreshHandler = async()=>{
        if(mov.length === 0){
          GetMov()
        }else{
          setpg(1)
          setmov([])
          GetMov()
        }
      }
    
    
      useEffect(()=>{
        refreshHandler()
      },[cat])

    return mov.length > 0 ? (
        <div className='h-fit w-screen bg-zinc-900'>
            <div className="px-5 w-full flex items-center">
                <h1 className='text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=> navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5"></i>
                Movies</h1>
    
                
                <Topnav />
    
                <Dropdown title="Category" options={["popular","top_rated","upcoming","now_playing"]} func={(e)=> setcat(e.target.value)} />
                <div className="w-[2%]"></div>
                
            </div>
    
            <InfiniteScroll
              dataLength={mov.length}
              next={GetMov}
              hasMore={hasMore}
              loader={<h1>Loading...</h1>}
            >
    
              <Cards data={mov} title="movie"/>
    
            </InfiniteScroll>
    
    
        </div>
      ) : <Loading />
}

export default Movie