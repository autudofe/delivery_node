import React, {useContext, useEffect, useState} from 'react';
import {useSnackbar} from "notistack";
import AddIcon from "@mui/icons-material/Add";
import {TableBody, TableCell, TableRow, TableHead, Table, Fab, Tooltip, Typography, Box} from "@mui/material";

import {observer} from "mobx-react-lite";
import {toJS} from "mobx";
import TruckWindow from "./TruckWindow/TruckWindow";
import {Context} from "../../../../../index";
import Row from "./Row/Row";

const Trucks = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {authStore, truckStore} = useContext(Context)
    const {user} = toJS(authStore);
    const {truckData} = truckStore;

    useEffect(() => {
        truckStore.getUsersTrucks()
    }, [])

    const addTruck = (data) => {
        truckStore.addTruckForUser(data)
            .then(res =>
                enqueueSnackbar(`${res?.data?.message}`,
                    {variant: res.status === 200 ? 'success' : 'error'})
            );
    }

    return (
        <React.Fragment>
            <Box sx={{
                position: 'relative',
                mb: 4
            }}>
                <Typography component="h2" variant="h4" color="gray">
                    All trucks
                </Typography>

                {user.role === 'DRIVER' &&
                <Tooltip title="Add truck" align="right" sx={{
                    position: 'absolute',
                    top: 0,
                    right: 16,
                }}>
                    <Fab color="primary" aria-label="add" onClick={() => setOpenModalAdd(true)}>
                        <AddIcon/>
                    </Fab>
                </Tooltip>
                }
            </Box>

            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Trucks
            </Typography>

            {truckData.length < 0 ?
                <Typography component="h6" variant="h6" gutterBottom>
                    Trucks not found
                </Typography>
                :
                <Table size="small" sx={{mb: 3}}>
                    <TableHead>
                        <TableRow>
                            <TableCell/>
                            <TableCell>TYPE</TableCell>
                            <TableCell align="right">STATUS</TableCell>
                            <TableCell align="right">CREATED DATE</TableCell>

                            {user.role === 'DRIVER' &&
                            <TableCell align="right">TOOLS</TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {truckData.map((truck) => (
                            <Row key={truck._id} truck={truck}/>
                        ))}
                    </TableBody>
                </Table>
            }

            <TruckWindow open={openModalAdd} setOpen={setOpenModalAdd} addObject={addTruck}/>

        </React.Fragment>
    );
};

export default observer(Trucks);