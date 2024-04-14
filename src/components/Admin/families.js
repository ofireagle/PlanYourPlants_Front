import React,  {useState, useEffect} from 'react';
import { FormTable, 
    FormTd,
    FormTh,
    FormTr,
    FormThead,
    FormTbody } from './AdminPanelElements';

const Users = ({ data }) => {
    const [customArr, setCustomArr] = useState([])

    useEffect(()=>{
        const handlePageLoad = async() =>{

        }
    }, [])

    const mergeArraysByCondition = (array1, array2, condition) => {
        return array1.map(item1 => {
            const matchingItem = array2.find(item2 => condition(item1, item2));
            return { ...item1, ...matchingItem };
        });
    };
    const array1 = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];
    const array2 = [{ id: 1, value: 'Value 1' }, { id: 2, value: 'Value 2' }];
    
    const mergedArray = mergeArraysByCondition(array1, array2, (item1, item2) => item1.id === item2.id);
    
    console.log(mergedArray);
        
    return (
        <FormTable>
            <FormThead>
                <FormTr>
                    <FormTh>Family Name</FormTh>
                    <FormTh>Location</FormTh>
                    <FormTh>Number of plants</FormTh>
                    <FormTh>City</FormTh>
                </FormTr>
            </FormThead>
            <FormTbody>
                {data.map((p, index) => (
                    <FormTr key={index}>
                        <FormTd>{p.famObj.family_name}</FormTd>
                        <FormTd>{p.famObj.location}</FormTd>
                        <FormTd>{}</FormTd>
                        <FormTd>{}</FormTd>
                    </FormTr>
                ))}
            </FormTbody>
        </FormTable>
    );
};

export default Users;
