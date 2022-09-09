import React, {useState} from 'react';

import {DialogTitle, DialogContentText, DialogContent, DialogActions, Dialog, TextField, Button} from '@mui/material';

const DialogWindowChanPass = ({open, setOpen, changeObject}) => {

    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = () => {
        setOpen(false);
        changeObject(oldPass, newPass);
    };

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Change password</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        For change password please enter your old and new passwords
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="oldPassword"
                        label="Old password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setOldPass(e.target.value)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newPassword"
                        label="New password"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={(e) => setNewPass(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button color="error" onClick={handleChange}>Change</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DialogWindowChanPass;