import React from 'react';
import { Button,  ModalHeader, ModalBody, ModalFooter, Modal } from 'reactstrap';

const SuccessModal = ({toggle, modal}) => {
    return (
        <Modal isOpen={modal} toggle={toggle} modalTransition={{ timeout: 300 }} backdropTransition={{ timeout: 500 }}>
            <ModalHeader toggle={toggle}>Success!</ModalHeader>
            <ModalBody>
                Data preservation is successful!
            </ModalBody>
            <ModalFooter>
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default SuccessModal;
