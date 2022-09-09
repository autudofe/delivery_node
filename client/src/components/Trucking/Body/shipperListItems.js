import React from 'react';
import {ListItemIcon, ListItemText, ListItemButton} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {NavLink} from "react-router-dom";


export const shipperListItems = (
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