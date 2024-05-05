import { createAxiosInstance, isAuthenticated } from '../../services/api';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Container,
    FormWrap,
    FormInputMessage,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    HeroBg,
    VideoBg
 } from '../elements'
 import emailjs from 'emailjs-com';
 import Video from '../../videos/video1.mp4'

const Contact = () => {
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useState({});
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!isAuthenticated()) {
                    navigate('/signin');
                    return;
                }

                const axiosInstance = createAxiosInstance();

                // Fetch user data
                const userResp = await axiosInstance.get('/users/getUserByToken');
                if (userResp.data.status === 'success') {
                    setCurrentUser(userResp.data.details);
                    setInputName(userResp.data.details.name);
                    setInputEmail(userResp.data.details.email);
                }
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [navigate]);
    
      const getUserByToken = async () => {
        const path = '/users/getUserByToken';
        try {
          const axiosInstance = createAxiosInstance();
          const resp = await axiosInstance.get(path);
          if (resp.data.status === 'success') {
            return resp.data.details
          }
        } catch (error) {
          console.log(error);
          return null
        }
      };

    function sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_dlw7w4m', 'template_ohfk6p9', e.target, 'LESwsBuXd3NeQug1W')
          .then((result) => {
              window.location.reload() 
          }, (error) => {
              console.log(error.text);
          });
      }
  return (
    <Container>
        <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
        </HeroBg>
        <FormWrap>
            <FormContent>
                <Form action="#" onSubmit={sendEmail}>
                    <FormH1> Contact </FormH1>
                    <FormLabel htmlFor='for'> Name </FormLabel>
                    <FormInput name="from_name" value={inputName} onChange={(e) => setInputName(e.target.value)} required/>
                    <FormLabel htmlFor='for'> Mail </FormLabel>
                    <FormInput name="from_email" value={inputEmail} onChange={(e) => setInputName(e.target.value)} required/>
                    <FormLabel htmlFor='for'> Subject </FormLabel>
                    <FormInput name="subject" required/>
                    <FormLabel htmlFor='for'> Message </FormLabel>
                    <FormInputMessage name="message" required/>
                    <FormButton type='submit'> Send </FormButton>
                </Form>
            </FormContent>
        </FormWrap>
    </Container>
  )
}

export default Contact