import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../utils/axios'
import Loading from "./Loading"
import Topnav from "./templates/Topnav"
import Dropdown from "./templates/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from "./templates/Cards"

function People() {
    const navigate = useNavigate()
    const [cat, setcat]= useState("popular")
    const [people, setpeople]= useState([])
    const [pg, setpg] = useState(1)
    const [hasMore, sethasMore] = useState(true)
    document.title = "PEOPLE | " + cat.toLocaleUpperCase()


    const GetPeople = async() => {
        try{
          const d = await axios.get(`/person/${cat}?page=${pg}`)
          
          if(d.data.results.length > 0 ){
            setpeople((prev) => [...prev, ...d.data.results])
            setpg(pg + 1)
          }else{
            sethasMore(false)
          }
        
        }catch(e){
          console.log(e);
        }
      }
    
      const refreshHandler = async()=>{
        if(people.length === 0){
          GetPeople()
        }else{
          setpg(1)
          setpeople([])
          GetPeople()
        }
      }
    
      useEffect(()=>{
        refreshHandler()
      },[cat])


  return people.length > 0 ? (
        <div className='h-fit w-screen bg-zinc-900'>
            <div className="px-5 w-full flex items-center">
                <h1 className=' w-[20vw] text-2xl text-zinc-400 font-semibold'>
                <i onClick={()=> navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5"></i>
                People</h1>
    
                
                <Topnav />
    
                
            </div>
    
            <InfiniteScroll
              dataLength={people.length}
              next={GetPeople}
              hasMore={hasMore}
              loader={<h1>Loading...</h1>}
            >
    
              <Cards data={people} title="people"/>
    
            </InfiniteScroll>
    
    
        </div>
      ) : <Loading />
}

export default People