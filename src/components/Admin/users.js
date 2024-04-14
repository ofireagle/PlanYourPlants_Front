import React, { useState } from 'react';
import { FormTable, FormTd, FormTh, FormTr, FormThead, FormTbody, CardContainer, Card, CardTitle, CardButton, CardCloseButton } from './AdminPanelElements';

const Users = ({ data }) => {
    const [selectedUser, setSelectedUser] = useState(null);

    const openCard = (user) => {
        setSelectedUser(user);
    };

    const closeCard = () => {
        setSelectedUser(null);
    };

    const handleCardClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCard();
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
                        <p><strong>Name:</strong> {selectedUser.name}</p>
                        <p><strong>Email:</strong> {selectedUser.email}</p>
                        <p><strong>Phone:</strong> {selectedUser.phone}</p>
                        <p><strong>City:</strong> {selectedUser.city}</p>
                        <CardButton>Edit</CardButton>
                        <CardButton color='#dc3545'>Delete</CardButton>
                    </Card>
                </CardContainer>
            )}
        </div>
    );
};

export default Users;
