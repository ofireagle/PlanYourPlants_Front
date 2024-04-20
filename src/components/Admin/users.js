import React, { useState } from 'react';
import { FormTable, FormTd, FormTh, FormTr, FormThead, FormTbody, CardContainer, Card, CardTitle, CardCloseButton, InputLabel, InputField, CardButton } from './AdminPanelElements';
import { createAxiosInstance, API_URL } from '../../services/api';
import axios from 'axios';

const Users = ({ data }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [editedUser, setEditedUser] = useState(null);

    const openCard = (user) => {
        setSelectedUser(user);
        setEditedUser({ ...user });
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
        try {
            const axiosInstance = createAxiosInstance();
    
            const resp = await axiosInstance.patch(url, editedUser);
            console.log('Response -> ', resp);
            if (resp.status === 200 && resp.data.status === "success") {
                alert('User updated successfully!');
                setSelectedUser(null);
                setEditedUser(null);
            }
        } catch (error) {
            console.log('Error on update user ', error);
        }
    };

    const deleteUser = async () => {
        const url = API_URL + `/users/${selectedUser._id}`;
        try {
            let resp = await axios.delete(url);
            let data = resp.data;
            if (data.status === "success") {
                alert(data.data);
                setSelectedUser(null);
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
                        <InputLabel>City:</InputLabel>
                        <InputField
                            type="text"
                            name="city"
                            value={editedUser.city || ''}
                            onChange={handleInputChange}
                        />
                        <InputLabel>Country:</InputLabel>
                        <InputField
                            type="text"
                            name="country"
                            value={editedUser.country || ''}
                            onChange={handleInputChange}
                        />
                        <CardButton onClick={() => modifyUser()}>Edit</CardButton>
                        <CardButton color='#dc3545' onClick={deleteUser}>Delete</CardButton>
                    </Card>
                </CardContainer>
            )}
        </div>
    );
};

export default Users;
