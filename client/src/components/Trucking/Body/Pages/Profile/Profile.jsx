import React, {useContext, useState} from 'react';
import {
    Typography,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    List,
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader
} from "@mui/material";
import {Context} from "../../../../../index";
import {toJS} from "mobx";
import KeyIcon from '@mui/icons-material/Key';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DialogWindowDelete from "../DialogWindowDelete";
import DialogWindowChanPass from "../DialogWindowChanPass";
import {useSnackbar} from 'notistack';
import {observer} from "mobx-react-lite";


const Profile = () => {

    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalPass, setOpenModalPass] = useState(false);

    const {enqueueSnackbar} = useSnackbar();
    const {authStore} = useContext(Context)
    const {user} = toJS(authStore);

    const deleteUser = () => {
        authStore.deleteUsersProfile().then(res =>
            enqueueSnackbar(`${res?.data?.message}`,
                {variant: res.status === 200 ? 'success' : 'error'})
        );
    }

    const changePassword = (oldPassword, newPassword) => {
        authStore.changeUsersPassword(oldPassword, newPassword)
            .then(res =>
                enqueueSnackbar(`${res?.data?.message}`,
                    {variant: res.status === 200 ? 'success' : 'error'})
            )
    }

    return (
        <React.Fragment>
            <Typography component="h2" variant="h4" color="gray" sx={{mb: 3}}>
                Profile
            </Typography>

            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Profile info
            </Typography>

            <Table size="small" sx={{mb: 3}}>
                <TableHead>
                    <TableRow>
                        <TableCell>EMAIL</TableCell>
                        <TableCell>ROLE</TableCell>
                        <TableCell align="right">CREATED DATE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>

                    <TableRow>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell align="right">{`${user.created_date}`}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>


            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                Options
            </Typography>

            <List
                sx={{width: '100%', bgcolor: 'background.paper'}}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Danger options
                    </ListSubheader>
                }
            >

                <Divider/>

                <ListItemButton onClick={() => setOpenModalPass(true)}>
                    <ListItemIcon>
                        <KeyIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Change password"/>
                </ListItemButton>

                <Divider/>

                <ListItemButton onClick={() => setOpenModalDelete(true)}>
                    <ListItemIcon>
                        <DeleteForeverIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Delete Profile"/>
                </ListItemButton>

                <Divider/>

            </List>

            <DialogWindowDelete open={openModalDelete} setOpen={setOpenModalDelete} deleteObject={deleteUser}/>
            <DialogWindowChanPass open={openModalPass} setOpen={setOpenModalPass} changeObject={changePassword}/>

        </React.Fragment>
    );
};

export default observer(Profile);