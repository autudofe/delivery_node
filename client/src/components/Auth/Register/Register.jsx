import React, {useContext, useState} from 'react';
import {Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid, Autocomplete} from '@mui/material'
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {NavLink, useNavigate} from "react-router-dom";
import {Context} from "../../../index";
import {useSnackbar} from 'notistack';

const options = ['DRIVER', 'SHIPPER'];

const Register = () => {

    const [value, setValue] = useState(options[0]);
    const [role, setRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {enqueueSnackbar} = useSnackbar();
    const {authStore} = useContext(Context)
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        authStore.register(email, password, role).then(res => {
                if (res.status === 200) {
                    navigate(`/login`);
                    enqueueSnackbar(`${res?.data?.message}`, {variant: 'success'});
                } else {
                    enqueueSnackbar(`${res?.data?.message}`, {variant: 'error'});
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
                    Sign up
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

                    <Autocomplete
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        inputValue={role}
                        onInputChange={(event, newInputValue) => {
                            setRole(newInputValue);
                        }}
                        options={options}
                        sx={{mt: 4}}
                        renderInput={(params) => <TextField {...params} label="Role"/>}
                        id="role"
                        name="role"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign Up
                    </Button>

                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <NavLink
                                to={`/login`}
                                /*style={{textDecoration: "none", color: "gray"}}*/
                            >
                                {"Already have an account? Sign in"}
                            </NavLink>
                        </Grid>
                    </Grid>

                </Box>
            </Box>
        </Container>
    );
};

export default Register;