import axios from "axios";
import Cookies from 'universal-cookie';
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

  const extractFamilyData = async (plantsArray) => {
    const familyMap = {};

    // Fetch locations objects
    const locationsResp = await axios.get(API_URL + '/locations');
    const locations = locationsResp.data.details;

    // Fetch methods objects
    const methodsResp = await axios.get(API_URL + '/methods');
    const methods = methodsResp.data.details;

    plantsArray.forEach((plant) => {
        const { family, famObj } = plant;
        const { _id: famId, family_name, optimal_weather } = famObj;

        // Get location name
        const locationName = locations.find(loc => loc._id === famObj.location)?.location || 'Unknown';

        // Get method name
        const methodName = methods.find(method => method._id === famObj.method_of_irrigation)?.method || 'Unknown';

        if (!familyMap[family]) {
            familyMap[family] = {
                familyId: family,
                familyName: family_name,
                location: locationName,
                methodOfIrrigation: methodName,
                optimal_weather: optimal_weather,
                plantsCounter: 1
            };
        } else {
            familyMap[family].plantsCounter++;
        }

        if (famId !== family && !familyMap[famId]) {
            familyMap[famId] = {
                familyId: famId,
                familyName: family_name,
                location: locationName,
                methodOfIrrigation: methodName,
                optimal_weather: optimal_weather,
                plantsCounter: 1
            };
        } else if (famId !== family) {
            familyMap[famId].plantsCounter++;
        }
    });

    // Fetch all families
    const allFamiliesResp = await axios.get(API_URL + '/families');
    const allFamilies = allFamiliesResp.data.details;

    // Merge families without plants into familyMap
    allFamilies.forEach(family => {
        if (!familyMap[family._id]) {
            familyMap[family._id] = {
                familyId: family._id,
                familyName: family.family_name,
                location: locations.find(loc => loc._id === family.location)?.location || 'Unknown',
                methodOfIrrigation: methods.find(method => method._id === family.method_of_irrigation)?.method || 'Unknown',
                optimal_weather: family.optimal_weather,
                plantsCounter: 0
            };
        }
    });

    const familyDataArray = Object.values(familyMap);

    return familyDataArray;
};


export { createAxiosInstance, API_URL, isAuthenticated, isAdmin, extractFamilyData, getUserByToken };