import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  FormWrap,
  FormContent,
  Form,
  FormLabel,
  FormH1,
  FormButton,
  HeroBg,
  VideoBg,
  FormImage
} from './DiscoverPlantsElements';
import { isAuthenticated, API_URL } from '../../services/api';
import axios from 'axios';
import Video from '../../videos/video4.mp4';

const DiscoverPlants = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(null);
  const [statePlant, setStatePlant] = useState([]);
  const [fetchData, setFetchData] = useState(true);

  useEffect(() => {
    let validate = isAuthenticated() ? null : navigate('/signin');
    if (fetchData) {
      dataFetch();
      setFetchData(false);
    }
  }, [fetchData]);

  const dataFetch = async () => {
    let plantData = await getRadmonPlant();
    if (plantData != null) {
      setState(plantData.name);
      setStatePlant(plantData);
    }
  };

  const getRadmonPlant = async () => {
    let url = API_URL + '/plants/getRandom'
    try {
      let resp = await axios.get(url);
      console.log(resp);
      if (resp.data.status === 'success') {
        return resp.data.details;
      }
    } catch (err) {
      console.log('err ->', err);
      return null;
    }
  };

  return (
    <Container>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <FormWrap>
        <FormContent>
          <Form action="#" onSubmit={dataFetch}>
            <FormH1> Random Plant </FormH1>
            <FormLabel>
              <b> {state && statePlant.name} </b>
            </FormLabel>
            <FormLabel> {state && statePlant.description} </FormLabel>
            <br></br>
            <FormButton type="submit"> Next </FormButton>
          </Form>
        </FormContent>
      </FormWrap>
      {state && statePlant.imgUrl ? (
        <FormWrap>
          <FormContent>
            <Form action="#">
              <FormH1> Image </FormH1>
              <FormImage src={state && statePlant.imgUrl} />
              <img
                src={statePlant.imgUrl}
                alt="Plant Image"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </Form>
          </FormContent>
        </FormWrap>
      ) : null}
    </Container>
  );
};

export default DiscoverPlants;
