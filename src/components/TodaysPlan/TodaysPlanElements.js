import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    min-height: 692px;
    position: relative;
    justify-content: center;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
    padding-bottom: 150px;
    z-index: 0;
    overflow: hidden;
    background: radial-gradient(circle, rgba(243,149,64,1) 20%, rgba(61,13,1,1) 90%, rgba(0,0,0,1) 100%);
    display: flex; 
    flex-direction: column;
`

export const FormWrap = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 50px;
    @media screen and (max-width: 400px) {
        height: 80%;
    }
`

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

export const FormContent = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Form = styled.form`
    background: rgba(230,230,230,0.6);
    height: auto;
    width: 100%;
    display: grid;
    position: relative;
    top: 100px;
    margin: 0 auto;
    padding: 80px 32px;
    border-radius: 4px;
    box-shadow: 0 1px 3px rgba(255,255,255,0.9);

    @media screen and (max-width: 400px) {
        padding: 32px 32px;
    }
`

export const FormH1 = styled.h1`
    margin-bottom: 40px;
    color: rgb(0,0,0);
    font-size: 20px;
    font-weight: 400;
    text-align: center;
`

export const FormLabel = styled.label`
    margin-bottom: 8px;
    font-size: 14px;
    color: rgb(0,0,0);
`

export const FormInput = styled.input`
    padding: 16px 16px;
    margin-bottom: 32px;
    border: none;
    border-radius: 4px;
`

export const FormButton = styled.button`
    background: #F39540;
    padding: 16px 0;
    border: none;
    border-radius: 4px;
    color: rgb(0,0,0);
    font-size: 20px;
    cursor: pointer;
`

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`

export const FormTable = styled.table`
    text-align: center;
    margin-right: 24px;
    font-size: 14px;
`

export const FormThead = styled.thead`

`

export const FormTbody = styled.tbody`

`

export const FormTr = styled.tr`

`

export const FormTh = styled.th`

`

export const FormTd = styled.td`

`

export const HeroBg = styled.div`
    position: absolute;
    top: 0;
    right: 0; 
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const VideoBg = styled.video`
    width: 100%;
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
    background: #232a34;
    filter: brightness(75%);
`;