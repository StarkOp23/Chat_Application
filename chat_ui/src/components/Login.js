import React from 'react'
import logo from './message-chat-1.svg'
import { Button, TextField } from '@mui/material'



const Login = () => {
    return (
        <div className='login-container'>
            <div className='image-container'>
                <img src={logo} alt='logo' className='welcome-logo' />
            </div>
            <div className='login-box'>
                <p>Login</p>
                <TextField id="standard-basic" label="Enter User Name" variant="outlined" />
                <TextField id="outlined-password-input" label="Enter Password" type='password' autoComplete='current-password' />
                <Button variant="outlined">LogIn</Button>
            </div>
        </div>
    )
}

export default Login
