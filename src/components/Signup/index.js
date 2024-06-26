import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
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
    FormInput,
    FormButton,
    Text,
    FormSelect,
    TextDanger1
 } from '../elements'
 import Cookies from 'universal-cookie';

const SignUp = () => {
  const { register, getValues, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  let [countries, setCountries] = useState([]);
  let [Cities, setCities] = useState([]);
  const cookies = new Cookies();

  const fetchCountries = async () => {
    let country = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );
    setCountries(country.data.data);
  };
  const fetchCities = (country) => {
    const Cities = countries.find((c) => c.country === country);
    setCities(Cities.cities);
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const onFormSubmit = async (data) => {
   const newUser = await signUp(data);
    if (newUser) {
      navigate('/myProfile');
    } else {
      alert('Wrong Data!');
    }
  }

  const signUp = async (data) => {
      const url = API_URL + '/users/SignUp';
      try {
        const response = await axios.post(url, data);
        const newUser = response.data.details;
        const token = response.data.token;
        const cookiesOptions = {
          path:'/',
          expires:0,
          secure:true,
          sameSite:'strict'
        }
        cookies.set('jwt', token, cookiesOptions)
        return true;
      } catch (error) {
          console.log(error);
          return false;
      }
  }

  const emailRef = register("email", {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  });

  const passwordRef = register("password", {
    required: true,
    minLength: 8,
    pattern: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/
  });

  const confirmPasswordRef = register("passwordConfirm", {
    required: true,
    validate: (value) => value === getValues("password")
  });

  const phoneRef = register("phone", {
    required: true,
    pattern: /^05\d{8}$/i
  });

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

    return (
        <Container>
            <FormWrap >
                <Icon to="/"> Plan your Plants </Icon>
                <FormContent>
                    <Form action="#" onSubmit={handleSubmit(onFormSubmit)}>
                        <FormH1> Sign up your profile </FormH1>
                        <FormLabel htmlFor='for'> Name </FormLabel>
                        <FormInput type='name' {...register('name', {
                            required: true,
                            minLength: 3
                        })}/>
                        {errors.name && <TextDanger1> Name must be a minimum of 3 letters </TextDanger1>}

                        <FormLabel htmlFor='for'> Email </FormLabel>
                        <FormInput type='email' {...emailRef}/>
                        {errors.email && <TextDanger1> Enter a valid email </TextDanger1>}

                        <FormLabel htmlFor='for'> Password </FormLabel>
                        <Input
                            type={showPassword ? "text" : "password"}
                            style={{ 
                              padding: '16px 16px',
                              marginBottom: '32px',
                              border: 'none',
                              borderRadius: '4px',
                              background: 'field',
                              height: '48.8px',
                              fontFamily: 'Encode Sans Expanded, sans-serif',
                              fontSize: '13.5px'
                              }}
                            {...register("password", { required: true, minLength: 8 })}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton onClick={handlePasswordVisibility}>
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                        {errors.password && <TextDanger1> Enter at least 8 characters (including letters) and one special character </TextDanger1>}

                        <FormLabel htmlFor='for'> Confirm Password </FormLabel>
                        <Input
                            type = {showPassword ? "text" : "password"}
                            style = {{ 
                              padding: '16px 16px',
                              marginBottom: '32px',
                              border: 'none',
                              borderRadius: '4px',
                              background: 'field',
                              height: '48.8px',
                              fontFamily: 'Encode Sans Expanded, sans-serif',
                              fontSize: '13.5px'
                              }}
                            {...confirmPasswordRef}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton onClick={handleConfirmPasswordVisibility}>
                                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            }
                        />
                        {errors.passwordConfirm && <TextDanger1> Passwords must match </TextDanger1>}

                        <FormLabel htmlFor='for'> Country </FormLabel>
                        {countries && (
                        <FormSelect type='country' {...register("country", {
                            required: true,
                            minLength: 2
                          })} onChange={(e) => fetchCities(e.target.value)} defaultValue={null}>
                            <option value={null} hidden disabled>
                            Select your country
                          </option>
                            {countries.map((country) => (
                              <option key={`${country.country}`} value={country.country}>
                                {country.country}
                              </option>
                            ))}
                        </FormSelect>
                        )}
                        {errors.country && <TextDanger1> Enter a valid country </TextDanger1>}
                        
                        <FormLabel htmlFor='for'> City </FormLabel>
                        {Cities && (
                        <FormSelect type='city' {...register("city", {
                            required: true,
                            minLength: 2
                        })} defaultValue={null}>
                          <option value={null} hidden disabled>
                            Select your city
                            </option>
                          {Cities.map((city) => (
                            <option key={`${city}`} value={city}>
                              {city}
                            </option>
                          ))}
                        </FormSelect>)} 
                        {errors.city && <TextDanger1> Enter a valid city </TextDanger1>}

                        <FormLabel htmlFor='for'> Phone  </FormLabel>
                        <FormInput type='phone' {...phoneRef}/>
                        {errors.phone && <TextDanger1> Enter a valid phone number </TextDanger1>}

                        <FormButton type='submit'> Register </FormButton>
                        
                        <Text>
                        Already have an account?
                        <Link to='/' style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold'}}> Sign In </Link>
                        </Text>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
    )
}

export default SignUp