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

/*const PrivateRoute = ({ element }) => {
  return isAuthenticated() ? (
    <Route element={element} />
  ) : (
    <Navigate to="/signIn" replace />
  );
};*/

export { createAxiosInstance, API_URL, isAuthenticated };