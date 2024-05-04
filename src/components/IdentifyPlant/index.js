import React, { useState, useEffect } from 'react';
import { Container, FormWrap, FormContent, Form } from './IdentifyPlantElements';
import { FormH1, FormButton, HeroBg, VideoBg } from '../elements';
import Video from '../../videos/video3.mp4';
import { isAuthenticated, API_URL, createAxiosInstance } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Input } from '@material-ui/core';

const IdentifyPlant = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  useEffect(() => {
    let validate = isAuthenticated() ? null : navigate('/signin');
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      setErrorMessage('');
    } else {
      setSelectedImage(null);
      setErrorMessage('Only image files are allowed.');
    }
  };

  const handleUploadClick = async (event) => {
    event.preventDefault();
    
    if (selectedImage) {
      try {
        const axiosInstance = createAxiosInstance();
        const formData = new FormData();
        formData.append('image', selectedImage);
        const path = '/plants/identifyPlant';
        const resp = await axiosInstance.post(path, formData);
        if(resp.status === 200){
          setApiResponse(resp.data);
        }
      } catch (error) {
        console.log('err api -> ', error);
        setErrorMessage('Something went wrong. Try again letter')
        setApiResponse(null);
      }
    } else {
      setErrorMessage('No image uploaded');
    }
  };

const renderApiResult = () => {
  if (!apiResponse) return null;

  const { status, dbResponse, details } = apiResponse;

  if (status === 'success') {
    return (
      <div style={{ textAlign: 'center' }}>
        <p>Name: {details.plant_name}</p>
        <p>Description: {details.plant_details.wiki_description.value}</p>
        <img src={details.plant_details.image.value} style={{ maxWidth: '100%', height: 'auto' }} alt={details.plant_name} />
        {dbResponse.msg !== 'Family does not exist, cannot create'  && (
          <FormButton type="button" style={{ margin: '10px' }} onClick={() => addPlantApi(dbResponse)}>Add to My List</FormButton>
          
        )}
        <a href={details.plant_details.url} target="_blank" rel="noopener noreferrer">
          <FormButton type="button" style={{ margin: '10px' }}>Wiki Link</FormButton>
        </a>
      </div>
    );
  } else {
    return (
      <div style={{ textAlign: 'center' }}>
        <p> Plant not found. </p>
      </div>
    );
  }
};

const addPlantApi = async(req) =>{
  const url = API_URL + '/users/addPlant';
  try{
    const axiosInstance = createAxiosInstance();
    let body = {
      "plantID":[req.plant._id]
    }
    console.log(req);
    console.log(body);
    const resp = await axiosInstance.patch(url, body);
    if(resp.status === 200 && resp.data.status === "success"){
      alert('Plant added successfully into your plants list !')
    }
  }catch(error){
    console.log('err on update user list ', error);
  }
}

  return (
    <Container>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <FormWrap>
        <FormContent>
          <Form onSubmit={handleUploadClick}>
            <FormH1>Identify Plant</FormH1>
            <Input type='file' onChange={handleImageChange} />
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <FormButton type="submit">Upload</FormButton>
          </Form>
        </FormContent>
      </FormWrap>
      <FormWrap>
        <FormContent>
          <Form action="#">
            <FormH1>Plants details</FormH1>
            {renderApiResult()}
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default IdentifyPlant;