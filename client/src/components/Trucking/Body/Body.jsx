import React, {useContext, useState} from 'react';
import {styled} from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {shipperListItems} from './shipperListItems';
import {driverListItems} from './driverListItems';
import {
    Button,
    Paper,
    Grid,
    Container,
    IconButton,
    Divider,
    Typography,
    List,
    Toolbar,
    Box,
    CssBaseline
} from "@mui/material";
import {Context} from "../../../index";
import {observer} from "mobx-react-lite";
import Profile from "./Pages/Profile/Profile";
import {Route, Routes} from "react-router-dom";
import AllLoads from "./Pages/AllLoads/AllLoads";
import ActiveLoad from "./Pages/ActiveLoad/ActiveLoad";
import Trucks from "./Pages/Trucks/Trucks";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);


const Body = () => {

    const {authStore} = useContext(Context)
    const {user} = authStore;
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    }

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>

            <AppBar position="absolute" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{flexGrow: 1}}
                    >
                        Truck company
                    </Typography>

                    <Button onClick={() => authStore.logout()} color="inherit">Logout</Button>

                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Toolbar>
                <Divider/>
                <List component="nav">
                    {user.role === 'SHIPPER' ?
                        shipperListItems
                        :
                        driverListItems}
                    <Divider sx={{my: 1}}/>
                </List>
            </Drawer>

            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.grey[100],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar/>
                <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>

                                <Routes>
                                    <Route path={`/trucking/allLoads`} element={<AllLoads/>}/>
                                    <Route path={`/trucking/profile`} element={<Profile/>}/>

                                    {user.role === 'DRIVER' &&
                                    <Route path={`/trucking/activeLoad`} element={<ActiveLoad/>}/>
                                    }
                                    {user.role === 'DRIVER' &&
                                    <Route path={`/trucking/trucks`} element={<Trucks/>}/>
                                    }
                                </Routes>

                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </Box>
    );
};

export default observer(Body);