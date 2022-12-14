import { Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { loginFailure, loginStart, loginSuccess, } from '../redux/userSlice'
import { ClipLoader } from 'react-spinners';

function Signin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState("")


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isLoading } = useSelector((state) => state.user)

    const signUser = async (e) => {
        e.preventDefault();
        try {
            dispatch(loginStart())
            const res = await axios.post("http://localhost:4000/auth/signin", { email, password }, { withCredentials: true }
            )
            console.log(res.data);
            localStorage.setItem("token", res.data.token)
            dispatch(loginSuccess(res.data.user))
            navigate("/")

        } catch (e) {
            console.log(e);
            setErrMsg(e.response.data.message)
            dispatch(loginFailure())
        }
    }

    console.log(isLoading);
    return (
        <Grid container sx={{ height: "90vh" }}>
            <Paper elevation={10} sx={{ padding: "20px", height: "45vh", width: "300px", margin: "auto", borderRadius: "10px" }}>
                <Stack display='flex' alignItems="center">
                    <Typography variant='h5'>SignIn</Typography>
                </Stack>
                <form onSubmit={signUser}>
                    <Stack spacing={4} sx={{ mt: "20px" }} color="white">

                        <TextField onChange={(e) => setEmail(e.target.value)} fullWidth color='info' name='email' type="email" label="Email" id="fullWidth" />
                        <TextField helperText="" onChange={(e) => setPassword(e.target.value)} fullWidth color='info' name='password' type="password" label="Password" id="fullWidth" />
                        <Typography color="error" variant='p'>{errMsg}</Typography>
                        {!isLoading ?
                            <Button type='submit' variant='contained' color='success' fullWidth>Login</Button> :
                            <Button type='submit' variant='contained' color='success' fullWidth>
                                <ClipLoader
                                    color="#ffffff"
                                    loading
                                    size={20}
                                    speedMultiplier={2}
                                /></Button>
                        }
                    </Stack>
                </form>
                <Typography variant='body2' marginTop={1}>Dont Have an Account? <Link to="/signup">SignUp</Link></Typography>
            </Paper>
        </Grid>
    )
}

export default Signin