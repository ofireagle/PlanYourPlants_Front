import React, { useState } from 'react'
import UpdatePlan from '../components/UpdatePlan'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const UpdatePlanPage = () => {
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
      <UpdatePlan/>
      <Footer/>
    </>
  )
}

export default UpdatePlanPage