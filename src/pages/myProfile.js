import React, { useState } from 'react'
import MyProfile from '../components/MyProfile'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const MyProfilePage = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle1 = () => {
        let abortController = new AbortController();
        setIsOpen(!isOpen);
        return () => {
            abortController.abort();
        }
    }
    return (
        <>
            <ScrollToTop/>
            <Sidebar isOpen={isOpen} toggle={toggle1}/>
            <Navbar toggle={toggle1}/>
            <MyProfile/>
            <Footer/>
        </>
    )
}

export default MyProfilePage