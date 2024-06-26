import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Users from './users';
import Plants from './plants';
import Families from './families';
import { Container, AdminTabs, TabButton, ActiveTabIndicator } from '../elements';
import axios from 'axios';
import { API_URL, isAuthenticated, isAdmin } from '../../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Users');
    const [usersData, setUserData] = useState([]);
    const [plantsData, setPlantsData] = useState([]);
    const [familiesData, setFamiliesData] = useState([]);
    const [mergedData, setMergedData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        let validate = isAuthenticated() ? null: navigate('/signin')
        
        const validateAdmin = async() =>{
            let response = await isAdmin() ? false : navigate('/discoverPlants')
        }

        const fetchUserData = async () => {
            try {
                const resp = await axios.get(API_URL + '/users');
                setUserData(resp.data.details);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchPlantsData = async () => {
            try {
                const resp = await axios.get(API_URL + '/plants');
                setPlantsData(resp.data.details);
            } catch (error) {
                console.error('Error fetching plant data:', error);
            }
        };

        const fetchFamiliesData = async () => {
            try {
                const resp = await axios.get(API_URL + '/families');
                setFamiliesData(resp.data.details);
            } catch (error) {
                console.error('Error fetching family data:', error);
            }
        };
        validateAdmin()
        fetchUserData();
        fetchPlantsData();
        fetchFamiliesData();
    }, []);

    useEffect(() => {
        if (plantsData.length > 0 && familiesData.length > 0 && usersData.length > 0) {
            const merged = mergeData();
            setMergedData(merged);
        }
    }, [plantsData, familiesData, usersData]);

    const mergeData = () => {
        return plantsData.map(plant => {
            const famObj = familiesData.find(family => family._id === plant.family);
            const userObj = usersData.find(user => user._id === plant.creator);
            const numberOfUsers = calculateNumberOfUsers(plant, usersData);
            return { ...plant, famObj, userObj, numberOfUsers };
        });
    };

    const calculateNumberOfUsers = (plant, usersData) => {
        return usersData.filter(user => user.plants.includes(plant._id)).length;
    };
    

    return (
        <Container>
            <div style={{ marginTop: '100px' }}>
                <AdminTabs>
                    <TabButton onClick={() => setActiveTab('Users')} isActive={activeTab === 'Users'}>Users</TabButton>
                    <TabButton onClick={() => setActiveTab('Plants')} isActive={activeTab === 'Plants'}>Plants</TabButton>
                    <TabButton onClick={() => setActiveTab('Families')} isActive={activeTab === 'Families'}>Families</TabButton>
                    <ActiveTabIndicator activeTab={activeTab} />
                </AdminTabs>
            </div>
            <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                {activeTab === 'Users' && (
                    <Users data={usersData}/>
                )}
                {activeTab === 'Plants' && (
                    
                    <Plants data={mergedData} />
                )}
                {activeTab === 'Families' && (
                    <Families data={mergedData} />
                )}
            </div>
        </Container>
    );
};

export default AdminDashboard;
