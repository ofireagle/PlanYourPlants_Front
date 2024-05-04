import React, {useState, useEffect} from 'react';
import { FormTable, 
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody,
    CardContainer, 
    Card, 
    CardTitle, 
    CardCloseButton, 
    InputLabel, 
    InputField, 
    CardButton,
    SelectField, 
    Option} from '../elements';
    import { API_URL, createAxiosInstance } from '../../services/api';
import axios from 'axios';

const Plants = ({ data }) => {

    const [selectedPlant, setSelectedPlant] = useState(null);
    const [editPlant, setEditPlant] = useState(null);
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(API_URL + '/users');
                setAllUsers(response.data.details);
                data.forEach((p) =>{
                    if(p.userObj){
                        p['creator'] = p.userObj.name;
                    }
                    else{
                        p['creator'] = 'System'
                    }
                })
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);


    const openCard = (plant) => {
        //console.log(plant);
        setSelectedPlant(plant);
        setEditPlant({ ...plant });
    };

    const closeCard = () => {
        setSelectedPlant(null);
        setEditPlant(null);
    };

    const handleCardClick = (e) => {
        if (e.target === e.currentTarget) {
            closeCard();
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditPlant(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const modifyPlant = async() =>{
        const url = API_URL + '/plants/' + editPlant._id;
        let findUser = allUsers.find(user => user.name === editPlant.creator);
        let newData = {"name": editPlant.name, "creator": ""};
        if(findUser){
            let userID = findUser._id;
            newData.creator = userID;
        }
        console.log(newData);
       try {
            const resp = await axios.patch(url, newData)
            if (resp.status === 200 && resp.data.status === "success") {
                if(findUser){
                    const axiosInstance = createAxiosInstance();
                    const userNewPlantResp = await axiosInstance.patch(API_URL + '/users/updateUser',{'userID': findUser._id, 'newPlants':[...findUser.newPlants, editPlant._id]})
                    if(editPlant.userObj){
                        if(editPlant.userObj._id != findUser._id){
                            let removePlantFromUser = editPlant.userObj.newPlants.filter(plantId => plantId !== editPlant._id);
                            const userOldPlantResp = await axiosInstance.patch(API_URL + '/users/updateUser',{'userID': editPlant.userObj._id, 'newPlants':removePlantFromUser})
                            alert('Plant updated successfully!');
                            setSelectedPlant(null);
                            setEditPlant(null);
                            window.location.reload();
                        }
                    }
                }
                alert('Plant updated successfully!');
                setSelectedPlant(null);
                setEditPlant(null);
                window.location.reload();
            }
        } catch (error) {
            console.log('Error on update plant ', error);
        }
    }

    const deletePlant = async() =>{
        const url = API_URL + `/plants/${editPlant._id}`;
        try {
            const resp = await axios.delete(url);
            const data = resp.data;
            if (data.status === "success") {
                alert("Plant deleted successfully");
                selectedPlant(null);
                window.location.reload();
            }
        } catch (error) {
            console.log(`Error deleting plant ${error}`);
        }
    }
    return (
        <div>
            <FormTable>
                <FormThead>
                    <FormTr>
                        <FormTh>Plant Name</FormTh>
                        <FormTh>Family Name</FormTh>
                        <FormTh>Number of used users</FormTh>
                        <FormTh>Created By</FormTh>
                    </FormTr>
                </FormThead>
                <FormTbody>
                    {data.map((p, index) => (
                        <FormTr key={index} onClick={() =>{openCard(p)}}>
                            <FormTd>{p.name}</FormTd>
                            <FormTd>{p.famObj.family_name}</FormTd>
                            <FormTd>{p.numberOfUsers}</FormTd>
                            <FormTd>{p.userObj ?p.userObj.name : 'System'}</FormTd>
                        </FormTr>
                    ))}
                </FormTbody>
            </FormTable>
                {selectedPlant && (
                    <CardContainer onClick={handleCardClick}>
                        <Card>
                            <CardCloseButton onClick={closeCard}>×</CardCloseButton>
                            <CardTitle>Plant Details</CardTitle>
                            <InputLabel>Name:</InputLabel>
                            <InputField
                                type="text"
                                name="name"
                                value={editPlant.name || ''}
                                onChange={handleInputChange}
                            />
                            <InputLabel>Creator:</InputLabel>
                            <SelectField
                                name="creator"
                                value={editPlant.creator || ''}
                                onChange={handleInputChange}
                            >
                                <Option value="">Select User</Option>
                                {allUsers.map((user, index) => (
                                    <Option key={index} value={user.name}>{user.name}</Option>
                                ))}
                            </SelectField>
                            <CardButton onClick={() => modifyPlant()}>Edit</CardButton>
                            <CardButton color='#dc3545' onClick={deletePlant}>Delete</CardButton>
                        </Card>
                    </CardContainer>
                )}
        </div>
        )
};

export default Plants;