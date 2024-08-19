import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import FaceDetectionComponent from '../FaceDetection';
import { Button } from 'antd'

export const MeasureModal = () => {
  const [show, setShow] = useState(true);

  return (
    <Modal show={show}>
      <Modal.Body >
        <FaceDetectionComponent setShow={setShow} isAddData={false} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}
