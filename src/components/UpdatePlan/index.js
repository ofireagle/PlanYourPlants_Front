import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormH1,
  FormLabel,
  FormInput,
  FormButton,
  HeroBg,
  VideoBg,
  ListContainer,
  List,
  ListItem,
  UpdateButton,
} from './UpdatePlanElements';
import Video from '../../videos/video2.mp4';
import { createAxiosInstance, isAuthenticated, API_URL } from '../../services/api';

const UpdatePlan = () => {
  const navigate = useNavigate();
  const [userPlants, setUserPlants] = useState([]);
  const [allPlants, setAllPlants] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await getUserByToken();
      if (userData !== null) {
        setUserPlants(userData.plants);
      }
      const plantsData = await getAllPlants();
      setAllPlants(plantsData.filter(plant => !userPlants.includes(plant._id)));
    };
    fetchData();
  }, []);

  const getUserByToken = async () => {
    const path = '/users/getUserByToken';
    try {
      const axiosInstance = createAxiosInstance();
      const resp = await axiosInstance.get(path);
      if (resp.data.status === 'success') {
        return resp.data.details;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getAllPlants = async () => {
    const url = API_URL + '/plants';
    try {
      const resp = await axios.get(url);
      const data = resp.data;
      if (data.details.length > 0) {
        return data.details;
      }
    } catch (error) {
      console.log("Error fetching all plants", error);
    }
    return [];
  };

  const handleUpdateMyPlants = async () => {
    try {
      await updateApi(userPlants);
      alert('User details updated successfully!');
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert('Error updating user details.');
    }
  };

  const updateApi = async (data) => {
    const path = '/users/updateUser';
    try {
      const axiosInstance = createAxiosInstance();
      await axiosInstance.patch(path, { plants: data });
    } catch (error) {
      throw new Error('Failed to update user details');
    }
  };

  const handlePlantClick = (plant) => {
    // Check if the plant exists in userPlants
    const isUserPlant = userPlants.includes(plant._id);
    if (isUserPlant) {
      // Remove the clicked plant from userPlants and add it to allPlants
      setUserPlants(prevPlants => prevPlants.filter(p => p !== plant._id));
      setAllPlants(prevPlants => {
        const filteredPlants = prevPlants.filter(p => p !== plant);
        return [...filteredPlants, plant];
      });
    } else {
      // Remove the clicked plant from allPlants and add it to userPlants
      setAllPlants(prevPlants => prevPlants.filter(p => p !== plant._id));
      setUserPlants(prevPlants => [...prevPlants, plant._id]);
    }
  };

  // Filter plants that are already in the user list
  const filteredAllPlants = allPlants.filter(plant => !userPlants.includes(plant._id));

  return (
    <Container>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
      </HeroBg>
      <FormWrap>
        <FormContent>
          <Form action="#">
            <FormH1>My Plants</FormH1>
            <ListContainer>
              <List>
                {userPlants && userPlants.map((plantId, index) => {
                  const plant = allPlants.find(p => p._id === plantId);
                  return (
                    <ListItem key={index} onClick={() => handlePlantClick(plant)}>
                      {plant ? plant.name : "Plant Not Found"}
                    </ListItem>
                  );
                })}
              </List>
            </ListContainer>
            <FormH1>All Plants</FormH1>
            <ListContainer>
              <List>
                {filteredAllPlants && filteredAllPlants.map((plant, index) => (
                  <ListItem key={index} onClick={() => handlePlantClick(plant)}>
                    {plant.name}
                  </ListItem>
                ))}
              </List>
            </ListContainer>
            <UpdateButton onClick={handleUpdateMyPlants}>Update List</UpdateButton>
          </Form>
        </FormContent>
      </FormWrap>
    </Container>
  );
};

export default UpdatePlan;
