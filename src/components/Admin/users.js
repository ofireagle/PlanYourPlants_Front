import React, { useState, useEffect } from 'react';
import { FormTable, FormTd, FormTh, FormTr, FormThead, FormTbody, CardContainer, Card, CardTitle, CardCloseButton, InputLabel, InputField, CardButton, SelectField, Option } from './AdminPanelElements';
import { createAxiosInstance, API_URL } from '../../services/api';
import axios from 'axios';

const Users = ({ data }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);
    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const fetchCountries = async () => {
        try {
            const response = await axios.get("https://countriesnow.space/api/v0.1/countries");
            setCountries(response.data.data);
        } catch (error) {
            console.error('Error fetching countries:', error);
        }
    };

    const fetchCities = (country) => {
        const selectedCountry = countries.find(c => c.country === country);
        if (selectedCountry) {
            setCities(selectedCountry.cities);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

    const openCard = (user) => {
        setSelectedUser(user);
        setEditedUser({ ...user });
        if (user.country) {
            fetchCities(user.country);
        }
    };

    const closeCard = () => {
        setSelectedUser(null);
        setEditedUser(null);
    };

    const handleCardClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCard();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const modifyUser = async () => {
        const url = API_URL + '/users/updateUser';
        let userID = editedUser._id;
        editedUser["userID"] = userID
        //console.log("Edit user object");
        //console.log(editedUser);
        try {
            const axiosInstance = createAxiosInstance();
            const resp = await axiosInstance.patch(url, editedUser);
            //console.log('Response -> ', resp);
            if (resp.status === 200 && resp.data.status === "success") {
                alert('User updated successfully!');
                setSelectedUser(null);
                setEditedUser(null);
                window.location.reload();
            }
        } catch (error) {
            console.log('Error on update user ', error);
        }
    };

    const deleteUser = async () => {
        const url = API_URL + `/users/${selectedUser._id}`;
        try {
            const resp = await axios.delete(url);
            const data = resp.data;
            if (data.status === "success") {
                alert(data.data);
                setSelectedUser(null);
                window.location.reload();
            }
        } catch (error) {
            console.log(`Error deleting user ${error}`);
        }
    };

    return (
        <div>
            <FormTable>
                <FormThead>
                    <FormTr>
                        <FormTh>Name</FormTh>
                        <FormTh>Email</FormTh>
                        <FormTh>Phone</FormTh>
                        <FormTh>City</FormTh>
                    </FormTr>
                </FormThead>
                <FormTbody>
                    {data.map((user, index) => (
                        <FormTr key={index} onClick={() => openCard(user)}>
                            <FormTd>{user.name}</FormTd>
                            <FormTd>{user.email}</FormTd>
                            <FormTd>{user.phone}</FormTd>
                            <FormTd>{user.city}</FormTd>
                        </FormTr>
                    ))}
                </FormTbody>
            </FormTable>
            {selectedUser && (
                <CardContainer onClick={handleCardClick}>
                    <Card>
                        <CardCloseButton onClick={closeCard}>×</CardCloseButton>
                        <CardTitle>User Details</CardTitle>
                        <InputLabel>Name:</InputLabel>
                        <InputField
                            type="text"
                            name="name"
                            value={editedUser.name || ''}
                            onChange={handleInputChange}
                        />
                        <InputLabel>Email:</InputLabel>
                        <InputField
                            type="email"
                            name="email"
                            value={editedUser.email || ''}
                            onChange={handleInputChange}
                        />
                        <InputLabel>Phone:</InputLabel>
                        <InputField
                            type="text"
                            name="phone"
                            value={editedUser.phone || ''}
                            onChange={handleInputChange}
                        />
                        <InputLabel>Country:</InputLabel>
                        <SelectField
                            name="country"
                            value={editedUser.country || ''}
                            onChange={(e) => {
                                handleInputChange(e);
                                fetchCities(e.target.value);
                            }}
                        >
                            <option value="">Select Country</option>
                            {countries.map((country, index) => (
                                <Option key={index} value={country.country}>{country.country}</Option>
                            ))}
                        </SelectField>
                        <InputLabel>City:</InputLabel>
                        <SelectField
                            name="city"
                            value={editedUser.city || ''}
                            onChange={handleInputChange}
                        >
                            <option value="">Select City</option>
                            {cities.map((city, index) => (
                                <Option key={index} value={city}>{city}</Option>
                            ))}
                        </SelectField>
                        <CardButton onClick={() => modifyUser()}>Edit</CardButton>
                        <CardButton color='#dc3545' onClick={deleteUser}>Delete</CardButton>
                    </Card>
                </CardContainer>
            )}
        </div>
    );
};

export default Users;
