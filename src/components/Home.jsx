import React, { useEffect, useState } from 'react'
import Sidenav from './templates/Sidenav'
import Topnav from './templates/Topnav'
import Horcards from './templates/Horcards'
import axios from '../utils/axios'
import Header from './templates/Header'
import Dropdown from './templates/Dropdown'
import Loading from './Loading'

function Home() {
    document.title = "| HOME |"

    const [wallpaper, setwallpaper] = useState(null)
    const [ternd, setternd] = useState(null)
    const [cat, setcat] = useState("all")

    const Getwall = async() => {
      try{
        const d = await axios.get(`/trending/all/day`)
        let rd = d.data.results[(Math.random()* d.data.results.length).toFixed()]
        setwallpaper(rd)
      }catch(e){
        console.log(e);
      }
    }


    const Gettred = async() => {
      try{
        const d = await axios.get(`/trending/${cat}/day`)
        setternd(d.data.results)
      }catch(e){
        console.log(e);
      }
    }

    useEffect(()=>{
      !wallpaper && Getwall();
      Gettred()
    },[cat])

  return wallpaper && ternd ? (
    <>
        <Sidenav />
        <div className="w-[80%] h-full overflow-x-hidden overflow-auto">
          <Topnav />
          <Header data={wallpaper} />


          <div className="mb-5 flex justify-between items-center px-5 pt-4">
            <h1 className=' text-2xl font-semibold text-zinc-400'>Trending</h1>

              <Dropdown title="Filter" options={["tv","movie", "all"]} func={(e)=> setcat(e.target.value)} />
          </div>


          <Horcards data={ternd} />
        </div>
    </>
  ) : <Loading/>
}

export default Home