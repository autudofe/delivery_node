import React from 'react';
import {ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import {NavLink} from "react-router-dom";


export const driverListItems = (
    <React.Fragment>
        <NavLink to={`/trucking/allLoads`}
                 style={({isActive}) => ({
                     textDecoration: "none",
                     color: isActive ? "red" : "gray ",
                 })}
        >
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="All loads"/>
            </ListItemButton>
        </NavLink>

        <NavLink to={`/trucking/activeLoad`}
                 style={({isActive}) => ({
                     textDecoration: "none",
                     color: isActive ? "red" : "gray ",
                 })}
        >
            <ListItemButton>
                <ListItemIcon>
                    <FlightTakeoffIcon/>
                </ListItemIcon>
                <ListItemText primary="Active load"/>
            </ListItemButton>
        </NavLink>

        <NavLink to={`/trucking/trucks`}
                 style={({isActive}) => ({
                     textDecoration: "none",
                     color: isActive ? "red" : "gray ",
                 })}
        >
            <ListItemButton>
                <ListItemIcon>
                    <LocalShippingIcon/>
                </ListItemIcon>
                <ListItemText primary="My trucks"/>
            </ListItemButton>
        </NavLink>

        <NavLink to={`/trucking/profile`}
                 style={({isActive}) => ({
                     textDecoration: "none",
                     color: isActive ? "red" : "gray ",
                 })}
        >
            <ListItemButton>
                <ListItemIcon>
                    <AccountCircleIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile"/>
            </ListItemButton>
        </NavLink>

    </React.Fragment>
);