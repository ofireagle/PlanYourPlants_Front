import axios from "axios";
import Cookies from 'universal-cookie';
import {Navigate, Route} from 'react-router-dom'
const API_URL = "http://localhost:8000/api";

const cookies = new Cookies();
const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: API_URL
  });
  
  const token = cookies.get('jwt');
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return axiosInstance;
};

const isAuthenticated = () => {
  return document.cookie.includes('jwt');
};

const isAdmin = async() =>{
  let user = await getUserByToken()
  return user.role === 0;
}

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

export { createAxiosInstance, API_URL, isAuthenticated, isAdmin };