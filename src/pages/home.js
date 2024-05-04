import React, { useState } from 'react'
import HomePage from '../components/Home'
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
            <HomePage/>
            <Footer/>
        </>
    )
}

export default Home