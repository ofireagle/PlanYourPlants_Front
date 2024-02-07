import React from 'react'
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
 } from './ContactElements'
 import emailjs from 'emailjs-com';
 import Video from '../../videos/video1.mp4'

const Contact = () => {
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
                    <FormInput name="from_name" required/>
                    <FormLabel htmlFor='for'> Mail </FormLabel>
                    <FormInput name="from_email" required/>
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