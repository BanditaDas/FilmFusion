import React, { lazy, useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// import Home from './components/Home'
import Home from './components/Home';
import Trending from './components/Trending';
import Popular from './components/Popular'
import Movie from './components/Movie'
import Tvshows from './components/Tvshows'
import People from './components/People'
import Mdets from './components/Mdets'
import Tdets from './components/Tdets'
import Pdets from './components/Pdets'
import Trailer from './components/templates/Trailer';
import Notfound from './components/Notfound';
import Loading from './components/Loading';
import axios from 'axios';
function App() {

  // const [isJioNetwork, setIsJioNetwork] = useState(false);
  // const [ipInfo, setIpInfo] = useState(null);

  // useEffect(() => {
  //   // Fetch the user's IP information using ipinfo.io
  //   const fetchIpInfo = async () => {
  //     try {
  //       const response = await axios.get(`https://ipinfo.io?token=ea196107a5fec5`);
  //       setIpInfo(response.data);
  //       console.log(response);
        

  //       // Check if the ISP is Jio
  //       if (response.data.org && response.data.org.toLowerCase().includes('jio')) {
  //         setIsJioNetwork(true);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching IP info:', error);
  //     }
  //   };

  //   fetchIpInfo();
  // }, []);

  return (
    <div className='bg-[#1F1E24] w-full h-screen flex'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/load' element={<Loading />} />
        <Route path='/trending' element={<Trending />} />
        <Route path='/popular' element={<Popular />} />
        <Route path='/movie' element={<Movie />} />
        <Route path='/movie/details/:id' element={<Mdets />} >
          <Route path='/movie/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/tv' element={<Tvshows />} />
        <Route path='/tv/details/:id' element={<Tdets />} >
          <Route path='/tv/details/:id/trailer' element={<Trailer />} />
        </Route>
        <Route path='/people' element={<People />} />
        <Route path='/people/details/:id' element={<Pdets />} />
        <Route path='*' element={<Notfound />} />
      </Routes>
    </div>
  )
}

export default App