import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

// import Home from './components/Home'
const Home = lazy(()=> import('./components/Home'));
const Trending = lazy(()=> import('./components/Trending'));
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
function App() {
  return (
    <div className='bg-[#1F1E24] w-full h-screen flex'>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/load' element={<Loading/>} />
        <Route path='/trending' element={<Trending/>} />
        <Route path='/popular' element={<Popular/>} />
        <Route path='/movie' element={<Movie/>} />
        <Route path='/movie/details/:id' element={<Mdets/>} >
          <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/tv' element={<Tvshows/>} />
        <Route path='/tv/details/:id' element={<Tdets/>} >
          <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/people' element={<People/>} />
        <Route path='/people/details/:id' element={<Pdets/>} />
        <Route path='*' element={<Notfound/>} />
      </Routes>
    </div>
  )
}

export default App