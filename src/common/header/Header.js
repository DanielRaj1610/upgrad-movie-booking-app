import { Button } from '@material-ui/core';
import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import Modal from "react-modal";
import CenterTabs from './tabs/Tabs';
import CustomModal from './Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import {useGlobals} from "../store";

Modal.setAppElement("#root");

function Header(props) {
    const {isLoggedIn,modalIsOpen,toggleModal} =useGlobals();
    const {baseUrl} =props;
    console.log(baseUrl)
    return (
        <div className='header'>
            <div className='header_img'>
                <img src={logo} alt="logo" />
            </div>
            <div className='header_buttons'>
                {baseUrl.includes('/movie/') ? <Button variant='contained' color='primary'>BOOK SHOW</Button> :""}
                {isLoggedIn ?  <Button variant='contained' color='default'>LOGOUT</Button> : <Button variant='contained' onClick={toggleModal} color='default'>LOGIN</Button> }
            </div>
            <CustomModal
                modalName='Login and register'
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
            >
                <CenterTabs tabs={[{ tabName: "LOGIN", tabContent: <LoginForm /> },
                { tabName: "REGISTER", tabContent: <RegisterForm /> }]} />
            </CustomModal>
        </div>)
}

export default Header;