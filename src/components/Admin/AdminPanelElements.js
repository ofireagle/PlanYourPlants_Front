import styled from 'styled-components'
import { Link } from 'react-router-dom'


export const Icon = styled(Link)`
    margin-left: 32px;
    margin-top: 32px;
    text-decoration: none;
    color: #fff;
    font-weight: 700;
    font-size: 32px;

    @media screen and (max-width: 480px) {
        margin-left: 16px;
        margin-top: 8px;
    }
`
export const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 50px;
    background: radial-gradient(circle, rgba(243,149,64,1) 20%, rgba(61,13,1,1) 100%);
`;

export const AdminTabs = styled.nav`
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
`;

export const TabButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: ${({ isActive }) => isActive ? '#F39540' : '#007bff'};
    color: ${({ isActive }) => isActive ? 'rgb(0, 0, 0)' : '#fff'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    font-weight: ${({ isActive }) => isActive ? 'bold' : 'normal'};
`;

export const ActiveTabIndicator = styled.div`
    position: absolute;
    bottom: 0;
    left: ${({ activeTab }) => {
        switch (activeTab) {
            case 'Users':
                return 'calc(33.33% - 50px)';
            case 'Plants':
                return 'calc(50% - 50px)';
            case 'Families':
                return 'calc(66.66% - 50px)';
            default:
                return 'calc(33.33% - 50px)';
        }
    }};
    width: 100px;
    height: 3px;
    background-color: #F39540;
    transition: left 0.3s ease-in-out;
`;

export const FormTable = styled.table`
    width: 80%;
    max-width: 800px;
    margin: 0 auto;
    border-collapse: collapse;
    border: 2px solid #ddd;
    border-radius: 8px;
    overflow: hidden;
`;

export const FormThead = styled.thead`
    background-color: #f2f2f2;
    font-weight: bold;
`;

export const FormTbody = styled.tbody``;

export const FormTr = styled.tr`
    cursor: pointer;

    &:hover {
        background-color: #f5f5f5;
    }
`;

export const FormTh = styled.th`
    padding: 12px 15px;
    font-size: 18px;
    text-align: center;
    border-bottom: 2px solid #ddd;
`;

export const FormTd = styled.td`
    padding: 12px 15px;
    font-size: 16px;
    text-align: center;
    border-bottom: 1px solid #ddd;
`;

export const CardContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999; /* Ensure it's above other content */
`;

export const Card = styled.div`
    position: relative;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const CardTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
`;

export const CardButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: ${({ color }) => color || '#F39540'};
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
`;

export const CardCloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    font-size: 24px;
    color: #000;
`;

export const InputLabel = styled.label`
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
`;

export const InputField = styled.input`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
`;

export const SelectField = styled.select`
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
    font-size: 16px;
    background-color: #fff;
    color: #333;
`;

export const Option = styled.option`
    background-color: #fff;
    color: #333;
`;