import React from 'react';
import Modal from "react-modal";
import PropTypes from 'prop-types';


Modal.setAppElement("#root");

const CustomModal = (props) => {
    const {modalName, modalIsOpen, toggleModal, children} = props;


    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    };
    return (<Modal
        style={customStyles}
        isOpen={modalIsOpen}
        onRequestClose={toggleModal}
        contentLabel={modalName}
    >

        {children}

    </Modal>);
}

CustomModal.propTypes = {
    modalName: PropTypes.string.isRequired,
    modalIsOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired
}

export default CustomModal;