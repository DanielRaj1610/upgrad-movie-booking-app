import {Button} from '@material-ui/core';
import React from 'react';
import logo from '../../assets/logo.svg';
import './Header.css';
import Modal from "react-modal";
import CenterTabs from './tabs/Tabs';
import CustomModal from './Modal/Modal';
import LoginForm from './LoginForm/LoginForm';
import RegisterForm from './RegisterForm/RegisterForm';
import {useGlobals} from "../store";
import {Link} from "react-router-dom";

Modal.setAppElement("#root");

function Header(props) {
    const {isLoggedIn, modalIsOpen, toggleModal, movieId, callLogOut} = useGlobals();
    const {baseUrl} = props;
    console.log(baseUrl)
    return (
        <div className='header'>
            <div className='header_img'>
                <img src={logo} alt="logo"/>
            </div>
            <div className='header_buttons'>
                {baseUrl.includes('/movie/') ?
                    isLoggedIn ?
                        <Button variant='contained' color='primary' component={Link} to={`/bookshow/${movieId}`}>BOOK
                            SHOW</Button> :
                        <Button variant='contained' color='primary' onClick={() => {
                            toggleModal()
                        }}>BOOK SHOW
                        </Button>
                    :
                    ""
                }
                {isLoggedIn ? <Button variant='contained' color='default' onClick={callLogOut}>LOGOUT</Button> :
                    <Button variant='contained' onClick={toggleModal} color='default'>LOGIN</Button>}
            </div>
            <CustomModal
                modalName='Login and register'
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
            >
                <CenterTabs tabs={[{tabName: "LOGIN", tabContent: <LoginForm/>},
                    {tabName: "REGISTER", tabContent: <RegisterForm/>}]}/>
            </CustomModal>
        </div>)
}

export default Header;