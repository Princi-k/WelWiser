import React from 'react'
import MidBox from './MidBox'
import Features from './Features'
import Aiadvisor from './Aiadvisor'
import Insights from './Insights'
import Footer from './Footer'

const Home = () => {
  return (
    <div className="bg-transparent">
      <MidBox />
      <Features />
      <Aiadvisor />
      <Insights />
      <Footer />
    </div>
  )
}

export default Home
