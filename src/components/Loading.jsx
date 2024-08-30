import React from 'react'
import load from '/loader.gif'
function Loading() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-[#1B1A3B]'>
      <img className='w-[30%] h-[40%] object-cover' src={load} alt="" />
    </div>
  )
}

export default Loading