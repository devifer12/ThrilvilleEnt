import React from 'react'
import Hero from '../components/home/Hero'
import ActivitiesCarousel from '../components/home/ActivitiesCarousel'
import SocialFeed from '../components/home/SocialFeed'

const Home = () => {
  return (
    <div className='w-full overflow-x-hidden'>
        <Hero />
        <ActivitiesCarousel />
        <SocialFeed />
    </div>
  )
}

export default Home