import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ContainerProfile } from './MyProfileElements' 
import { FormWrap, FormContent, Form, FormH1, FormLabel, FormInput, FormButton, HeroBg, VideoBg, FormSelect } from '../elements';
import Video from '../../videos/video6.mp4';
import { createAxiosInstance, isAuthenticated } from '../../services/api';

const MyProfile = () => {
    const navigate = useNavigate();
    const [state, setState] = useState(null);
    const [statePlants, setStatePlants] = useState([]);
    const [inputName, setInputName] = useState('');
    const [inputEmail, setInputEmail] = useState('');
    const [inputPhone, setInputPhone] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedCity, setSelectedCity] = useState('');

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
                    setInputPhone(userResp.data.details.phone);
                    setSelectedCountry(userResp.data.details.country);
                    setSelectedCity(userResp.data.details.city); 
                    setState(userResp.data.details);
                    if (userResp.data.details.country) {
                        fetchCities(userResp.data.details.country);
                    }
                }

                // Fetch user plants
                const plantsResp = await axiosInstance.get('/users/getPlants');
                if (plantsResp.data.status === 'success') {
                    setStatePlants(plantsResp.data.details);
                }

                // Fetch countries
                const countriesResp = await axios.get("https://countriesnow.space/api/v0.1/countries");
                setCountries(countriesResp.data.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [navigate]);

    const fetchCities = async (country) => {
        const selectedCountryObj = countries.find(c => c.country === country);
        setCities(selectedCountryObj ? selectedCountryObj.cities : []);
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
          setSelectedCountry(country);
          fetchCities(country);
    };

    const handleFetchData = async () => {
        const userData = {
            user_id: currentUser._id,
            name: inputName,
            email: inputEmail,
            phone: inputPhone,
            city: selectedCity,
            country: selectedCountry
        };

        try {
            const axiosInstance = createAxiosInstance();
            const resp = await axiosInstance.patch('/users/updateUser', userData);
            console.log(resp.data);
            alert('User details updated successfully!');
        } catch (error) {
            console.log(error);
            alert('Error updating user details.', error);
        }
    };

    return (
        <ContainerProfile>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <FormWrap>
                <FormContent>
                    <Form action="#">
                        <FormH1> My Gold </FormH1>
                        <FormLabel type='gold'> {state && state.newPlants && state.newPlants.length > 0 ? state.newPlants.length * 10 + 50 : 0} </FormLabel>
                    </Form>
                </FormContent>
            </FormWrap>
            <FormWrap>
                <FormContent>
                    <Form action="#">
                        <FormH1> My Profile </FormH1>
                        <FormLabel htmlFor='name'> Name </FormLabel>
                        <FormInput
                            id='name'
                            value={inputName}
                            autoComplete='on'
                            onChange={(e) => setInputName(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor='email'> Email </FormLabel>
                        <FormInput
                            id='email'
                            value={inputEmail}
                            autoComplete='on'
                            onChange={(e) => setInputEmail(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor='phone'> Phone </FormLabel>
                        <FormInput
                            id='phone'
                            value={inputPhone}
                            autoComplete='on'
                            onChange={(e) => setInputPhone(e.target.value)}
                            required
                        />
                        <FormLabel htmlFor='country'> Country </FormLabel>
                        <FormSelect
                            id='country'
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            required
                        >
                            <option value="">Select Country</option>
                            {countries.map(country => (
                                <option key={country.country} value={country.country}>
                                    {country.country}
                                </option>
                            ))}
                        </FormSelect>
                        <FormLabel htmlFor='city'> City </FormLabel>
                        <FormSelect
                            id='city'
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            required
                        >
                            <option value="">{selectedCity || "Select City"}</option>
                            {cities.map(city => (
                                <option key={city} value={city}>
                                    {city}
                                </option>
                            ))}
                        </FormSelect>
                        <FormButton type='button' onClick={handleFetchData}>
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
                            {statePlants.map(val => (
                                <li key={val._id}>{val.name}</li>
                            ))}
                        </ul>
                    </Form>
                </FormContent>
            </FormWrap>
        </ContainerProfile>
    );
};

export default MyProfile;