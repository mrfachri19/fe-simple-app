import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalDelete({ show, msg, handleClose, handleSubmit }) {
  return (
    <>
      <Modal show={show}>
        <Modal.Body style={{ padding: "30px 70px" }}>
          <p className="text-center" style={{ fontSize: "30px" }}>
            {msg}
          </p>
          <div className="d-flex justify-content-evenly">
            <Button className="modal__delete--cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="modal__delete--delete" onClick={handleSubmit}>
              Delete
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
