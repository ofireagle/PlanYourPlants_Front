import React, { useState } from 'react'
import Contact from '../components/Contact'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import Home from '../components/Home'

const ContactPage = () => {
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
      <Contact/>
      <Footer/>
    </>
  )
}

export default ContactPage