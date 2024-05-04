import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/api';
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
    TextDanger
 } from '../elements'

const ForgotPassword = () => {
    const{register, handleSubmit, formState :{errors}} = useForm();
    const navigate = useNavigate();

    const onFormSubmit = (data) => {
        console.log(data);
        forgotPassword(data);
      };
      
    const forgotPassword = async (data) => {
        const url = API_URL + '/users/forgotPassword';
        try {
          const response = await axios.post(url, data);
          console.log(response);
          data=data.email
          // Redirect to a success page or display a success message
          navigate('/SuccessPage', {state:{email:data}});
        } catch (error) {
          console.log(error);
          // Display an error message or handle the error case
        }
      };
      

    const emailRef = register("email",{
        required:true,  
        pattern:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
    });

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          handleSubmit(onFormSubmit)();
        }
      };

    return (
        <Container>
            <FormWrap>
                <Icon to="/"> Plan your Plants </Icon>
                <FormContent>
                    <Form action="#" onSubmit={handleSubmit(onFormSubmit)}>
                        <FormH1> Forgot Password </FormH1>
                        <FormLabel htmlFor='for'> Email </FormLabel>
                        <FormInput type='email' {...emailRef}/>
                        {errors.email && <TextDanger> Enter a valid email </TextDanger>}
                        
                        <FormButton type='submit'> Send </FormButton>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    )
}

export default ForgotPassword