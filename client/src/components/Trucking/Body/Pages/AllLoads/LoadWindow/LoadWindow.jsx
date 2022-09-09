import React, {useState} from 'react';
import {observer} from "mobx-react-lite";
import {
    InputAdornment,
    Box,
    Button,
    DialogActions,
    TextField,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Dialog
} from "@mui/material";

const startData = {
    name: "",
    payload: 0,
    pickup_address: "",
    delivery_address: "",
    dimensions: {
        width: 0,
        length: 0,
        height: 0
    }
}

const LoadWindow = ({open, setOpen, addObject, initialData, id}) => {

    const [data, setData] = useState(!id ? startData : {
        name: initialData.name,
        payload: initialData.payload,
        pickup_address: initialData.pickup_address,
        delivery_address: initialData.delivery_address,
        dimensions: {
            ...initialData.dimensions,
        }
    });

    const handleClose = () => {
        setOpen(false);
        setData(startData)
    };

    const handleChange = () => {
        setOpen(false);
        addObject(data, id);
        setData(startData)
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add load</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter all parameters your load
                </DialogContentText>
                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    label="Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.name}
                    onChange={(e) =>
                        setData({...data, name: e.target.value})}
                />
                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="pickup_address"
                    label="Pickup Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.pickup_address}
                    onChange={(e) =>
                        setData({...data, pickup_address: e.target.value})}
                />
                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="delivery_address"
                    label="Delivery Address"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={data.delivery_address}
                    onChange={(e) =>
                        setData({...data, delivery_address: e.target.value})}
                />
                <TextField
                    sx={{mt: 3, mb: 1}}
                    autoComplete="off"
                    label="Payload"
                    id="payload"
                    type="number"
                    fullWidth
                    InputProps={{
                        endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                    }}
                    value={data.payload}
                    onChange={(e) =>
                        setData({...data, payload: Number(e.target.value)})}
                />


                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': {mr: 2, mt: 2, mb: 1, width: '15ch'},
                    }}
                    autoComplete="off"
                >
                    <TextField
                        label="width"
                        id="width"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">sm</InputAdornment>,
                        }}
                        value={data.dimensions.width}
                        onChange={(e) =>
                            setData({
                                ...data, dimensions:
                                    {...data.dimensions, width: Number(e.target.value)}
                            })}
                    />
                    <TextField
                        label="height"
                        id="height"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">sm</InputAdornment>,
                        }}
                        value={data.dimensions.height}
                        onChange={(e) =>
                            setData({
                                ...data, dimensions:
                                    {...data.dimensions, height: Number(e.target.value)}
                            })}
                    />
                    <TextField
                        label="length"
                        id="length"
                        type="number"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">sm</InputAdornment>,
                        }}
                        value={data.dimensions.length}
                        onChange={(e) =>
                            setData({
                                ...data, dimensions:
                                    {...data.dimensions, length: Number(e.target.value)}
                            })}
                    />
                </Box>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button color="error" onClick={handleChange}>{id ? 'Update' : 'Add'}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default observer(LoadWindow);