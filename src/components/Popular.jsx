import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from '../utils/axios'
import Loading from "./Loading"
import Topnav from "./templates/Topnav"
import Dropdown from "./templates/Dropdown"
import InfiniteScroll from "react-infinite-scroll-component"
import Cards from "./templates/Cards"



function Popular() {
  const navigate = useNavigate()
  const [cat, setcat] = useState("movie")
  const [pop, setpop] = useState([])
  const [pg, setpg] = useState(1)
  const [hasMore, sethasMore] = useState(true)
  document.title = "POPULAR | " + cat.toLocaleUpperCase()


  const GetPop = async () => {
    try {
      const d = await axios.get(`${cat}/popular?page=${pg}`)

      if (d.data.results.length > 0) {
        setpop((prev) => [...prev, ...d.data.results])
        setpg(pg + 1)
      } else {
        sethasMore(false)
      }

    } catch (e) {
      console.log(e);
    }
  }

  const refreshHandler = async () => {
    if (pop.length === 0) {
      GetPop()
    } else {
      setpg(1)
      setpop([])
      GetPop()
    }
  }


  useEffect(() => {
    refreshHandler()
  }, [cat])

  return pop.length > 0 ? (
    <div className='h-screen w-screen'>
      <div className="px-5 w-full flex items-center">
        <h1 className='text-2xl text-zinc-400 font-semibold'>
          <i onClick={() => navigate(-1)} className="hover:text-[#6556CD] ri-arrow-left-line mr-5"></i>
          Popular</h1>


        <Topnav />

        <Dropdown title="Category" options={["movie", "tv"]} func={(e) => setcat(e.target.value)} />
        <div className="w-[2%]"></div>

      </div>

      <InfiniteScroll
        dataLength={pop.length}
        next={GetPop}
        hasMore={hasMore}
        loader={<h1>Loading...</h1>}
      >

        <Cards data={pop} title={cat} />

      </InfiniteScroll>


    </div>
  ) : <Loading />
}


export default Popular