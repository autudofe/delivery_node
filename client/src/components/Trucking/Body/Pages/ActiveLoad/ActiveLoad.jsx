import React, {useContext, useEffect, useState} from 'react';
import {
    Box,
    Typography,
    Collapse,
    IconButton,
    Tooltip,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import {useSnackbar} from "notistack";
import {Context} from "../../../../../index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LoadingButton from "@mui/lab/LoadingButton";

import {observer} from "mobx-react-lite";

const ActiveLoad = () => {

    const [open, setOpen] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {loadStore} = useContext(Context)
    const {activeLoad, isLoading} = loadStore;

    useEffect(() => {
        loadStore.getUsersActiveLoad()
    }, [])

    const nextState = () => {
        loadStore.iterateToNextLoadState()
            .then(res =>
                enqueueSnackbar(`${res?.data?.message}`, {variant: res.status === 200 ? 'success' : 'error'})
            );
    }


    return (
        <React.Fragment>
            <Box sx={{
                position: 'relative',
                mb: 4
            }}>
                <Typography component="h2" variant="h4" color="gray">
                    Active load
                </Typography>
            </Box>

            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Load
            </Typography>

            {!activeLoad.name ?
                <Typography component="h6" variant="h6" gutterBottom>
                    Loads not found
                </Typography>
                :
                <Table size="small" sx={{mb: 3}}>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>NAME</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                            <TableCell align="right">PAYLOAD</TableCell>
                            <TableCell align="right">STATE</TableCell>
                            <TableCell align="right">TOOLS</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
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
                                {activeLoad.name}
                            </TableCell>
                            <TableCell align="right">{activeLoad.status}</TableCell>
                            <TableCell align="right">{activeLoad.payload}</TableCell>
                            <TableCell align="right">{activeLoad.state}</TableCell>

                            <TableCell align="right">
                                <Tooltip title="Iterate to next Load state" sx={{mr: 1}}>
                                    <span>
                                        <LoadingButton
                                            size="small"
                                            loading={isLoading}
                                            variant="contained"
                                            disabled={activeLoad.status === 'SHIPPED'}
                                            color="success"
                                            onClick={() => nextState()}
                                        >
                                            NEXT STATE
                                        </LoadingButton>
                                    </span>
                                </Tooltip>
                            </TableCell>

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
                                                    <TableCell>{activeLoad.delivery_address}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Pickup Address
                                                    </TableCell>
                                                    <TableCell>{activeLoad.pickup_address}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Dimensions
                                                    </TableCell>
                                                    <TableCell>
                                                        {`Height: ${activeLoad.dimensions.height},
                                                           Length: ${activeLoad.dimensions.length},
                                                              Width: ${activeLoad.dimensions.width}`}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Created date
                                                    </TableCell>
                                                    <TableCell>{activeLoad.created_date}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Logs
                                                    </TableCell>
                                                    <TableCell>{activeLoad.logs.length}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Assigned to
                                                    </TableCell>
                                                    <TableCell>{activeLoad.assigned_to ? activeLoad.assigned_to : 'none'}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Created by
                                                    </TableCell>
                                                    <TableCell>{activeLoad.created_by}</TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        Id
                                                    </TableCell>
                                                    <TableCell>{activeLoad._id}</TableCell>
                                                </TableRow>

                                            </TableBody>
                                        </Table>
                                    </Box>
                                </Collapse>
                            </TableCell>
                        </TableRow>

                    </TableBody>

                </Table>
            }
        </React.Fragment>
    );
};

export default observer(ActiveLoad);