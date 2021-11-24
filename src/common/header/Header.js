import { Button } from '@material-ui/core';
import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import Modal from "react-modal";
import CenterTabs from './tabs/Tabs';
import CustomModal from './Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';

Modal.setAppElement("#root");

function Header({ baseUrl }) {
    console.log(baseUrl);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function toggleModal() {
        setIsOpen(!modalIsOpen);
    }


    return (
        <div className='header'>
            <div className='header_img'>
                <img src={logo} alt="logo" />
            </div>
            <div className='header_buttons'>
                <Button variant='contained' onClick={toggleModal} color='default'>Login</Button>
                <Button variant='contained' color='default'>Logout</Button>
                {/* {baseUrl.contains('/movie/') ? <Button variant='contained' color='primary'>Book Show</Button> : ''} */}
            </div>
            <CustomModal
                modalName='Login and register'
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
            >
                <CenterTabs tabs={[{ tabName: "Login", tabContent: <LoginForm /> },
                { tabName: "Register", tabContent: <RegisterForm /> }]} />
            </CustomModal>
        </div>)
}

export default Header;