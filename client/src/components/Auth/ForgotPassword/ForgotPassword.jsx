import React, {useContext, useState} from 'react';
import {Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid} from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../../index";

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const {authStore} = useContext(Context)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        authStore.forgotPassword(email).then(res => {
            if (res) {
                navigate(`/login`)
            }
        })
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Password Recovery
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={e => setEmail(e.target.value)}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Send to email
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <NavLink
                                to={`/register`}
                                /*style={{textDecoration: "none", color: "gray"}}*/
                            >
                                {"Don't have an account? Sign Up"}
                            </NavLink>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Container>
    );
};

export default ForgotPassword;