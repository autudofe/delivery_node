import React, {useContext, useState} from 'react';
import {Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid} from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {NavLink} from "react-router-dom";
import {Context} from "../../../index";
import {useSnackbar} from 'notistack';


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {enqueueSnackbar} = useSnackbar();
    const {authStore} = useContext(Context)

    const handleSubmit = (event) => {
        event.preventDefault();

        authStore.login(email, password).then(res => {
                if (res) {
                    enqueueSnackbar(`${res?.data?.message}`, {variant: 'error'})
                }
            }
        )
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
                    Sign in
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
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <NavLink
                                to={`/forgotPassword`}
                                /*style={{textDecoration: "none", color: "gray"}}*/
                            >
                                {"Forgot password?"}
                            </NavLink>

                        </Grid>
                        <Grid item>
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

export default Login;