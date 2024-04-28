import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Video from '../../videos/video.mp4';
import {
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
} from './HomeElement';
import { Button } from '../ButtonElement';
import { isAuthenticated } from '../../services/api';

const HeroSection = () => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const onHover = () => {
        setHover(!hover);
    };

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/todaysPlan');
        }
    }, [navigate]);

    return (
        <HeroContainer id="home">
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
            </HeroBg>
            <HeroContent>
                <HeroH1> Plan Your Plants </HeroH1>
                <HeroP> 
                    Sign up for a new account today and receive 
                    free access to the world's first plants planning.
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                        to="/signIn" 
                        onMouseEnter={onHover} 
                        onMouseLeave={onHover}
                        primary="true"
                        dark="true"
                        smooth={true}
                        duration={500}
                        spy={true}
                        activeClass='active'
                        exact='true'
                        > 
                        Get started 
                        {hover ? <ArrowForward/> : <ArrowRight/>} 
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    );
};

export default HeroSection;
