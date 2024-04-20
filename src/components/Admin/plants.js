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
                    <FormTh>Humidity</FormTh>
                    <FormTh>optimal_weather</FormTh>
                </FormTr>
            </FormThead>
            <FormTbody>
                {data.map((p, index) => (
                    <FormTr key={index}>
                        <FormTd>{p.name}</FormTd>
                        <FormTd>{p.famObj.family_name}</FormTd>
                        <FormTd>{p.famObj.humidity}</FormTd>
                        <FormTd>{p.famObj.optimal_weather + "C"}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
    );
};

export default Plants;
