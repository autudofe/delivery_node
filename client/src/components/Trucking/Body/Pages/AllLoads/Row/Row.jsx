import React, {useContext, useState} from 'react';

import {
    TableBody,
    TableHead,
    Table,
    Typography,
    TableRow,
    TableCell,
    IconButton,
    Collapse,
    Box,
    Tooltip
} from "@mui/material";

import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import {Context} from "../../../../../../index";
import {useSnackbar} from "notistack";
import LoadWindow from "../LoadWindow/LoadWindow";
import LoadingButton from '@mui/lab/LoadingButton';

import {observer} from "mobx-react-lite";
import DialogWindowDelete from "../../DialogWindowDelete";

const Row = ({load}) => {
    const [open, setOpen] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {loadStore, authStore} = useContext(Context)

    const {user} = authStore;
    const {isLoading} = loadStore;

    const deleteLoad = (id) => {
        loadStore.deleteUsersLoadById(id).then(res =>
            enqueueSnackbar(`${res?.data?.message}`, {variant: res.status === 200 ? 'success' : 'error'})
        );
    }

    const updateLoad = (data, id) => {
        loadStore.updateUsersLoadById(data, id)
            .then(res =>
                enqueueSnackbar(`${res?.data?.message}`, {variant: res.status === 200 ? 'success' : 'error'})
            );
    }

    const postLoad = () => {
        loadStore.postUsersLoadById(load._id)
            .then(res => {
                    enqueueSnackbar(`driver found: ${res?.data?.driver_found}`, {variant: res.data.driver_found ? 'success' : 'error'})
                    enqueueSnackbar(`${res?.data?.message}`, {variant: res.status === 200 ? 'success' : 'error'})
                }
            );
    }

    return (
        <React.Fragment>
            <TableRow key={load._id} sx={{'& > *': {borderBottom: 'unset'}}}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {load.name}
                </TableCell>
                <TableCell align="right">{load.status}</TableCell>
                <TableCell align="right">{load.payload}</TableCell>
                <TableCell align="right">{load.created_date}</TableCell>

                {user.role === 'SHIPPER' &&

                <TableCell align="right">
                    <Tooltip title="Post load" >
                        <span>
                        <LoadingButton
                            sx={{mr: 1}}
                            size="small"
                            loading={isLoading}
                            variant="contained"
                            disabled={load.status !== 'NEW'}
                            color="success"
                            onClick={() => postLoad()}
                        >
                            POST
                        </LoadingButton>
                    </span>
                    </Tooltip>
                    <Tooltip title="Update load">
                        <span>
                        <IconButton disabled={load.status !== 'NEW'}
                                    aria-label="update" onClick={() => setOpenModalUpdate(true)}>
                            <CreateIcon/>
                        </IconButton>
                    </span>
                    </Tooltip>
                    <Tooltip title="Delete load">
                        <span>
                        <IconButton disabled={!(load.status === 'NEW' || load.status === 'SHIPPED')}
                                    aria-label="delete" onClick={() => setOpenModalDelete(true)}>
                            <DeleteIcon color="error"/>
                        </IconButton>
                            </span>
                    </Tooltip>
                </TableCell>
                }


            </TableRow>
            <TableRow>
                <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{margin: 1}}>
                            <Typography variant="h6" gutterBottom>
                                Details
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Properties</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Delivery Address
                                        </TableCell>
                                        <TableCell>{load.delivery_address}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Pickup Address
                                        </TableCell>
                                        <TableCell>{load.pickup_address}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Dimensions
                                        </TableCell>
                                        <TableCell>
                                            {`Height: ${load.dimensions.height},
                                        Length: ${load.dimensions.length},
                                        Width: ${load.dimensions.width}`}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            State
                                        </TableCell>
                                        <TableCell>{load.state ? load.state : 'none'}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Logs
                                        </TableCell>
                                        <TableCell>{load.logs.length}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Assigned to
                                        </TableCell>
                                        <TableCell>{load.assigned_to ? load.assigned_to : 'none'}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Created by
                                        </TableCell>
                                        <TableCell>{load.created_by}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Id
                                        </TableCell>
                                        <TableCell>{load._id}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <DialogWindowDelete open={openModalDelete} setOpen={setOpenModalDelete} deleteObject={deleteLoad}
                                  id={load._id}/>
            <LoadWindow open={openModalUpdate} setOpen={setOpenModalUpdate} addObject={updateLoad} initialData={load}
                        id={load._id}/>

        </React.Fragment>
    );
};

export default observer(Row);