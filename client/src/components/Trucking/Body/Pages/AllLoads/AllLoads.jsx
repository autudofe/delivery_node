import React, {useContext, useEffect, useState} from 'react';
import {Fab, Tooltip, TableBody, TableCell, TableRow, TableHead, Table, Typography, Box} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {Context} from "../../../../../index";
import {toJS} from "mobx";
import {useSnackbar} from 'notistack';
import {observer} from "mobx-react-lite";
import Row from "./Row/Row";
import LoadWindow from "./LoadWindow/LoadWindow";


const AllLoads = () => {

    const [openModalAdd, setOpenModalAdd] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {authStore, loadStore} = useContext(Context)
    const {user} = toJS(authStore);
    const {loadData} = loadStore;


    useEffect(() => {
        loadStore.getUsersLoads()
    }, [])

    const addLoad = (data) => {
        loadStore.addLoadForUser(data)
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
                    All loads
                </Typography>

                {user.role === 'SHIPPER' &&
                <Tooltip title="Add load" align="right" sx={{
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
                Loads
            </Typography>

            {loadData.length < 0 ?
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
                            <TableCell align="right">CREATED DATE</TableCell>

                            {user.role === 'SHIPPER' &&
                            <TableCell align="right">TOOLS</TableCell>
                            }

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loadData.map((load) => (
                            <Row key={load._id} load={load}/>
                        ))}
                    </TableBody>
                </Table>
            }

            <LoadWindow open={openModalAdd} setOpen={setOpenModalAdd} addObject={addLoad}/>

        </React.Fragment>
    );
};

export default observer(AllLoads);