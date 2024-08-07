import React, { useState } from 'react';
import logo from './techny-email-marketing-and-newsletter-with-new-message.gif';
import { Backdrop, Button, CircularProgress, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Toaster from './Toaster';
import "./myStyles.css";

const Login = () => {
    const [showlogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({ name: "", email: "", password: "", });
    const [logInStatus, setLogInStatus] = useState();
    const [signInStatus, setSignInStatus] = useState();
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const loginHandler = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };
            const response = await axios.post("http://localhost:8080/user/login", data, config);
            const userData = response.data; // Assuming this contains the user data
            console.log("Login successful: ", userData);
            setLogInStatus({ message: "Success", key: Math.random() });
            localStorage.setItem("userData", JSON.stringify(userData));
            navigate("/app/welcome");
        } catch (error) {
            setLogInStatus({ msg: "Wrong Credentials", key: Math.random() });
            console.error("Error during login:", error);
        } finally {
            setLoading(false);
        }
    };

    const signUpHandler = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post("http://localhost:8080/user/register", data, config);
            const userData = response.data; // Assuming this contains the user data
            console.log("Sign-up successful: ", userData);
            setSignInStatus({ message: "Success", key: Math.random() });
            localStorage.setItem("userData", JSON.stringify(userData));
            navigate("/app/welcome");
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
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="secondary" />
            </Backdrop>

            <div className="login-container">
                <div className="image-container">
                    <img src={logo} alt="Logo" className="welcome-logo" />
                </div>
                {showlogin && (
                    <div className="login-box">
                        <p className="login-text">Welcome Back!</p>
                        <TextField
                            onChange={changeHandler}
                            label="Enter Your Email Address"
                            variant="outlined"
                            color="secondary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    loginHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    loginHandler();
                                }
                            }}
                        />
                        <Button variant="outlined" color="secondary" onClick={loginHandler} className='button'>
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                    </svg>
                                </div>
                            </div>
                            <span className='logSign'>Login</span>
                        </Button>
                        <p className='pLowerNoACC'>
                            Don't have an Account?{" "}
                            <span className="hyper" onClick={() => setShowLogin(false)}>Sign Up</span>
                        </p>
                        {logInStatus && <Toaster key={logInStatus.key} message={logInStatus.msg} />}
                    </div>
                )}
                {!showlogin && (
                    <div className="login-box">
                        <p className="login-text">Create your Account</p>
                        <TextField
                            onChange={changeHandler}
                            label="Enter User Name"
                            variant="outlined"
                            color="secondary"
                            name="name"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            label="Enter Email Address"
                            variant="outlined"
                            color="secondary"
                            name="email"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <TextField
                            onChange={changeHandler}
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            color="secondary"
                            name="password"
                            onKeyDown={(event) => {
                                if (event.code === "Enter") {
                                    signUpHandler();
                                }
                            }}
                        />
                        <Button variant="outlined" color="secondary" onClick={signUpHandler} className='button'>
                            <div className="svg-wrapper-1">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                                        <path fill="none" d="M0 0h24v24H0z"></path>
                                        <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                                    </svg>
                                </div>
                            </div>
                            <span className='logSign'>Sign Up</span>
                        </Button>
                        <p className='pLowerACC'>
                            Already have an Account?{" "}
                            <span className="hyper" onClick={() => setShowLogin(true)}>Log in</span>
                        </p>
                        {signInStatus && <Toaster key={signInStatus.key} message={signInStatus.msg} />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
