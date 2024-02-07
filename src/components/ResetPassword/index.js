import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/api';
import { Input, InputAdornment, IconButton } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import {
    Container,
    FormWrap,
    Icon,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormButton,
    TextDanger
 } from './ResetPasswordElements'

const ResetPassword = () => {
    const { register, getValues, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onFormSubmit = (data) => {
      resetPassword(data);
    };

    const resetPassword = async (data) => {
      const url = `${API_URL}/users/resetPassword/${token}`;
      console.log(url);
      try {
        const response = await axios.patch(url, data);
        console.log(response);
        alert('Password changed successfully');
        navigate('/');
      } catch (error) {
        console.log(error);
        alert('Something went wrong, try again later')
      }
    };

    register("password", {
      required: true,
      minLength: 8,
      pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/
    });

    const confirmPasswordRef = register("passwordConfirm", {
      required: true,
      validate: (value) => value === getValues("password")
    });

    const handlePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    const handleConfirmPasswordVisibility = () => {
      setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <Container>
            <FormWrap>
                <Icon to="/"> Plan your Plants </Icon>
                <FormContent>
                    <Form action="#" onSubmit={handleSubmit(onFormSubmit)}>
                        <FormH1> Reset Password </FormH1>
                        <FormLabel htmlFor='for'> Password </FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            style={{ padding: '16px 16px',
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
                        {errors.password && <TextDanger> Enter at least 8 characters and one special character </TextDanger>}

                        <FormLabel htmlFor='for'> Confirm Password </FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            style={{ padding: '16px 16px',
                                border: 'none',
                                borderRadius: '4px',
                                background: 'aliceblue',
                                height: '48.8px',
                                fontFamily: 'Encode Sans Expanded, sans-serif',
                                fontSize: '13.5px',
                                marginBottom: '0px' }}
                                {...confirmPasswordRef}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton onClick={handleConfirmPasswordVisibility}>
                                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                        />
                        {errors.passwordConfirm && <TextDanger> Passwords must match </TextDanger>}
                        
                        <FormButton type='submit'> Reset </FormButton>
                        
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    )
}

export default ResetPassword