import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    HeroBg,
    VideoBg
 } from './UpdatePlanElements'
 import Video from '../../videos/video2.mp4'
 import { createAxiosInstance, isAuthenticated } from '../../services/api'

const UpdatePlan = () => {
    const navigate = useNavigate();
    
    useEffect(() =>{
        let validate = isAuthenticated() ? null: navigate('/signin')
    },[])

  return (
    <Container>
        <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
        </HeroBg>
        <FormWrap>
            <FormContent>
                <Form action="#">
                    <FormH1> Update Plan </FormH1>
                    <FormInput type='email' required/>
                    <FormInput type='password' required/>
                    <FormButton type='submit'> Update </FormButton>
                </Form>
            </FormContent>
        </FormWrap>
    </Container>
  )
}

export default UpdatePlan