import React from 'react'
import { useLocation } from 'react-router-dom';
import {
  Container,
  FormWrap,
  Icon,
  FormContent,
  Form,
  FormH1
} from './SuccessElements';

const SuccessPage = () => {
  const location = useLocation();
  return (
        <Container>
            <FormWrap>
                <Icon to="/"> Plan your Plants </Icon>
                <FormContent>
                    <Form action="#">
                        <FormH1> Email sent to: {location.state.email} <br/><br/> Click on the link in the message to reset password. </FormH1>
                    </Form>
                </FormContent>
            </FormWrap>
        </Container>
  )
}

export default SuccessPage