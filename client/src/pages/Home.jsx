import React from 'react'
import Hero from '../components/home/Hero'
import Navbar from '../components/home/Navbar'

const Home = () => {
  return (
    <div className='h-screen'>
        <Navbar /> 
        <Hero />
        <div className='h-screen'></div>
        <div className='h-screen'></div>
    </div>
  )
}

export default Home