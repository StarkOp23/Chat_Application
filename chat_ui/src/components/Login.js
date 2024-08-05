import React, { useState } from 'react'
import logo from './techny-email-marketing-and-newsletter-with-new-message.gif'
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material'
import { json, useNavigate } from 'react-router-dom';
import axios from 'axios';
// import { toast, ToastContainer } from 'react-toastify';
import Toaster from './Toaster';
import "./myStyles.css";


const Login = () => {


    const [showlogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ name: "", email: "", password: "", })

    const [logInStatus, setLogInStatus] = React.useState();
    const [signInStatus, setSignInStatus] = React.useState();

    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };


    const loginHandler = async (e) => {
        setLoading(true);
        console.log(data);

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };
            const response = await axios.post("http://localhost:8080/api/user/login", data, config);
            console.log("Login successful: ", response);
            setLogInStatus({ message: "success", key: Math.random() })
            setLoading(false);
            localStorage.setItem("userData", JSON.stringify(response))
            navigate("/app/welcome");

        } catch (error) {

            setLogInStatus({
                msg: "Wrong Credentials",
                key: Math.random(),
            });
        }
        setLoading(false);

    }


    const signUpHandler = async () => {
        // setLoading(true);
        // try {
        //     const config = {
        //         headers: {
        //             "Content-type": "application/json",
        //         },
        //     };

        //     const response = await axios.post(
        //         "http://localhost:8080/api/user/register", data, config
        //     );
        //     console.log(response);
        //     setSignInStatus({ message: "Success", key: Math.random() });
        //     navigate("/app/welcome");
        //     localStorage.setItem("userData", JSON.stringify(response));
        //     setLoading(false);
        // } catch (error) {
        //     console.log(error);
        //     // if (error.response.status === "405") {
        //     //     setLogInStatus({
        //     //         msg: "User with this email ID already Exists",
        //     //         key: Math.random(),
        //     //     });
        //     // }
        //     // if (error.response.status === "406") {
        //     //     setLogInStatus({
        //     //         msg: "User Name already Taken, Please take another one",
        //     //         key: Math.random(),
        //     //     });
        //     // }
        //     setLoading(false);
        // }
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const response = await axios.post(
                "http://localhost:8080/api/user/register",
                data,
                config
            );
            console.log(response);
            setSignInStatus({ message: "Success", key: Math.random() });
            navigate("/app/welcome");
            localStorage.setItem("userData", JSON.stringify(response.data));
            setLoading(false);
        } catch (error) {
            console.error("Error during sign-up:", error);

            if (error.response) {
                console.error("Response data:", error.response.data);
                console.error("Response status:", error.response.status);
                console.error("Response headers:", error.response.headers);

            } else if (error.request) {
                console.error("Request data:", error.request);
            } else {
                console.error("Error message:", error.message);
            }

            setLoading(false);
        }
    }

    return (
        <div>
            <Backdrop
                sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="secondary" />
            </Backdrop>
            <div className="login-container">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" />
                </div>
                {showlogin && (
                    <div className="login-box">
                        
                        <p className="login-text">Welcome Back !</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Your Email Address"
                            variant="outlined"
                            color="secondary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    // console.log(event);
                                    loginHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    // console.log(event);
                                    loginHandler();
                                }
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={loginHandler}
                            isLoading
                            className='button'

                        >
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                    </svg>
                                </div>
                            </div>
                            <span className='logSign'>Login</span>
                        </Button>
                        {/* <ToastContainer /> */}
                        <p className='pLowerNoACC'>
                            Don't have an Account ?{" "}
                            <span
                                className="hyper"
                                onClick={() => {
                                    setShowLogin(false);
                                }}
                            >
                                Sign Up
                            </span>
                        </p>
                        {logInStatus ? (
                            <Toaster key={logInStatus.key} message={logInStatus.msg} />
                        ) : null}
                    </div>
                )}
                {!showlogin && (
                    <div className="login-box">
                        <p className="login-text">Create your Account</p>
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter User Name"
                            variant="outlined"
                            color="secondary"
                            name="name"
                            helperText=""
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="standard-basic"
                            label="Enter Email Address"
                            variant="outlined"
                            color="secondary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code == "Enter") {
                                    // console.log(event);
                                    signUpHandler();
                                }
                            }}
                        />
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={signUpHandler}
                            className='button'
                        >
                            <div class="svg-wrapper-1">
                                <div class="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                    </svg>
                                </div>
                            </div>
                            <span className='logSign'>Sign Up</span>
                        </Button>
                        {/* <ToastContainer /> */}
                        <p className='pLowerACC' >
                            Already have an Account ?
                            <span

                                className="hyper"
                                onClick={() => {
                                    setShowLogin(true);
                                }}
                            >
                                Log in
                            </span>
                        </p>
                        {signInStatus ? (
                            <Toaster key={signInStatus.key} message={signInStatus.msg} />
                        ) : null}
                    </div>
                )}
            </div>
        </div>


    )
}

export default Login
