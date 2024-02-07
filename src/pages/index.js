import React, { useState } from 'react'
import HomePage from '../components/Home'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import Services from '../components/Services'
import Footer from '../components/Footer'

const Home = () => {
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
            {/*<Sidebar isOpen={isOpen} toggle={toggle}/>
            <Navbar toggle={toggle}/>*/}
            <HomePage/>
            {/*<InfoSection {...homeObjOne}/>
            <InfoSection {...homeObjTwo}/>
            <Services/>
            <InfoSection {...homeObjThree}/>*/}
            <Footer/>
        </>
    )
}

export default Home