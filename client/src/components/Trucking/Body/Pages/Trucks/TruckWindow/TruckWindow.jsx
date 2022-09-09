import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    Autocomplete,
    Button,
    DialogActions,
    TextField,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog
} from "@mui/material";

const options = ['SPRINTER', 'SMALL STRAIGHT', 'LARGE STRAIGHT'];

const TruckWindow = ({open, setOpen, addObject, id}) => {

    const [value, setValue] = useState(options[0]);
    const [data, setData] = useState({type: 'SPRINTER'});

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = () => {
        setOpen(false);
        addObject(data, id);
    };

    return (

        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add load</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter all parameters your load
                </DialogContentText>

                <Autocomplete
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    inputValue={data.type}
                    onInputChange={(event, newInputValue) => {
                        setData({...data, type: newInputValue});
                    }}
                    options={options}
                    sx={{mt: 4}}
                    renderInput={(params) => <TextField {...params} label="Type"/>}
                    id="type"
                    name="type"
                />

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="error" onClick={handleChange}>{id ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(TruckWindow);

