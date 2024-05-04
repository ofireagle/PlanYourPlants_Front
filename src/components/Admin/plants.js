import React from 'react';
import { FormTable, 
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody } from './AdminPanelElements';

const Plants = ({ data }) => {
    return (
        <FormTable>
            <FormThead>
                <FormTr>
                    <FormTh>Plant Name</FormTh>
                    <FormTh>Family Name</FormTh>
                    <FormTh>Number of used users</FormTh>
                    <FormTh>Created By</FormTh>
                </FormTr>
            </FormThead>
            <FormTbody>
                {data.map((p, index) => (
                    <FormTr key={index}>
                        <FormTd>{p.name}</FormTd>
                        <FormTd>{p.famObj.family_name}</FormTd>
                        <FormTd>{p.numberOfUsers}</FormTd>
                        <FormTd>{p.userObj ?p.userObj.name : 'System'}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
    );
};

export default Plants;
