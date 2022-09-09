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
import LoadingButton from '@mui/lab/LoadingButton';
import {observer} from "mobx-react-lite";
import TruckWindow from "../TruckWindow/TruckWindow";
import DialogWindowDelete from "../../DialogWindowDelete";

const Row = ({truck}) => {
    const [open, setOpen] = React.useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {truckStore, authStore} = useContext(Context)

    const {user} = authStore;
    const {isLoading} = truckStore;

    const deleteTruck = (id) => {
        truckStore.deleteUsersTruckById(id).then(res =>
            enqueueSnackbar(`${res?.data?.message}`,
                {variant: res.status === 200 ? 'success' : 'error'})
        );
    }

    const updateTruck = (data, id) => {
        truckStore.updateUsersTruckById(data, id)
            .then(res =>
                enqueueSnackbar(`${res?.data?.message}`,
                    {variant: res.status === 200 ? 'success' : 'error'})
            );
    }

    const assignedTruck = () => {
        truckStore.assignTruckToUserById(truck._id)
            .then(res => {
                    enqueueSnackbar(`${res?.data?.message}`,
                        {variant: res.status === 200 ? 'success' : 'error'})
                }
            );
    }

    return (
        <React.Fragment>
            <TableRow key={truck._id} sx={{'& > *': {borderBottom: 'unset'}}}>
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
                    {truck.type}
                </TableCell>
                <TableCell align="right">{truck.status}</TableCell>
                <TableCell align="right">{truck.created_date}</TableCell>

                {user.role === 'DRIVER' &&
                <TableCell align="right">
                    <Tooltip title="Assigned truck">
                        <span>
                        <LoadingButton
                            sx={{mr: 1}}
                            size="small"
                            loading={isLoading}
                            variant="contained"
                            disabled={truck.status !== 'IS' || truck.assigned_to !== null}
                            color="success"
                            onClick={() => assignedTruck()}
                        >
                            ASSIGN
                        </LoadingButton>
                    </span>
                    </Tooltip>
                    <Tooltip title="Update truck">
                        <span>
                        <IconButton disabled={truck.status !== 'IS'}
                                    aria-label="update" onClick={() => setOpenModalUpdate(true)}>
                            <CreateIcon/>
                        </IconButton>
                    </span>
                    </Tooltip>
                    <Tooltip title="Delete truck">
                        <span>
                        <IconButton disabled={truck.status !== 'IS'}
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
                                            Assigned to
                                        </TableCell>
                                        <TableCell>{truck.assigned_to ? truck.assigned_to : 'none'}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Created by
                                        </TableCell>
                                        <TableCell>{truck.created_by}</TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            Id
                                        </TableCell>
                                        <TableCell>{truck._id}</TableCell>
                                    </TableRow>

                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

            <DialogWindowDelete open={openModalDelete} setOpen={setOpenModalDelete} deleteObject={deleteTruck}
                                id={truck._id}/>

            <TruckWindow open={openModalUpdate} setOpen={setOpenModalUpdate} addObject={updateTruck}
                         id={truck._id}/>

        </React.Fragment>
    );
};

export default observer(Row);