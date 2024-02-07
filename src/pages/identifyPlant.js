import React, { useState } from 'react'
import IdentifyPlant from '../components/IdentifyPlant'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const IdentifyPlantPage = () => {
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
      <IdentifyPlant/>
      <Footer/>
    </>
  )
}

export default IdentifyPlantPage