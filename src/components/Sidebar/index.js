import React from 'react'
import {
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink
} from './SidebarElements'

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon/>
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="/myProfile"> My Profile </SidebarLink>
                <SidebarLink to="/todaysPlan" onClick={toggle}> Today's Plan </SidebarLink>
                <SidebarLink to="/discoverPlants" onClick={toggle}> Discover Plants </SidebarLink>
                <SidebarLink to="/identifyPlant" onClick={toggle}> Identify Plant </SidebarLink>
                <SidebarLink to="/updatePlan" onClick={toggle}> Update Plan </SidebarLink>
                <SidebarLink to="/contact" onClick={toggle}> Contact </SidebarLink>
            </SidebarMenu>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar