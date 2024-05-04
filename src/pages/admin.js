import React, { useState } from 'react'
import Admin from '../components/Admin/index'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const AdminPage = () => {
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
      <Admin/>
      <Footer/>
    </>
  )
}

export default AdminPage