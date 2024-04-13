import React from 'react';
import { FormTable, 
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody } from './AdminPanelElements';

const Users = ({ data }) => {
    return (
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
                    <FormTr key={index}>
                        <FormTd>{user.family_name}</FormTd>
                        <FormTd>{user.email}</FormTd>
                        <FormTd>{user.phone}</FormTd>
                        <FormTd>{user.city}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
    );
};

export default Users;
