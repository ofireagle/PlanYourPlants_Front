import React, { useState, useEffect } from 'react';
import {
    FormTable,
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody
} from './AdminPanelElements';
import { extractFamilyData, API_URL } from '../../services/api';
import axios from 'axios';

const Families = ({ data }) => {
    const [familyData, setFamilyData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const extractedData = await extractFamilyData(data);
            setFamilyData(extractedData);
        };
        fetchData();
    }, [data]);

    return (
        <FormTable>
            <FormThead>
                <FormTr>
                    <FormTh>Family Name</FormTh>
                    <FormTh>Location</FormTh>
                    <FormTh>Method of Irrigation</FormTh>
                    <FormTh>Number of Plants</FormTh>
                </FormTr>
            </FormThead>
            <FormTbody>
                {familyData.map((family, index) => (
                    <FormTr key={index}>
                        <FormTd>{family.familyName}</FormTd>
                        <FormTd>{family.location}</FormTd>
                        <FormTd>{family.methodOfIrrigation}</FormTd>
                        <FormTd>{family.plantsCounter}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
    );
};

export default Families;
