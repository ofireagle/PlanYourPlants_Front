import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/api';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Cookies from 'universal-cookie';
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
    Text,
    TextDanger
 } from './SigninElements'

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const cookies = new Cookies();

    const onFormSubmit = async (data) => {
        const userExists = await login(data);
        if (userExists) {
          navigate('/todaysPlan');
        } else {
          alert('User does not exist!');
        }
      };
    
    
      const login = async (data) => {
        const url = API_URL + '/users/login';
        console.log(data);
        try {
          const response = await axios.post(url, data);
          const user = response.data.details;
          const token = response.data.token;
          const expiresDate = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000);
          const cookiesOptions = {
            path:'/',
            expires:expiresDate,
            secure:true,
            sameSite:'strict'
          }
          cookies.set('jwt', token, cookiesOptions)
          return true;
        } catch (error) {
          console.log(error);
          return false;
        }
      };
    
      const handlePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

    return (
        <Container>
            <FormWrap>
                <Icon to="/"> Plan your Plants </Icon>
                <FormContent>
                    <Form action="#" onSubmit={handleSubmit(onFormSubmit)}>
                        <FormH1> Sign in to your account </FormH1>
                        <FormLabel htmlFor='for'> Email </FormLabel>
                        <FormInput type='email' {...register("email", {
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                        })}/>
                        {errors.email && <TextDanger> Enter a valid email </TextDanger>}
                        <FormLabel htmlFor='for'> Password </FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            style={{ padding: '16px 16px',
                                marginBottom: '32px',
                                border: 'none',
                                borderRadius: '4px',
                                background: 'aliceblue',
                                height: '48.8px',
                                fontFamily: 'Encode Sans Expanded, sans-serif',
                                fontSize: '13.5px',
                                marginBottom: '0px' }}
                            {...register("password", { required: true, minLength: 8 })}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.password && <TextDanger> Enter at least 8 characters </TextDanger>}
                        <FormButton type='submit'> Continue </FormButton>
                        
                        <Text> <Link to='/forgotPassword' style={{ color: 'white', textDecoration: 'none'}}> Forgot password? </Link></Text>
                        <Text>
                        Don't have an account already?
                        <Link to='/Signup' style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold'}}> Register </Link>
                        </Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    )
}

export default SignIn