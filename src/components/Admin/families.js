import React, { useState, useEffect } from 'react';
import {
    FormTable,
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody,
    CardContainer, 
    Card, 
    CardTitle, 
    CardCloseButton, 
    InputLabel, 
    InputField, 
    CardButton } from '../elements';
import { extractFamilyData } from '../../services/api';
import { API_URL, createAxiosInstance } from '../../services/api';
import axios from 'axios';

const Families = ({ data }) => {
    const [familyData, setFamilyData] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editFamily, setEditFamily] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const extractedData = await extractFamilyData(data);
            setFamilyData(extractedData);
        };
        fetchData();
    }, [data]);

    const openCard = (plant) => {
        //console.log(plant);
        setSelectedFamily(plant);
        setEditFamily({ ...plant });
    };

    const closeCard = () => {
        setSelectedFamily(null);
        setEditFamily(null);
    };

    const handleCardClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCard();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditFamily(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const modifyFamily = async() =>{
        let newData = {'family_name': editFamily.family_name, "optimal_weather": editFamily.optimal_weather};
        const url = API_URL + `/families/${editFamily.familyId}`;
        try {
            const resp = await axios.patch(url, newData);
            if(resp.data.status === 'success'){
                alert("Family updates successfully.")
                setSelectedFamily(null)
                setEditFamily(null)
                window.location.reload();
            }          
        } catch (error) {
            console.log("Error update family", error);
        }
    }

    const deleteFamily = async() =>{
        const url = API_URL + `/families/${editFamily.familyId}`;
        try {
            const resp = await axios.delete(url);
            const data = resp.data;
            if (data.status === "success") {
                alert("Family deleted successfully");
                setSelectedFamily(null)
                window.location.reload();
            }
        } catch (error) {
            console.log(`Error deleting plant ${error}`);
        }
    }

    return (
        <div>
        <FormTable>
            <FormThead>
                <FormTr>
                    <FormTh>Family Name</FormTh>
                    <FormTh>Location</FormTh>
                    <FormTh>Method of Irrigation</FormTh>
                    <FormTh>Optimal weather</FormTh>
                    <FormTh>Number of Plants</FormTh>
                </FormTr>
            </FormThead>
            <FormTbody>
                {familyData.map((family, index) => (
                    <FormTr key={index} onClick={() =>{openCard(family)}}>
                        <FormTd>{family.familyName}</FormTd>
                        <FormTd>{family.location}</FormTd>
                        <FormTd>{family.methodOfIrrigation}</FormTd>
                        <FormTd>{family.optimal_weather.includes('c')? family.optimal_weather: family.optimal_weather + 'c'}</FormTd>
                        <FormTd>{family.plantsCounter}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
        {selectedFamily && (
            <CardContainer onClick={handleCardClick}>
                <Card>
                    <CardCloseButton onClick={closeCard}>×</CardCloseButton>
                    <CardTitle>Family Details</CardTitle>
                    <InputLabel>Name:</InputLabel>
                    <InputField
                        type="text"
                        name="family_name"
                        value={editFamily.familyName || ''}
                        onChange={handleInputChange}
                    />
                    <InputLabel>Optimal weather:</InputLabel>
                    <InputField
                        type="text"
                        name="optimal_weather"
                        value={editFamily.optimal_weather || ''}
                        onChange={handleInputChange}
                    />
                    <CardButton onClick={() => modifyFamily()}>Edit</CardButton>
                    <CardButton color='#dc3545' onClick={deleteFamily}>Delete</CardButton>
                </Card>
            </CardContainer>
        )}
        </div>
    );
};

export default Families;