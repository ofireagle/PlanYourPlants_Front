import React, { useState } from 'react'
import DiscoverPlants from '../components/DiscoverPlants'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const DiscoverPlantsPage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        let abortController = new AbortController();
        setIsOpen(!isOpen);
        return () => {
            abortController.abort();
        }
    }
    
  return (
    <>
      <ScrollToTop/>
      <Sidebar isOpen={isOpen} toggle={toggle}/>
      <Navbar toggle={toggle}/>
      <DiscoverPlants/>
      <Footer/>
    </>
  )
}

export default DiscoverPlantsPage