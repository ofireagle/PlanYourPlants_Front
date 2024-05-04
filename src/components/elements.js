import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md'

export const HeroContainer = styled.div`
    background: #0c0c0c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 30px;
    height: 800px;
    position: relative;
    z-index: 1;
    :before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.6) 100%),
        linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 100%);
        z-index: 2;
    }
`;

export const HeroContent = styled.div`
    z-index: 3;
    max-width: 1200px;
    position: absolute;
    padding: 8px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const HeroH1 = styled.h1`
    color: #fff;
    font-size: 48px;
    text-align: center;
    @media screen and (max-width: 768px) {
        font-size: 40px;
    }

    @media screen and (max-width: 480px) {
        font-size: 32px;
    }
`

export const HeroP = styled.p`
    margin-top: 24px;
    color: #fff;
    font-size: 24px;
    text-align: center;
    max-width: 600px;

    @media screen and (max-width: 768px) {
        font-size: 24px;
    }

    @media screen and (max-width: 480px) {
        font-size: 18px;
    }
`

export const HeroBtnWrapper = styled.nav`
    margin-top: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`

export const ArrowRight = styled(MdKeyboardArrowRight)`

`

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

export const FormInputMessage = styled.textarea`
    resize: vertical;
    padding: 16px 16px;
    margin-bottom: 40px;
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
    max-height: 900px;
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

export const FormImage = styled.div`
    max-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media screen and (max-width: 480px) {
        padding: 10px;
    }
`

export const Text = styled.span`
    text-align: center;
    margin-top: 24px;
    color: #fff;
    font-size: 14px;
`

export const TextDanger = styled.span`
    text-align: center;
    color: #F39540;
    font-size: 12px;
    margin-top: 8px;
    margin-bottom: 12px;
`

export const ImageUp = styled.img`
    width: 50px;
    height: 50px;
`

export const FooterContainer = styled.footer`
    background-color: #F39540;
`

export const FooterWrap = styled.div`
    padding: 0px  24px 20px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1100px;
    margin: 0 auto;
`

export const SocialMedia = styled.section`
    max-width: 1000px;
    width: 100%;
`

export const SocialMediaWrap = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    margin: 40px auto 0 auto;

    @media screen and (max-width: 820px) {
        flex-direction: column;
    }
`

export const SocialLogo     = styled(Link)`
    color: rgb(0,0,0);
    justify-self: start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    font-weight: bold;
`

export const WebsiteRights = styled.small`
    color: rgb(0,0,0);
    margin-bottom: 16px;
    padding-left: 80px;

    @media screen and (max-width: 820px) {
        padding-left: 0;
    }
`

export const SocialIcons = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 240px;
`

export const SocialIconLink = styled.a`
    color: rgb(0,0,0);
    font-size: 24px;
`
/**/

export const FormSelect = styled.select`
    padding: 16px 16px;
    max-width: 336px;
    max-height: 48.7px;
    border: none;
    border-radius: 4px;
`
export const Nav = styled.nav`
    background: ${({scrollNav}) => (scrollNav ? '#000' : 'transparent')};
    height: 80px;
    margin-top: -80px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 10;
    transition: 0.8s all ease;
`

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: 80px;
    z-index: 1;
    width: 100%;
    padding: 0 24px;
    max-width: 1100px;
`;

export const NavLogo = styled(Link)`
    color: #fff;
    justify-self: flex-start;
    cursor: pointer;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    margin-left: 24px;
    font-weight: bold;
    text-decoration: none;
`;

// Menu icon container for mobile, it appears only with max-width: 768px
export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
        color: #fff;
    }
`;

// NavMenu for browser: it disappears when max-width: 768px
export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;
    margin-right: -22px;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavItem = styled.li`
    height: 80px;
`;

export const NavLinks = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;

    /*  &: is used to insert styling for pseudo class selectors like
        :active, :hover, :focus in one big css block */

    &.active {
        border-bottom: 3px solid #F39540;
    }
`

export const ListContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ListItem = styled.li`
  cursor: pointer;
  padding: 5px;
`;

export const UpdateButton = styled.button`
  background-color: #F39540;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
`;
;