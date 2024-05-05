import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Form,
    FormTable,
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody,
    FormLabel,
    FormInput,
    TextDanger,
    CardContainer,
    FormButton, 
    Card, 
    CardTitle, 
    CardCloseButton, 
    InputLabel, 
    InputField, 
    CardButton, 
    SelectField, 
    Option } from '../elements';
import { extractFamilyData } from '../../services/api';
import { API_URL, createAxiosInstance } from '../../services/api';
import axios from 'axios';

const Families = ({ data }) => {
    const [familyData, setFamilyData] = useState([]);
    const [selectedFamily, setSelectedFamily] = useState(null);
    const [editFamily, setEditFamily] = useState(null);
    const [createFamilyTrigger, setCreateFamilyTrigger] = useState(false);
    const [locationsData, setLocationsData] = useState(false);
    const [methodsData, setMethodsData] = useState(false);
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        const fetchData = async () => {
            const extractedData = await extractFamilyData(data);
            console.log(extractedData);
            setFamilyData(extractedData);
            // Fetch locations objects
            const locationsResp = await axios.get(API_URL + '/locations');
            const locations = locationsResp.data.details;
            setLocationsData(locations)
            // Fetch methods objects
            const methodsResp = await axios.get(API_URL + '/methods');
            const methods = methodsResp.data.details;
            setMethodsData(methods)
        };

        fetchData();
    }, [data]);

    const onFormSubmit = async (data) => {
        //console.log(data);
        if(data){
            //Create New Family
            const selectedLocation = locationsData.find(loc => loc.location === data.location);
            const selectedMethod = methodsData.find(met => met.method === data.method_of_irrigation);
            data['location'] = selectedLocation['_id'];
           data['method_of_irrigation'] = selectedMethod['_id'];
          try {
                const resp = await axios.post(API_URL + "/families/addNew", data)
                if(resp.data.status === 'success'){
                    alert('New Family created succesfully.')
                    window.location.reload();
                }
                else{
                    alert('Something went wrong. check the enterd details again.')
                }
            } catch (error) {
                console.log("Error creating family");
                console.log(error);
                alert('Something went wrong. check the enterd details again.')
            }
        }
      };

    const openCard = (plant) => {
        //console.log(plant);
        setSelectedFamily(plant);
        setEditFamily({ ...plant });
    };

    const closeCard = () => {
        setSelectedFamily(null);
        setEditFamily(null);
        setCreateFamilyTrigger(false)
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
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '25px' }}>
            <FormButton style={{ fontSize: '1rem' }} type='button' onClick={() =>{setCreateFamilyTrigger(true)}}>Create New Family</FormButton>
        </div>
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
        {createFamilyTrigger && (
                <CardContainer onClick={handleCardClick} style={{ marginTop: '50px' }}>
                <Card style={{ width: '30%', margin: '0 auto' }}>
                    <CardCloseButton onClick={closeCard}>×</CardCloseButton>
                        <form action="#" onSubmit={handleSubmit(onFormSubmit)}>
                            {/* <CardTitle>Create New Family</CardTitle> */}
                            <InputLabel>Name:</InputLabel>
                            <InputField type='text' {...register("family_name", {
                                required: true
                            })}/>
                            {errors.family_name && <p style={{ fontSize: '0.8rem', color: 'red' }}> Name Cannot be empty.</p>}
                            <InputLabel>frequency_of_irrigation:</InputLabel>
                            <InputField type='number' {...register("frequency_of_irrigation", {
                                required: true,
                                pattern: /^[+-]?\d*\.?\d+$/
                            })}/>
                            {errors.frequency_of_irrigation && <p style={{ fontSize: '0.8rem', color: 'red' }}> Frequency of irrigation Cannot be empty.</p>}
                            <InputLabel>humidity:</InputLabel>
                            <InputField type='number' {...register("humidity", {
                                required: true,
                                pattern: /^[+-]?\d*\.?\d+$/
                            })}/>
                            {errors.humidity && <p style={{ fontSize: '0.8rem', color: 'red' }}> Humidity Cannot be empty</p>}
                            <InputLabel>method_of_irrigation</InputLabel>
                            <SelectField
                                name="method_of_irrigation" {...register("method_of_irrigation", {
                                    required: true
                                })}>
                                <option value="">Select Location</option>
                                {methodsData.map((method, index) => (
                                    <Option key={index} value={method.method}>{method.method}</Option>
                                ))}
                            </SelectField>
                            {errors.method_of_irrigation && <p style={{ fontSize: '0.8rem', color: 'red' }}> Method of irrigation Cannot be empty</p>}
                            <InputLabel>location:</InputLabel>
                            <SelectField
                                name="location" {...register("location", {
                                    required: true
                                })}>
                                <option value="">Select Location</option>
                                {locationsData.map((location, index) => (
                                    <Option key={index} value={location.location}>{location.location}</Option>
                                ))}
                            </SelectField>
                            {errors.location && <p style={{ fontSize: '0.8rem', color: 'red' }}> Location Cannot be empty</p>}
                            <InputLabel>optimal_weather:</InputLabel>
                            <InputField type='number' {...register("optimal_weather", {
                                required: true,
                                pattern: /^[+-]?\d*\.?\d+$/
                            })}/>
                            {errors.optimal_weather && <p style={{ fontSize: '0.8rem', color: 'red' }}> Optimal weather Cannot be empty.</p>}
                            <CardButton type='submit'> Create </CardButton>
                        </form>
                </Card>
            </CardContainer>
        )}
        </div>
    );
};

export default Families;
