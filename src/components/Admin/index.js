import React, { useState, useEffect } from 'react';
import Users from './users';
import Plants from './plants';
import Families from './families';
import { Container, AdminTabs, TabButton, ActiveTabIndicator, FormTable, FormThead, FormTbody, FormTr, FormTh, FormTd } from './AdminPanelElements';
import axios from 'axios';
import { API_URL } from '../../services/api';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('Users');
    const [userData, setUserData] = useState([]);
    const [plantsData, setPlantsData] = useState([]);
    const [familiesData, setFamiliesData] = useState([]);

    useEffect(() => {
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

        fetchUserData();
        fetchPlantsData();
        fetchFamiliesData();
    }, []);

    return (
        <Container>
            <h2>Admin Dashboard</h2>
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
                    <FormTable>
                        <FormThead>
                            <FormTr>
                                <FormTh>Name</FormTh>
                                <FormTh>Email</FormTh>
                                <FormTh>Phone</FormTh>
                                <FormTh>City</FormTh>
                            </FormTr>
                        </FormThead>
                        <FormTbody>
                            {userData.map((user, index) => (
                                <FormTr key={index}>
                                    <FormTd>{user.name}</FormTd>
                                    <FormTd>{user.email}</FormTd>
                                    <FormTd>{user.phone}</FormTd>
                                    <FormTd>{user.city}</FormTd>
                                </FormTr>
                            ))}
                        </FormTbody>
                    </FormTable>
                )}
                {activeTab === 'Plants' && (
                    <Plants data={plantsData} />
                )}
                {activeTab === 'Families' && (
                    <Families data={familiesData} />
                )}
            </div>
        </Container>
    );
};

export default AdminDashboard;
