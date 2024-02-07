import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom'
import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    HeroBg,
    VideoBg
 } from './MyProfileElements'
 import Video from '../../videos/video6.mp4'
 import { API_URL, createAxiosInstance, isAuthenticated} from '../../services/api';

const MyProfile = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [statePlants, setStatePlants] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPhone, setInputPhone] = useState('');
  const [inputCity, setInputCity] = useState('');
  const [currentUser, setCurrentUser] = useState({});



  useEffect(() => {
    
    let validate = isAuthenticated() ? null: navigate('/signin')
    getUserByToken();
    getUserPlants();
    const controller = new AbortController();
    const signal = controller.signal;

    return () => controller.abort()
  }, []);

  const getUserByToken = async () => {
    const path = '/users/getUserByToken';
    try {
      const axiosInstance = createAxiosInstance();
      const resp = await axiosInstance.get(path);
      if (resp.data.status === 'success') {
        setCurrentUser(resp.data.details);
        setInputName(resp.data.details.name);
        setInputEmail(resp.data.details.email);
        setInputPhone(resp.data.details.phone);
        setInputCity(resp.data.details.city);
        setState(resp.data.details)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUserPlants = async() =>{
    const path = '/users/getPlants';
    try {
      const axiosInstance = createAxiosInstance();
      const resp = await axiosInstance.get(path);
      if(resp.data.status === 'success'){
        setStatePlants(resp.data.details);
      }
    //   console.log(resp.data);
    } catch (error) {
      console.log(error);
    }
  }

  const updateApi = async (data) => {
    const path = '/users/updateUser';
    try {
      const axiosInstance = createAxiosInstance();
      const resp = await axiosInstance.patch(path, data);
      console.log(resp.data);
      alert('User details updated successfully!');
    } catch (error) {
      console.log(error);
      alert('Error updating user details.');
    }
  };

  const handleFetchData = async () => {
    const userData = {
      user_id: currentUser._id,
      name: inputName,
      email: inputEmail,
      phone: inputPhone,
      city: inputCity,
    };

    updateApi(userData);
  };

  return (
    <Container>
        <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
        </HeroBg>
        <FormWrap>
            <FormContent>
                <Form action="#">
                    <FormH1> My Gold </FormH1>
                     <FormLabel type='gold'> {state && state.newPlants.length * 10 + 50} </FormLabel>
                </Form>
            </FormContent>
        </FormWrap>
        <FormWrap onSubmit={(e) => {
          e.preventDefault();
          // handleFetchData();
        }}>
            <FormContent>
                <Form action="#">
                <FormH1> My Profile </FormH1>
            <FormLabel htmlFor='name'> Name </FormLabel>
            <FormInput
              id='name'
              defaultValue={inputName}
              autoComplete='on'
              onChange={(e) => setInputName(e.target.value)}
              required
            />
            <FormLabel htmlFor='email'> Email </FormLabel>
            <FormInput
              id='email'
              defaultValue={inputEmail}
              autoComplete='on'
              onChange={(e) => setInputEmail(e.target.value)}
              required
            />
            <FormLabel htmlFor='phone'> Phone </FormLabel>
            <FormInput
              id='phone'
              defaultValue={inputPhone}
              autoComplete='on'
              onChange={(e) => setInputPhone(e.target.value)}
              required
            />
            <FormLabel htmlFor='city'> City </FormLabel>
            <FormInput
              id='city'
              defaultValue={inputCity}
              autoComplete='on'
              onChange={(e) => setInputCity(e.target.value)}
              required
            />
            <FormButton type='submit' onClick={handleFetchData}>
              Save
            </FormButton>
                </Form>
            </FormContent>
        </FormWrap>
        <FormWrap>
            <FormContent>
                <Form action="#">
                    <FormH1> Plants I Added </FormH1>
                    <ul>
                      {statePlants.map((val) => (
                        <li key={val._id}>{val.name}</li>
                      ))}
                      </ul>
                      </Form>
            </FormContent>
        </FormWrap>
    </Container>
  )
}

export default MyProfile