import { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Topnav from './templates/Topnav'
import Dropdown from './templates/Dropdown'
import axios from '../utils/axios'
import Cards from './templates/Cards'
import Loading from "./Loading";
import InfiniteScroll from 'react-infinite-scroll-component';


function Trending() {
  const navigate = useNavigate()
  const [cat, setcat]= useState("all")
  const [duration, setduration]= useState("day")
  const [trend, setternd]= useState([])
  const [pg, setpg] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "TRENDING | " + cat.toLocaleUpperCase()


  const Gettred = async() => {
    try{
      const d = await axios.get(`/trending/${cat}/${duration}?page=${pg}`)
      
      if(d.data.results.length > 0 ){
        setternd((prev) => [...prev, ...d.data.results])
        setpg(pg + 1)
      }else{
        sethasMore(false)
      }

    }catch(e){
      console.log(e);
    }
  }

  const refreshHandler = async()=>{
    if(trend.length === 0){
      Gettred()
    }else{
      setpg(1)
      setternd([])
      Gettred()
    }
  }


  useEffect(()=>{
    refreshHandler()
  },[cat, duration])

  return trend.length > 0 ? (
    <div className=' w-screen bg-zinc-900 h-fit'>
        <div className="px-5 w-full flex items-center">
            <h1 className='text-2xl text-zinc-400 font-semibold'>
            <i onClick={()=> navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5"></i>
            Trending</h1>

            
            <Topnav />

            <Dropdown title="Category" options={["movie","tv", "all"]} func={(e)=> setcat(e.target.value)} />
            <div className="w-[2%]"></div>
            
            <Dropdown title="Duration" options={["week","day"]} func={(e)=> setduration(e.target.value)} />
        </div>

        <InfiniteScroll
          dataLength={trend.length}
          next={Gettred}
          hasMore={hasMore}
          loader={<h1>Loading...</h1>}
        >

          <Cards data={trend} title={cat}/>

        </InfiniteScroll>


    </div>
  ) : <Loading />
}

export default Trending