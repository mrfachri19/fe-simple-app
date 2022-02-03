import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal() {
  const handleClose = () => {
    setShow(false);
    notif.success ? router.push("/AllProducts") : null;
  };
  const [notif, setNotif] = useState({ err: "", success: "" });
  const [show, setShow] = useState(false);
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {notif.success ? "Success" : "Failed"}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {notif.success ? notif.success : notif.err}
            </Typography>
            <Button
              className="modal__delete--cancel"
              variant="primary"
              onClick={handleClose}
            >
              Close
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
