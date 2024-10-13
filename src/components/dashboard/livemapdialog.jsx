import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const LivemapDialog = ({ showModal, handleClose, selectedDriver }) => {
  return (
    <div className="absolute top-0 left-0">
    <Dialog
      open={showModal}
      onClose={handleClose}
      PaperProps={{
        style: {
          zIndex: 1300,
        },
      }}
    >
      <DialogTitle>Driver Details</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {selectedDriver && (
            <>
              <p>
                <strong>Name:</strong> {selectedDriver.name}
              </p>
              <p>
                <strong>Phone:</strong> {selectedDriver.phone}
              </p>
              <p>
                <strong>Location:</strong> {selectedDriver.position.join(", ")}
              </p>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
    </div>
  );
};

export default LivemapDialog;
