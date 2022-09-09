import React from 'react';

import {DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, Button} from '@mui/material';

const DialogWindowDelete = ({open, setOpen, deleteObject, id}) => {

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete = () => {
        setOpen(false);
        deleteObject(id);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Confirm delete action this object"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    confirm deletion
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="error" onClick={handleDelete} autoFocus>
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogWindowDelete;