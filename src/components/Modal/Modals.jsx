import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import style from "./ModalDoctor.module.css"

import showIcon from "../../assets/images/red-heart.gif"
import DataResult from '../../pages/Result/DataResult';


function Modals({ data, isDataOutDated }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {isDataOutDated ? "" : <img className={style.icon} src={showIcon} onClick={handleShow} />}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Informations</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DataResult data={{ results: data }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Modals;


