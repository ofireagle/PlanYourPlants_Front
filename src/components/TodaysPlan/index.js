import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    Container,
    FormWrap,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormTable,
    FormThead,
    FormTbody,
    FormTr,
    FormTh,
    FormTd,
    HeroBg,
    VideoBg
 } from './TodaysPlanElements'
 import Video from '../../videos/video5.mp4'
 import { API_URL, createAxiosInstance, isAuthenticated } from '../../services/api';
 import axios from 'axios'

const TodaysPlan = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [state, setState] = useState(null);
  const [statePlants, setStatePlants] = useState([]);
  const [columns, setcolumns] = useState([]);
  const [records, setrecords] = useState([]);

  useEffect(() => {
    let validate = isAuthenticated() ? null: navigate('/signin')
    const handleFetchData = async() =>{
        let userData = await getUserByToken()
        setCurrentUser(userData);
        if(userData != null){
          await getWeatherNow(userData._id)
          await getUserPlan(userData._id)
        }
    }
    handleFetchData();
    let isMounted = true;
    return () => {
      isMounted = false;
    }
  }, []);

  const getUserByToken = async () => {
    const path = '/users/getUserByToken';
    try {
      const axiosInstance = createAxiosInstance();
      const resp = await axiosInstance.get(path);
      if (resp.data.status === 'success') {
        return resp.data.details
      }
    } catch (error) {
      console.log(error);
      return null
    }
  };

  const getWeatherNow = async(userID) =>{
      let url = API_URL + '/plants/getWeather/' + userID
      try {
        const dataWeather = await axios.get(url);
       if(dataWeather.status === 200){
         setState(dataWeather.data.details);
       }
      } catch (error) {
        console.log("Error on get weather api", error);
      }
  }

  const getUserPlan= async(userID) =>{
    let url = API_URL + '/plants/getPlan/' + userID
    try {
      const userPlan = await axios.get(url);
     if(userPlan.status === 200) {
      setStatePlants(userPlan.data.details);
      if (userPlan.data.details.length !== 0)
        setcolumns(Object.keys(userPlan.data.details[0]))
      setrecords(userPlan.data.details)
     }
    } catch (error) {
      console.log("Error on get user plan api", error);
    }
}

  return (
    <Container>
        <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4'/>
        </HeroBg>
        <FormWrap>
            <FormContent>
                <Form action="#">
                    <FormH1> Current Weather </FormH1>
                    <FormLabel type='weather'> { state && state.current.temp_c + 'c, ' +  state.location.name + ', ' + state.location.country} </FormLabel>
                </Form>
            </FormContent>
        </FormWrap>
        <FormWrap>
            <FormContent>
                <Form action="#">
                    <FormH1> Table of Plants </FormH1>
                    <FormTable className="table">
                        <FormThead>
                            <FormTr>
                                <FormTh key="0">Name</FormTh>
                                <FormTh key="1">Irrigation (per 1L soil)</FormTh>
                                <FormTh key="2">Location</FormTh>
                                <FormTh key="3">Method Of Irrigation</FormTh>
                                <FormTh key="4">Optimal Weather</FormTh>
                              </FormTr>
                        </FormThead>
                        <FormTbody>
                            {records.map((c, i) => (
                              <FormTr key={i}>
                                <FormTd>{c.name}</FormTd>
                                <FormTd>{c.humidity}</FormTd>
                                <FormTd>{c.location}</FormTd>
                                <FormTd>{c.method_of_irrigation}</FormTd>
                                <FormTd>{c.optimal_weather}</FormTd>
                                </FormTr>
                              ))}
                        </FormTbody>
                    </FormTable>
                </Form>
            </FormContent>
        </FormWrap>
    </Container>
  )
}

export default TodaysPlan