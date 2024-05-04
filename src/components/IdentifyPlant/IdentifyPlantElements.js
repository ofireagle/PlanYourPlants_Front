import styled from 'styled-components'

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
    max-width: 400px;
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
`;