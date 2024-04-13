import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll'
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements';

const Navbar = ({ toggle }) => {

    const [scrollNav, setScrollNav] = useState(false)

    const changeNav = () => {
        let abortController = new AbortController();
        if (window.scrollY >= 80) {
            setScrollNav(true)
        } else {
            setScrollNav(false)
        }

        //console.log(window)

        return () => {
            abortController.abort();
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', changeNav)
    }, [])

    // Function from react-scroll
    const toggleHome = () => {
        scroll.scrollToTop();
    }


    return (
        // Empty tags are simplified <React.Fragment>

        // NavLogo is a react router link, which means that
        // it needs to have its own version of href, which is 'to'

        // IconContext.Provider is useful to change color of all icons
        // within the context
        
        <>
            <IconContext.Provider value={{ color: '#fff' }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/" onClick={toggleHome}> Plan your Plants </NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLinks to="/myProfile"> My Profile </NavLinks>
                            </NavItem>
                            <NavItem>
                                <NavLinks to="/todaysPlan"> Today's Plan </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/discoverPlants"> Discover Plants </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/identifyPlant"> Identify Plant </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/updatePlan"> Update Plan </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/contact"> Contact </NavLinks>
                            </NavItem>
                            <NavItem>
                            <NavLinks to="/adminDashboard"> Admin </NavLinks>
                            </NavItem>
                        </NavMenu>
                        {/*<NavBtn>
                            <NavBtnLink to="/signIn"> Sign In</NavBtnLink>
                        </NavBtn>*/}
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;