import styled from 'styled-components'

export const ContainerProfile = styled.div`
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
    flex-direction: row;
    @media screen and (max-width: 1050px) {
        flex-direction: column;
`;