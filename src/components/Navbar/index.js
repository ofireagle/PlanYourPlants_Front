import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { animateScroll as scroll } from 'react-scroll';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import {
    Nav,
    NavbarContainer,
    NavLogo,
    MobileIcon,
    NavMenu,
    NavItem,
    NavLinks
} from '../elements';
import { isAdmin } from '../../services/api';

const Navbar = ({ toggle }) => {

    const [scrollNav, setScrollNav] = useState(false);
    const [isAdminUser, setIsAdminUser] = useState(false);
    const navigate = useNavigate();
    const cookies = new Cookies();

    const changeNav = () => {
        if (window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', changeNav);
        checkAdmin();
        return () => {
            window.removeEventListener('scroll', changeNav);
        };
    }, []);

    const toggleHome = () => {
        scroll.scrollToTop();
    };

    const checkAdmin = async () => {
        try {
            const result = await isAdmin();
            setIsAdminUser(result); 
        } catch (error) {
            console.error('Error checking admin status:', error);
        }
    };

    const handleLogout = () => {
        cookies.remove('jwt');
        navigate('/');
    };

    return (
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
                            {isAdminUser && (
                                <NavItem>
                                    <NavLinks to="/adminDashboard">Admin</NavLinks>
                                </NavItem>
                             )}
                             <NavItem>
                             <NavLinks to="/" onClick={handleLogout}> Logout </NavLinks>
                            </NavItem>
                        </NavMenu>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    );
};

export default Navbar;