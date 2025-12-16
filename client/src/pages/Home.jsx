import React from 'react'
import Hero from '../components/home/Hero'
import ActivitiesCarousel from '../components/home/ActivitiesCarousel'

const Home = () => {
  return (
    <div className='w-full overflow-x-hidden'>
        <Hero />
        <ActivitiesCarousel />
    </div>
  )
}

export default Home